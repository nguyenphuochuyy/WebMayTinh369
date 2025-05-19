import React, { useContext, useEffect, useState, useMemo, use } from "react";
import "../styles/DetailPage/DetailPage.scss";
import { useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  Button,
  Empty,
  Form,
  Input,
  InputNumber,
  notification,
  Radio,
  Rate,
} from "antd";
import deliver from "../images/detailproduct/icon-delivery.png";
import returnShip from "../images/detailproduct/icon-return.png";
import BestSellingProducts from "../components/HomeComponents/BestSellingProduct";
import {
  addComment,
  checkUserCommentedProduct,
  checkUserPurchasedProduct,
  getCommentByProductId,
  getProductById,
} from "../services/product.service";
import {
  addProductToCart,
  checkProductQuantityAPI,
} from "../services/api.service";
import { AuthContext } from "../components/context/auth.context";
import {
  FacebookFilled,
  MessageFilled,
  TwitterOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { Space } from "antd";
import { getUserById } from "../services/user.service";

const DetailPage = () => {
  const params = useParams();
  const { productId } = params;
  // console.log("productId detail page", productId);
  const { user, setUser } = useContext(AuthContext);
  const [note, contextHolder] = notification.useNotification();
  const [product, setProduct] = useState({});
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  console.log("user", user);

  const [selectedItem, setSelectedItem] = useState([]);
  const [comments, setComments] = useState([]);
  const [userRating, setUserRating] = useState(5);
  const [commentForm] = Form.useForm();

  // Calculate ratings statistics
  const ratingStats = useMemo(() => {
    // Initialize counts for each star rating
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let totalRating = 0;
    
    // Count occurrences of each rating
    if (Array.isArray(comments)) {
      comments.forEach(comment => {
        const rating = comment.rating || 5; // Default to 5 if rating is missing
        counts[rating] = (counts[rating] || 0) + 1;
        totalRating += rating;
      });
    }
    
    // Calculate average rating
    const total = Array.isArray(comments) ? comments.length : 0;
    const avgRating = total > 0 
      ? (totalRating / total).toFixed(1) 
      : "0.0";
    
    // Calculate percentages
    const percentages = {};
    
    for (let i = 1; i <= 5; i++) {
      percentages[i] = total > 0 ? Math.round((counts[i] / total) * 100) : 0;
    }
    
    return {
      average: avgRating,
      counts,
      percentages,
      total
    };
  }, [comments]);

  const getStockStatus = (quantity) => {
    if (quantity === 0) return "Hết hàng";
    if (quantity > 0 && quantity <= 10) return "Sắp hết hàng";
    return "Còn hàng";
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProductById(productId);
        setProduct(product);
        setSelectedItem([
          {
            productId: productId,
            quantity: count,
            productName: product.name,
            price: product.price,
            priceAfterDiscount: product.priceAfterDiscount,
            totalPrice: product.priceAfterDiscount * count,
          },
        ]);
        const comments = await getCommentByProductId(productId);
        const updatedComments = await Promise.all(
          comments.map(async (comment) => {
            const user = await getUserById(comment.userId);
            return {
              ...comment,
              userName: user.data.user.username,
              avatar: user.data.user.avt || null, // Thêm avatar từ thông tin người dùng
            };
          })
        );
        setComments(updatedComments);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin sản phẩm:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  // console.log("Mô tả sản phẩm:", product.description);
  console.log("comments", comments);

  const formatPrice = (price) => {
    return price?.toLocaleString("vi-VN") + "đ";
  };

  const handleCountChange = (value) => {
    setCount(value);
  };

  useEffect(() => {
    setSelectedItem([
      {
        productId: productId,
        quantity: count,
        productName: product.name,
        price: product.price,
        totalPrice: product.price * count,
      },
    ]);
  }, [count]);

  console.log("selectedItem", selectedItem);

  const handleCheckout = async () => {
    if (
      !user.phone ||
      user.phone.trim() === "" ||
      !user.addresses ||
      user.addresses.length === 0
    ) {
      note.warning({
        message: "Thiếu thông tin cá nhân",
        description: (
          <div>
            <p>
              Vui lòng cập nhật số điện thoại và địa chỉ trước khi thanh toán.
            </p>
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

    const payload = [
      {
        id: selectedItem[0].productId,
        quantity: selectedItem[0].quantity,
      },
    ];

    console.log("payload", payload);

    const isCheckQuantityProduct = await checkProductQuantityAPI(payload);
    if (isCheckQuantityProduct.data.data === false) {
      note.warning({
        message: isCheckQuantityProduct.data.message,
        description: "Vui lòng kiểm tra lại số lượng sản phẩm trong giỏ hàng",
      });
      return;
    }
    console.log("isCheckQuantityProduct", isCheckQuantityProduct);

    navigate("/checkout", { state: { cartItems: selectedItem } });
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };

  const handleSubmitComment = async (values) => {
    const isUserPurchasedProduct = await checkUserPurchasedProduct(productId);
    console.log("isUserPurchasedProduct", isUserPurchasedProduct);
    if (isUserPurchasedProduct.data.isPurchased === false) {
      note.warning({
        message: "Thông báo",
        description: "Bạn chưa mua sản phẩm này, không thể bình luận!",
      }) 
    }else {
      const isCommented = await checkUserCommentedProduct(productId, user.id);
      console.log("isCommented", isCommented);
      if(isCommented.data.hasCommented == true){
        note.warning({
          message: "Thông báo",
          description: "Bạn đã bình luận sản phẩm này rồi, không thể bình luận thêm!",
        }) 
      } else {
        const newComment = await addComment(
          productId,
          user.id,
          user.username,
          userRating,
          values.comment
        );
        // Add comment to the state
        setComments((prevComments) => [newComment.data, ...prevComments]);
    
        // Reset form
        commentForm.resetFields();
        setUserRating(5);
    
        // Show success notification
        note.success({
          message: "Thành công",
          description: "Đã thêm đánh giá của bạn!",
        });
      }
      
    }

    
  };

  return (
    <div
      className="container"
      style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}
    >
      {contextHolder}
      <div
        className="detailProduct"
        style={{
          display: "flex",
          gap: "30px",
          marginBottom: "50px",
          marginTop: "70px",
        }}
      >
        {/* Product Image */}
        <div className="product-detail" style={{ width: "50%" }}>
          <div style={{ border: "1px solid #eee", marginBottom: "10px" }}>
            <img
              style={{ width: "100%", height: "auto", aspectRatio: "1/1" }}
              src={product.image}
              alt={product.name}
            />
          </div>
          <div
            style={{ display: "flex", gap: "10px", justifyContent: "center" }}
          >
            {/* {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  style={{ width: "80px", height: "80px", border: "1px solid #eee" }}
                  src={product.image}
                  alt={`${product.name} thumbnail ${i}`}
                />
              ))} */}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info" style={{ width: "50%" }}>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            {product.name}
          </h1>
          <div
            style={{ display: "flex", alignItems: "center", margin: "10px 0" }}
          >
            <span style={{ color: "#007bff" }}>Tình trạng:</span>
            <span
              style={{ color: "#FF9017", marginLeft: "5px", fontWeight: "500" }}
            >
              {getStockStatus(product.quantity)}
            </span>
          </div>
          <div className="price-section" style={{ margin: "20px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <span
                style={{
                  color: "#E52525",
                  fontSize: "28px",
                  fontWeight: "bold",
                }}
              >
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
          <div
            className="quantity-section"
            style={{ margin: "20px 0", display: "flex", alignItems: "center" }}
          >
            <div style={{ fontWeight: "500", marginRight: "10px" }}>
              Số lượng:
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "4px 0 0 4px",
                }}
                onClick={() => handleCountChange(Math.max(1, count - 1))}
                icon={<span>−</span>}
              />
              <InputNumber
                min={1}
                max={product.instock}
                value={count}
                onChange={handleCountChange}
                controls={false}
                style={{
                  width: "50px",
                  borderRadius: "0",
                  textAlign: "center",
                }}
              />
              <Button
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "0 4px 4px 0",
                }}
                onClick={() => handleCountChange(Math.min(count + 1))}
                icon={<span>+</span>}
              />
            </div>
          </div>
          <div
            className="action-buttons"
            style={{ display: "flex", gap: "15px", margin: "30px 0" }}
          >
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
              onClick={() => handleAddProductToCart(product.id, count)}
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
          <div
            className="share-section"
            style={{ display: "flex", alignItems: "center", margin: "20px 0" }}
          >
            <span>Chia sẻ:</span>
            <Space size={8} style={{ marginLeft: "10px" }}>
              {/* Facebook */}
              <a
                href="#"
                style={{
                  backgroundColor: "#3b5998",
                  color: "white",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                }}
              >
                <FacebookFilled />
              </a>

              {/* Messenger */}
              <a
                href="#"
                style={{
                  backgroundColor: "#0084ff",
                  color: "white",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                }}
              >
                <MessageFilled />
              </a>

              {/* Twitter */}
              <a
                href="#"
                style={{
                  backgroundColor: "#1da1f2",
                  color: "white",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                }}
              >
                <TwitterOutlined />
              </a>
              {/* Link/Copy */}
              <a
                href="#"
                style={{
                  backgroundColor: "#4f9fd8",
                  color: "white",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                }}
              >
                <LinkOutlined />
              </a>
            </Space>
          </div>
        </div>

        {/* Sales Policy */}
        <div className="sales-policy" style={{ margin: "30px 0" }}>
          <div
            style={{
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              padding: "20px",
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                marginBottom: "15px",
              }}
            >
              Chính sách bán hàng
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                style={{ marginRight: "10px" }}
              >
                <rect
                  x="3"
                  y="3"
                  width="14"
                  height="14"
                  rx="2"
                  stroke="#777"
                  strokeWidth="1.5"
                />
                <rect
                  x="6"
                  y="7"
                  width="8"
                  height="6"
                  rx="1"
                  stroke="#777"
                  strokeWidth="1.5"
                />
              </svg>
              <span style={{ color: "#444" }}>Cam kết 100% chính hãng</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                style={{ marginRight: "10px" }}
              >
                <circle cx="10" cy="10" r="7" stroke="#777" strokeWidth="1.5" />
                <path
                  d="M10 6V10L13 13"
                  stroke="#777"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span style={{ color: "#444" }}>Hỗ trợ 24/7</span>
            </div>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                margin: "20px 0 15px 0",
              }}
            >
              Thông tin thêm
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                style={{ marginRight: "10px" }}
              >
                <path
                  d="M10 3L12.5 8.5H17.5L13.5 12L15.5 17L10 14L4.5 17L6.5 12L2.5 8.5H7.5L10 3Z"
                  fill="#3B82F6"
                  stroke="#3B82F6"
                  strokeWidth="1.5"
                />
              </svg>
              <span style={{ color: "#444" }}>Hoàn tiền 111% nếu hàng giả</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                style={{ marginRight: "10px" }}
              >
                <path
                  d="M5 10L8 13L15 6"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span style={{ color: "#444" }}>Mở hộp kiểm tra nhận hàng</span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                style={{ marginRight: "10px" }}
              >
                <rect
                  x="3"
                  y="5"
                  width="14"
                  height="10"
                  rx="1"
                  stroke="#3B82F6"
                  strokeWidth="1.5"
                />
                <path d="M7 5V3H13V5" stroke="#3B82F6" strokeWidth="1.5" />
              </svg>
              <span style={{ color: "#444" }}>Đổi trả trong 7 ngày</span>
            </div>
          </div>
        </div>
      </div>
      <div className="product-details-tabs" style={{ margin: "30px 0" }}>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "18px",
            padding: "15px 0",
            borderBottom: "2px solid #eee",
            marginBottom: "20px",
          }}
        >
          MÔ TẢ SẢN PHẨM
        </div>
        <div style={{ lineHeight: "1.6" }}>
          {product.description &&
            product.description
              .replace(/\\n/g, "\n")
              .split("\n")
              .map((line, index) => <p key={index}>{line}</p>)}
        </div>
      </div>

      {/* Section Comment - New Addition */}
      <div className="product-comments" style={{ margin: "40px 0" }}>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "18px",
            padding: "15px 0",
            borderBottom: "2px solid #eee",
            marginBottom: "20px",
          }}
        >
          ĐÁNH GIÁ SẢN PHẨM
        </div>

        {/* Product Rating Summary - UPDATED SECTION */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0 30px",
              borderRight: "1px solid #ddd",
            }}
          >
            <div
              style={{ fontSize: "36px", fontWeight: "bold", color: "#FF424E" }}
            >
              {ratingStats.average}
            </div>
            <Rate disabled value={parseFloat(ratingStats.average)} style={{ fontSize: "16px" }} />
            <div style={{ marginTop: "5px", color: "#666" }}>
              {ratingStats.total} đánh giá
            </div>
          </div>

          <div style={{ flex: 1, paddingLeft: "30px" }}>
            {[5, 4, 3, 2, 1].map(star => (
              <div
                key={star}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: star > 1 ? "8px" : 0,
                }}
              >
                <span style={{ marginRight: "10px" }}>{star} sao</span>
                <div
                  style={{
                    flex: 1,
                    height: "8px",
                    backgroundColor: "#e9ecef",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${ratingStats.percentages[star]}%`,
                      height: "100%",
                      backgroundColor: "#FF424E",
                    }}
                  ></div>
                </div>
                <span style={{ marginLeft: "10px", minWidth: "30px" }}>
                  {ratingStats.percentages[star]}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Comments List */}
        <div className="comments-list">
          {Array.isArray(comments) && comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment.id}
                style={{
                  padding: "20px",
                  borderBottom: "1px solid #eee",
                  marginBottom: "15px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Avatar
                    src={comment.avatar}
                    style={{ marginRight: "10px" }}
                  />
                  <div>
                    <div style={{ fontWeight: "bold" }}>{comment.userName}</div>
                    <div style={{ fontSize: "12px", color: "#888" }}>
                      {formatDate(comment.createdAt)}
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: "10px" }}>
                  <Rate
                    disabled
                    defaultValue={comment.rating}
                    style={{ fontSize: "14px" }}
                  />
                </div>

                <div style={{ lineHeight: "1.6" }}>{comment.comment}</div>
              </div>
            ))
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Không có bình luận nào"
              style={{ margin: "30px 0" }}
            />
          )}
        </div>

        {/* "Show more comments" button */}
        {Array.isArray(comments) && comments.length > 5 && (
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <Button
              style={{
                borderColor: "#ddd",
                color: "#333",
                fontWeight: "500",
                padding: "0 30px",
                height: "40px",
              }}
            >
              Xem thêm đánh giá
            </Button>
          </div>
        )}

        {/* Add comment form */}
        <div style={{ margin: "40px 0" }}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "16px",
              padding: "15px 0",
              borderBottom: "1px solid #eee",
              marginBottom: "20px",
            }}
          >
            VIẾT ĐÁNH GIÁ CỦA BẠN
          </div>

          {user.id === "" ? (
            <div
              style={{
                padding: "20px",
                backgroundColor: "#f9f9f9",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <p>Vui lòng đăng nhập để viết đánh giá</p>
              <Button
                type="primary"
                onClick={() => navigate("/login")}
                style={{ marginTop: "10px" }}
              >
                Đăng nhập
              </Button>
            </div>
          ) : (
            <Form
              form={commentForm}
              onFinish={handleSubmitComment}
              layout="vertical"
            >
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "10px",
                    fontWeight: "500",
                  }}
                >
                  Đánh giá của bạn:
                </label>
                <Rate
                  value={userRating}
                  onChange={setUserRating}
                  style={{ fontSize: "24px" }}
                />
              </div>

              <Form.Item
                name="comment"
                label="Bình luận của bạn"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập bình luận của bạn!",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Hãy chia sẻ nhận xét của bạn về sản phẩm..."
                  style={{
                    resize: "none",
                    borderRadius: "4px",
                    padding: "12px",
                  }}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    backgroundColor: "#FF424E",
                    height: "40px",
                    minWidth: "150px",
                    borderRadius: "4px",
                    fontWeight: "500",
                  }}
                >
                  Gửi đánh giá
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
      </div>
      <BestSellingProducts></BestSellingProducts>
    </div>
  );
};

export default DetailPage;