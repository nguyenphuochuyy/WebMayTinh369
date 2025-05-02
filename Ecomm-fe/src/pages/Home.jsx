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
} from "antd";
import Categories from "../components/HomeComponents/Category";
import FlashSales from "../components/HomeComponents/FlashSale";
import BestSellingProducts from "../components/HomeComponents/BestSellingProduct";
import ExploreOurProducts from "../components/HomeComponents/OurProducts/index";

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
    const response = await fetch(`http://localhost:8082/api/products/category/${categoryId}`);
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
      `http://localhost:8082/api/products/search?keyword=${encodeURIComponent(keyword)}`
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
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
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
          const category = categories.find((cat) => cat.id === selectedCategory);
          setCategoryName(category ? category.name : null);
        } catch (error) {
          setErrorCategoryProducts(error.message || "Có lỗi xảy ra khi tải sản phẩm theo danh mục.");
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
          setErrorCategoryProducts(error.message || "Có lỗi xảy ra khi tìm kiếm sản phẩm.");
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
    setSelectedCategory(categoryId);
    setSearchTerm("");
    if (categoryProductsRef.current) {
      categoryProductsRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleSearch = (keyword) => {
    setSearchTerm(keyword);
    setSelectedCategory(null);
    if (categoryProductsRef.current) {
      categoryProductsRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Truyền handleSearch lên App.js khi component mount
  useEffect(() => {
    if (onSearchHandler) {
      onSearchHandler(handleSearch);
    }
  }, [onSearchHandler]);

  return (
    <>
      <div className="home-container">
        <div className="container">
          {/* Sidebar & Banner */}
          <div style={{ display: "flex", flexDirection: "row" }}>
            {/* Sidebar Categories */}
            <div
              className="sidebar-categories"
              style={{
                width: "220px",
                background: "white",
                borderRight: "1px solid #f0f0f0",
                height: "100%",
              }}
            >
              {loadingCategories ? (
                <Spin size="small" style={{ display: "block", textAlign: "center", marginTop: 20 }} />
              ) : errorCategories ? (
                <div style={{ color: "red", textAlign: "center", marginTop: 20 }}>{errorCategories}</div>
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
            <div style={{ display: "flex", justifyContent: "center", width: "100%", marginBottom: "30px" }}>
              <div
                className="banner"
                style={{ width: "100%", maxWidth: "1200px", height: "400px", position: "relative" }}
              >
                <img
                  src="https://t3.ftcdn.net/jpg/04/65/46/52/360_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg"
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
                />
              </div>
            </div>
          </div>

          {/* Khu vực sản phẩm theo category hoặc tìm kiếm */}
          <div style={{ marginTop: "30px" }} ref={categoryProductsRef}>
            {(selectedCategory || searchTerm) && (
              <>
                <Title level={3} style={{ marginBottom: 16, textAlign: "center" }}>
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
                  <div style={{ color: "red", textAlign: "center" }}>{errorCategoryProducts}</div>
                ) : categoryProducts.length > 0 ? (
                  <Row gutter={[16, 16]}>
                    {categoryProducts.map((product) => (
                      <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                        <Card
                          hoverable
                          cover={
                            <div style={{ height: 80, overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
                              {product.image && (
                                <img
                                  alt={product.name}
                                  src={product.image}
                                  style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
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
                                  <span className="current-price">{formatVND(product.price)}</span>
                                  {product.oldPrice && (
                                    <span className="old-price">{formatVND(product.oldPrice)}</span>
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
                  <Empty description={searchTerm ? "Không tìm thấy sản phẩm." : "Không có sản phẩm nào trong danh mục này."} />
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
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src="https://t3.ftcdn.net/jpg/04/65/46/52/360_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg"
                alt=""
              />
            </div>
          </div>

          {/* Our product */}
          <div style={{ marginTop: "50px" }}>
            <ExploreOurProducts selectedCategory={selectedCategory} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;