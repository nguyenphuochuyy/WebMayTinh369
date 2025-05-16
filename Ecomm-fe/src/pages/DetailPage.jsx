import React, { useContext, useEffect, useState } from "react";
import "../styles/DetailPage/DetailPage.scss";
import { useNavigate, useParams } from "react-router-dom";
import { Button, InputNumber, notification, Radio } from "antd";
import deliver from "../images/detailproduct/icon-delivery.png";
import returnShip from "../images/detailproduct/icon-return.png";
import BestSellingProducts from "../components/HomeComponents/BestSellingProduct";
import { getProductById } from "../services/product.service";
import { addProductToCart, checkProductQuantityAPI } from "../services/api.service";
import { AuthContext } from "../components/context/auth.context";


const DetailPage = () => {
  const params = useParams();
  const { productId } = params;
  // console.log("productId detail page", productId);
  const { user, setUser } = useContext(AuthContext);
  const [note, contextHolder] = notification.useNotification();
  const [product, setProduct] = useState({});
  const [count, setCount] = useState(1);
  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = useState([]);

  
  
  


  const getStockStatus = (quantity) => {
    if (quantity === 0) return "Hết hàng";
    if (quantity > 0 && quantity <= 10) return "Sắp hết hàng";
    return"Còn hàng";
  };

  const handleAddProductToCart = async (productId, quantity) => {
    if (user.id === "") {
      navigate("/login");
    } else {
      const res = await addProductToCart(productId, quantity);
      if (res) {
        setUser((prevUser) => ({
          ...prevUser,
          refresh: !prevUser.refresh,
        }));
        note.info({
          message: `Notification`,
          description: "Thêm sản phẩm vào giỏ hàng thành công",
          type: "success",
        });
      } else {
        note.info({
          message: `Notification`,
          description: "Thêm sản phẩm vào giỏ hàng thất bại",
          type: "error",
        });
      }
    }
  };


  useEffect( ()  => {
    const fetchProduct = async () => {
      try {
        const product = await getProductById(productId);
        setProduct(product);
        setSelectedItem([{
          productId: productId,
          quantity: count,
          productName: product.name,
          price: product.price,
          totalPrice: product.price * count,
    
        }]);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin sản phẩm:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  console.log("Mô tả sản phẩm:", product.description);

  const formatPrice = (price) => {
    return price?.toLocaleString("vi-VN") + "đ";
  };

  const handleCountChange = (value) => {
    setCount(value);
  };

  useEffect(() => {
    setSelectedItem([{
      productId: productId,
      quantity: count,
      productName: product.name,
      price: product.price,
      totalPrice: product.price * count,
    }]);
  }, [count]);

  console.log("selectedItem", selectedItem);


  const handleCheckout = async ()  => {
    if (!user.phone || user.phone.trim() === "" || !user.addresses || user.addresses.length === 0) {
      note.warning({
        message: "Thiếu thông tin cá nhân",
        description: (
          <div>
            <p>Vui lòng cập nhật số điện thoại và địa chỉ trước khi thanh toán.</p>
            <Button
              type="primary"
              size="small"
              onClick={() => navigate("/account/profile")}
              style={{ marginTop: 8 }}
            >
              Cập nhật ngay
            </Button>
          </div>
        ),
        duration: 0,
      });
      return;
    }

    const payload = [{
      id: selectedItem[0].productId,
      quantity: selectedItem[0].quantity,
    }];
    
    console.log("payload", payload);
    
    const isCheckQuantityProduct = await checkProductQuantityAPI(payload);
    if(isCheckQuantityProduct.data.data === false){
      note.warning({
        message: isCheckQuantityProduct.data.message,
        description: "Vui lòng kiểm tra lại số lượng sản phẩm trong giỏ hàng",
      });
      return;
    }
    console.log("isCheckQuantityProduct", isCheckQuantityProduct);

  
    navigate("/checkout", { state: { cartItems: selectedItem } });
  };


  return (
    <div className="container">
      {contextHolder}
      <div className="breadcrumb" style={{ margin: "20px 0", fontSize: "14px" }}>
      </div>
      
      <div className="detailProduct" style={{ display: "flex", gap: "30px", marginBottom: "50px" }}>
        <div className="product-detail" style={{ width: "50%" }}>
          <div className="main-image" style={{ border: "1px solid #eee", marginBottom: "10px" }}>
            <img
              style={{ width: "100%", height: "auto" }}
              src={product.image}
              alt={product.name}
              className="product-image"
            />
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="product-info" style={{ width: "50%" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>{product.name}</h1>
          
          <div style={{ display: "flex", alignItems: "center", margin: "10px 0" }}>
            <span style={{ color: "#007bff" }}>Tình trạng:</span>
            <span style={{ color: "#FF9017", marginLeft: "5px", fontWeight: "500" }}>{getStockStatus(product.quantity)}</span>
          </div>

          <div className="price-section" style={{ margin: "20px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <span style={{ color: "#E52525", fontSize: "28px", fontWeight: "bold" }}>
                {formatPrice(product.priceAfterDiscount)}
              </span>
              {product.discount !== 0 && (
                <>
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "#999",
                      fontSize: "20px",
                      fontWeight: "normal",
                    }}
                  >
                    {formatPrice(product.price)}
                  </span>
                  <span
                    style={{
                      backgroundColor: "#E52525",
                      color: "#fff",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    -{product.discount}%
                  </span>
                </>
              )}
            </div>
          </div>
          
          <div className="quantity-section" style={{ margin: "20px 0", display: "flex", alignItems: "center" }}>
            <div style={{ fontWeight: "500", marginRight: "10px" }}>Số lượng:</div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button 
                style={{ border: "1px solid #ddd", borderRadius: "4px 0 0 4px" }}
                onClick={() => handleCountChange(Math.max(1, count - 1))}
                icon={<span>−</span>}
              />
              <InputNumber
                min={1}
                max={product.instock}
                value={count}
                onChange={handleCountChange}
                controls={false}
                style={{ width: "50px", borderRadius: "0", textAlign: "center" }}
              />
              <Button 
                style={{ border: "1px solid #ddd", borderRadius: "0 4px 4px 0" }}
                onClick={() => handleCountChange(Math.min(count + 1))}
                icon={<span>+</span>}
              />
            </div>
          </div>

          <div className="action-buttons" style={{ display: "flex", gap: "15px", margin: "30px 0" }}>
            <Button
              style={{
                backgroundColor: "#fff",
                color: "#FF424E",
                borderColor: "#FF424E",
                fontWeight: "bold",
                height: "45px",
                width: "200px",
                borderRadius: "4px",
              }}
              onClick={() => handleAddProductToCart(product.id,count)}
            >
              THÊM VÀO GIỎ
            </Button>
            <Button
              style={{
                backgroundColor: "#FF424E",
                color: "#fff",
                fontWeight: "bold",
                height: "45px",
                width: "200px",
                borderRadius: "4px",
              }}
              onClick={handleCheckout}
            >
              MUA NGAY
            </Button>
          </div>

          <div className="share-section" style={{ display: "flex", alignItems: "center", margin: "20px 0" }}>
            Chia sẻ:
            <div style={{ display: "flex", gap: "8px", marginLeft: "10px" }}>
              {["facebook", "messenger", "twitter", "pinterest", "copy"].map((platform) => (
                <div 
                  key={platform} 
                  style={{ 
                    width: "30px", 
                    height: "30px", 
                    borderRadius: "50%", 
                    backgroundColor: ["facebook", "messenger", "twitter", "pinterest"].includes(platform) ? "#4267B2" : "#eee",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff",
                    fontSize: "16px"
                  }}
                >
                  {platform === "facebook" && "f"}
                  {platform === "messenger" && "m"}
                  {platform === "twitter" && "t"}
                  {platform === "pinterest" && "p"}
                  {platform === "copy" && "c"}
                </div>
              ))}
            </div>
          </div>

          <div className="sales-policy" style={{ margin: "30px 0" }}>
            <div style={{ backgroundColor: "#f9f9f9", borderRadius: "8px", padding: "20px", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "15px" }}>Chính sách bán hàng</h3>
              
              <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                <div style={{ width: "24px", height: "24px", marginRight: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="14" height="14" rx="2" stroke="#777" strokeWidth="1.5"/>
                    <rect x="6" y="7" width="8" height="6" rx="1" stroke="#777" strokeWidth="1.5"/>
                  </svg>
                </div>
                <span style={{ color: "#444" }}>Cam kết 100% chính hãng</span>
              </div>
              
              <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                <div style={{ width: "24px", height: "24px", marginRight: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="7" stroke="#777" strokeWidth="1.5"/>
                    <path d="M10 6V10L13 13" stroke="#777" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <span style={{ color: "#444" }}>Hỗ trợ 24/7</span>
              </div>
              
              <h3 style={{ fontSize: "16px", fontWeight: "bold", margin: "20px 0 15px 0" }}>Thông tin thêm</h3>
              
              <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                <div style={{ width: "24px", height: "24px", marginRight: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 3L12.5 8.5H17.5L13.5 12L15.5 17L10 14L4.5 17L6.5 12L2.5 8.5H7.5L10 3Z" fill="#3B82F6" stroke="#3B82F6" strokeWidth="1.5"/>
                  </svg>
                </div>
                <span style={{ color: "#444" }}>Hoàn tiền 111% nếu hàng giả</span>
              </div>
              
              <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                <div style={{ width: "24px", height: "24px", marginRight: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 10L8 13L15 6" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span style={{ color: "#444" }}>Mở hộp kiểm tra nhận hàng</span>
              </div>
              
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: "24px", height: "24px", marginRight: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="5" width="14" height="10" rx="1" stroke="#3B82F6" strokeWidth="1.5"/>
                    <path d="M7 5V3H13V5" stroke="#3B82F6" strokeWidth="1.5"/>
                  </svg>
                </div>
                <span style={{ color: "#444" }}>Đổi trả trong 7 ngày</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="product-details-tabs" style={{ margin: "30px 0" }}>
        <div style={{ 
          fontWeight: "bold", 
          fontSize: "18px", 
          padding: "15px 0", 
          borderBottom: "2px solid #eee",
          marginBottom: "20px"
        }}>
          MÔ TẢ SẢN PHẨM
        </div>
        <div style={{ lineHeight: "1.6" }}>
          {product.description &&
            product.description.replace(/\\n/g, '\n').split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
        </div>

      </div>

      {/* sản phẩm nổi bật */}
      <BestSellingProducts/>
    </div>
  );
};

export default DetailPage;