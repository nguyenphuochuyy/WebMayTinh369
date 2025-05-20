import React, { useState, useEffect, useRef } from "react";
import {
  Layout,
  Row,
  Col,
  Card,
  Button,
  Typography,
  Spin,
  Empty,
  Rate,
  Menu,
  Modal,
  Carousel,
} from "antd";
import Categories from "../components/HomeComponents/Category";
import FlashSales from "../components/HomeComponents/FlashSale";
import BestSellingProducts from "../components/HomeComponents/BestSellingProduct";
import ExploreOurProducts from "../components/HomeComponents/OurProducts/index";
import "../../src/styles/Base_CSS/style.css";
import { Link, useNavigate } from "react-router-dom";
import { MessageOutlined } from "@ant-design/icons";
import ChatBox from "../components/ChatBox/ChatBox";
// Import hình ảnh từ src/images
import zaloQr from "../images/zalo-qr.jpg";
import zaloIcon from "../images/images.png";
import banner1 from "../images/home/banner1.PNG";
import banner2 from "../images/home/banner2.PNG";
import banner3 from "../images/home/banner3.PNG";
import banner4 from "../images/home/bannerleft1.webp";
import banner5 from "../images/home/bannerleft2.webp";
import banner6 from "../images/home/bannerleft3.webp";
const { Title } = Typography;

const fetchCategories = async () => {
  try {
    const response = await fetch("http://localhost:8082/api/categories");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

const fetchProductsByCategory = async (categoryId) => {
  try {
    const response = await fetch(
      `http://localhost:8082/api/products/category/${categoryId}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching products for category ${categoryId}:`, error);
    return [];
  }
};

const fetchProductsBySearch = async (keyword) => {
  try {
    const response = await fetch(
      `http://localhost:8082/api/products/search?keyword=${encodeURIComponent(
        keyword
      )}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching products for keyword ${keyword}:`, error);
    return [];
  }
};

const formatVND = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const Home = ({ onSearchHandler }) => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loadingCategoryProducts, setLoadingCategoryProducts] = useState(false);
  const [errorCategoryProducts, setErrorCategoryProducts] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const categoryProductsRef = useRef(null);
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isQrModalVisible, setIsQrModalVisible] = useState(false);
  useEffect(() => {
    const loadCategories = async () => {
      setLoadingCategories(true);
      setErrorCategories(null);
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setErrorCategories(err.message || "Có lỗi xảy ra khi tải danh mục.");
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadCategoryProducts = async () => {
      if (selectedCategory) {
        setLoadingCategoryProducts(true);
        setErrorCategoryProducts(null);
        setSearchTerm("");
        try {
          const products = await fetchProductsByCategory(selectedCategory);
          setCategoryProducts(products);
          const category = categories.find(
            (cat) => cat.id === selectedCategory
          );
          setCategoryName(category ? category.name : null);
        } catch (error) {
          setErrorCategoryProducts(
            error.message || "Có lỗi xảy ra khi tải sản phẩm theo danh mục."
          );
          setCategoryProducts([]);
          setCategoryName(null);
        } finally {
          setLoadingCategoryProducts(false);
        }
      } else if (searchTerm) {
        setLoadingCategoryProducts(true);
        setErrorCategoryProducts(null);
        try {
          const products = await fetchProductsBySearch(searchTerm);
          setCategoryProducts(products);
          setCategoryName(null);
        } catch (error) {
          setErrorCategoryProducts(
            error.message || "Có lỗi xảy ra khi tìm kiếm sản phẩm."
          );
          setCategoryProducts([]);
        } finally {
          setLoadingCategoryProducts(false);
        }
      } else {
        setCategoryProducts([]);
        setCategoryName(null);
        setSearchTerm("");
      }
    };

    loadCategoryProducts();
  }, [selectedCategory, searchTerm, categories]);

  const handleCategorySelect = (categoryId) => {
    // setSelectedCategory(categoryId);
    // setSearchTerm("");
    // if (categoryProductsRef.current) {
    //   categoryProductsRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    // }
    navigate(`/collection/${categoryId}`); // Chuyển hướng đến trang danh sách sản phẩm theo danh mục
  };

  const handleSearch = (keyword) => {
    setSearchTerm(keyword);
    setSelectedCategory(null);
    if (categoryProductsRef.current) {
      categoryProductsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  // Truyền handleSearch lên App.js khi component mount
  useEffect(() => {
    if (onSearchHandler) {
      onSearchHandler(handleSearch);
    }
  }, [onSearchHandler]);

  // Hàm mở/đóng chat
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Hàm mở/đóng modal QR
  const toggleQrModal = () => {
    setIsQrModalVisible(!isQrModalVisible);
  };

  return (
    <>
      <div className="home-container" style={{ marginTop: "70px" }}>
        <div className="container">
          {/* Sidebar & Banner */}
          <div style={{ display: "flex" }}>
            {/* Sidebar Categories */}
            <div
              className="sidebar-categories"
              style={{
                borderRadius: "10px",
                marginTop: "10px",
                width: "15%",
                background: "white",
                height: "100%",
                padding: "20px",
              }}
            >
              {loadingCategories ? (
                <Spin
                  size="small"
                  style={{
                    display: "block",
                    textAlign: "center",
                    marginTop: 20,
                  }}
                />
              ) : errorCategories ? (
                <div
                  style={{ color: "red", textAlign: "center", marginTop: 20 }}
                >
                  {errorCategories}
                </div>
              ) : (
                <Menu
                  mode="vertical"
                  style={{ borderRight: "none" }}
                  items={categories.map((category) => ({
                    key: category.id,
                    label: (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                        onClick={() => handleCategorySelect(category.id)}
                      >
                        <span>{category.name}</span>
                      </div>
                    ),
                  }))}
                />
              )}
            </div>
            {/* Banner */}
           
              <div
                className="banner-container"
                style={{
                  display: "flex",
                  width: "85%",
                  marginTop: "10px",
                  marginLeft: "10px",
                  alignItems: "center",
                }}
              >
                <div
                  className="banner"
                  style={{
                    width: "70%",
                    height: "auto",
                    position: "relative",
                  }}
                >
                  <Carousel
                    autoplay
                    style={{ height: "100%", width: "100%" }}
                    autoplaySpeed={5000}
                    dots={false}
                    effect="scrollx"
                  >
                    <img src={banner1} alt="" />
                    <img src={banner2} alt="" />
                    <img src={banner3} alt="" />
                  </Carousel>
                </div>
                <div style={{ width: "30%" , gap: "10px", display: "flex", flexDirection: "column" , marginLeft: "10px"}}>
                  <div>
                        <img src={banner4} alt="banner4" style={{ objectFit: "contain", width: "100%", height: "100%" }} />
                  </div>
               <div >
                        <img src={banner5} alt="banner4" style={{ objectFit: "contain", width: "100%", height: "100%" }} />
                  </div>
                   <div style={{marginTop : '5px'}}>
                        <img src={banner6} alt="banner4" style={{ objectFit: "contain", width: "100%", height: "100%" }} />
                  </div>
                 
                </div>
                
               
              </div>
          
          </div>

          {/* Khu vực sản phẩm theo category hoặc tìm kiếm */}
          <div style={{ marginTop: "30px" }} ref={categoryProductsRef}>
            {(selectedCategory || searchTerm) && (
              <>
                <Title
                  level={3}
                  style={{ marginBottom: 16, textAlign: "center" }}
                >
                  {searchTerm
                    ? `Kết quả tìm kiếm theo "${searchTerm}"`
                    : categoryName
                    ? `Sản phẩm thuộc danh mục "${categoryName}"`
                    : "Sản phẩm theo danh mục"}
                </Title>
                {loadingCategoryProducts ? (
                  <div style={{ textAlign: "center" }}>
                    <Spin />
                  </div>
                ) : errorCategoryProducts ? (
                  <div style={{ color: "red", textAlign: "center" }}>
                    {errorCategoryProducts}
                  </div>
                ) : categoryProducts.length > 0 ? (
                  <Row gutter={[16, 16]}>
                    {categoryProducts.map((product) => (
                      <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                        <Card
                          hoverable
                          cover={
                            <div
                              style={{
                                height: 80,
                                overflow: "hidden",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {product.image && (
                                <img
                                  alt={product.name}
                                  src={product.image}
                                  style={{
                                    maxHeight: "100%",
                                    maxWidth: "100%",
                                    objectFit: "contain",
                                  }}
                                />
                              )}
                            </div>
                          }
                        >
                          <Card.Meta
                            title={
                              <Typography.Paragraph ellipsis={{ rows: 2 }}>
                                {product.name}
                              </Typography.Paragraph>
                            }
                            description={
                              <>
                                <div className="price">
                                  <span className="current-price">
                                    {formatVND(product.price)}
                                  </span>
                                  {product.oldPrice && (
                                    <span className="old-price">
                                      {formatVND(product.oldPrice)}
                                    </span>
                                  )}
                                </div>
                                <Rate
                                  disabled
                                  allowHalf
                                  value={product.rating}
                                  style={{ fontSize: 12 }}
                                />
                              </>
                            }
                          />
                          <Button
                            type="primary"
                            style={{ marginTop: 16 }}
                            block
                            // onClick={() => handleAddToCart(product)}
                          >
                            Thêm vào giỏ hàng
                          </Button>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <Empty
                    description={
                      searchTerm
                        ? "Không tìm thấy sản phẩm."
                        : "Không có sản phẩm nào trong danh mục này."
                    }
                  />
                )}
              </>
            )}
          </div>

          {/* Flash Sales today */}
          <div style={{ marginTop: "50px" }}>
            <FlashSales />
          </div>

          {/* Category */}
          <div style={{ marginTop: "50px" }}>
            <Categories onCategorySelect={handleCategorySelect} />
          </div>

          {/* Best selling product */}
          <div style={{ marginTop: "50px" }}>
            <BestSellingProducts />
          </div>

          {/* Middle banner */}
          <div>
            
              <img
              style={{ width: "100%" , height: '100%' , aspectRatio : "1" , objectFit: "contain"}}
                src= {banner1}
                alt=""
              />
           
          </div>
          {/* Our product */}
          <div style={{ marginTop: "50px" }}>
            <ExploreOurProducts selectedCategory={selectedCategory} />
          </div>

          {/* Nút chat */}
          <Button
            type="primary"
            shape="circle"
            icon={<MessageOutlined />}
            size="large"
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              zIndex: 1000,
            }}
            onClick={toggleChat}
          />

          {/* Nút Zalo */}
          <Button
            type="default"
            shape="circle"
            size="large"
            onClick={toggleQrModal}
            style={{
              position: "fixed",
              bottom: "20px",
              right: "80px",
              zIndex: 1000,
              padding: 0,
              backgroundColor: "transparent",
            }}
          >
            <img
              src={zaloIcon} // Sử dụng biến đã import
              alt="Zalo"
              style={{ width: "42px", height: "42px", borderRadius: "50%" }}
            />
          </Button>

          {/* Modal QR */}
          <Modal
            title="Quét mã QR để liên hệ qua Zalo"
            visible={isQrModalVisible}
            onCancel={toggleQrModal}
            footer={[
              <Button key="close" onClick={toggleQrModal}>
                Đóng
              </Button>,
            ]}
          >
            <div style={{ textAlign: "center" }}>
              <img
                src={zaloQr} // Sử dụng biến đã import
                alt="Zalo QR Code"
                style={{ width: "400px", height: "500px" }}
              />
              <p>Quét mã QR để vào Zalo cá nhân của tôi!</p>
            </div>
          </Modal>

          {/* Cửa sổ chat */}
          {isChatOpen && <ChatBox onClose={toggleChat} />}
        </div>
      </div>
    </>
  );
};

export default Home;
