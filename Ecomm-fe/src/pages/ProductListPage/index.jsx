import React, { useState, useEffect, useContext } from "react";
import {
  Layout,
  Row,
  Col,
  Typography,
  Breadcrumb,
  Select,
  Card,
  message,
  Button,
  notification,
  Empty,
  Spin,
} from "antd";
import "./ProductListPage.css";
import "../../styles/Base_CSS/style.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../components/context/auth.context";
import { addProductToCart } from "../../services/api.service";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const API_URL = "http://localhost:8082/api";

function ProductListPage() {
  const params = useParams();
  const categoryId = params.categoryId;
  const [listCategory, setListCategory] = useState([]);
  const [factories, setFactories] = useState([]); // Danh sách factory từ API
  const [allProducts, setAllProducts] = useState([]); // Lưu danh sách sản phẩm gốc
  const [filteredProducts, setFilteredProducts] = useState([]); // Danh sách sản phẩm đã lọc
  const [selectedCategory, setSelectedCategory] = useState(null); // Lưu cả { value, label }
  const [selectedBrand, setSelectedBrand] = useState("Tất cả");
  const [priceRange, setPriceRange] = useState("all");
  const [sortOption, setSortOption] = useState("Giá thấp đến cao");
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true); // Trạng thái tải danh mục
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [note, contextHolder] = notification.useNotification();

  // Lấy danh mục và đặt category mặc định
  useEffect(() => {
    const initializeCategories = async () => {
      try {
        setCategoriesLoading(true);
        const response = await axios.get(`${API_URL}/categories`);
        const categories = response.data;
        setListCategory(categories);

        // Tìm tên danh mục dựa trên categoryId
        if (categoryId) {
          const category = categories.find((cat) => cat.id === categoryId);
          if (category) {
            setSelectedCategory({ value: category.id, label: category.name });
          } else {
            setSelectedCategory(null);
          }
          fetchFactories(categoryId);
          fetchProductsByCategory(categoryId);
        }
      } catch (error) {
        message.error("Lỗi khi lấy danh sách danh mục: " + error.message);
      } finally {
        setCategoriesLoading(false);
      }
    };
    initializeCategories();
  }, [categoryId]);

  // Áp dụng bộ lọc và sắp xếp khi các state thay đổi
  useEffect(() => {
    applyFiltersAndSort();
  }, [allProducts, selectedBrand, priceRange, sortOption]);

  const fetchFactories = async (catId) => {
    try {
      const response = await axios.get(
        `${API_URL}/products/category/${catId}/factories`
      );
      const factoryList = response.data;
      setFactories(["Tất cả", ...factoryList]);
      setSelectedBrand("Tất cả"); // Đặt mặc định là "Tất cả"
    } catch (error) {
      message.error("Lỗi khi lấy danh sách nhà cung cấp: " + error.message);
      setFactories([]);
      setSelectedBrand("Tất cả");
    }
  };

  const fetchProductsByCategory = async (catId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/products/category/${catId}`);
      const products = response.data;
      setAllProducts(products); // Lưu danh sách gốc
      console.log("Sản phẩm:", products);
    } catch (error) {
      message.error("Lỗi khi lấy sản phẩm: " + error.message);
      setAllProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...allProducts];

    // 1. Lọc theo nhà cung cấp (factory)
    filtered = applyBrandFilter(filtered);

    // 2. Lọc theo giá
    filtered = applyPriceFilter(filtered);

    // 3. Sắp xếp
    filtered = applySort(filtered);

    setFilteredProducts(filtered);
  };

  const applyBrandFilter = (products) => {
    if (!selectedBrand || selectedBrand === "Tất cả") {
      return products;
    }
    return products.filter((product) => product.factory === selectedBrand);
  };

  const applyPriceFilter = (products) => {
    if (priceRange === "all") return products;
    const [min, max] = parsePriceRange(priceRange);
    return products.filter((product) => {
      const priceAfterDiscount = product.priceAfterDiscount || 0;
      return priceAfterDiscount >= min && priceAfterDiscount <= max;
    });
  };

  const parsePriceRange = (range) => {
    switch (range) {
      case "under_5m":
        return [0, 5000000];
      case "5m_to_10m":
        return [5000000, 10000000];
      case "10m_to_15m":
        return [10000000, 15000000];
      case "over_15m":
        return [15000000, Infinity];
      default:
        return [0, Infinity];
    }
  };

  const applySort = (products) => {
    const sortedProducts = [...products];
    switch (sortOption) {
      case "Giá thấp đến cao":
        return sortedProducts.sort(
          (a, b) => (a.priceAfterDiscount || 0) - (b.priceAfterDiscount || 0)
        );
      case "Giá cao đến thấp":
        return sortedProducts.sort(
          (a, b) => (b.priceAfterDiscount || 0) - (a.priceAfterDiscount || 0)
        );
      default:
        return sortedProducts; // Mới nhất, giữ nguyên thứ tự từ API
    }
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

  return (
    <Layout
      style={{
        minHeight: "100vh",
        backgroundColor: "#fff",
        marginLeft: 75,
        marginRight: 75,
        marginTop: 20,
        marginBottom: 20,
      }}
    >
      {contextHolder}
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "20px 20px" }}>
          <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item>
            {selectedCategory ? selectedCategory.label : ""}
          </Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: "#fff", padding: 24, minHeight: "100vh" }}>
          <Row gutter={24}>
            <Col span={6}>
              <div>
                <Title level={4}>Danh mục sản phẩm</Title>
                <Select
                  labelInValue
                  value={selectedCategory}
                  style={{ width: "100%", marginBottom: 20 }}
                  onChange={(value) => {
                    setSelectedCategory(value);
                    fetchFactories(value.value);
                    fetchProductsByCategory(value.value);
                  }}
                  placeholder={
                    categoriesLoading ? "Đang tải danh mục..." : "Chọn danh mục"
                  }
                  loading={categoriesLoading}
                >
                  {listCategory.map((category) => (
                    <Option key={category.id} value={category.id}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
              </div>
              <div>
                <Title level={4}>Nhà cung cấp</Title>
                <Select
                  value={selectedBrand}
                  style={{ width: "100%", marginBottom: 20 }}
                  onChange={(value) => {
                    setSelectedBrand(value);
                  }}
                  placeholder="Chọn nhà cung cấp"
                >
                  {factories.map((factory) => (
                    <Option key={factory} value={factory}>
                      {factory}
                    </Option>
                  ))}
                </Select>
              </div>
              <div>
                <Title level={4}>Lọc giá</Title>
                <Select
                  value={priceRange}
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    setPriceRange(value);
                  }}
                >
                  <Option value="all">Tất cả</Option>
                  <Option value="under_5m">Dưới 5.000.000đ</Option>
                  <Option value="5m_to_10m">5.000.000đ - 10.000.000đ</Option>
                  <Option value="10m_to_15m">10.000.000đ - 15.000.000đ</Option>
                  <Option value="over_15m">Trên 15.000.000đ</Option>
                </Select>
              </div>
            </Col>
            <Col span={18}>
              <Row gutter={[16, 16]}>
                <div
                  className="background-img"
                  style={{ width: "100%", height: "100%" }}
                >
                  <img
                    width={"100%"}
                    src="https://file.hstatic.net/1000288298/collection/best-pc-cases_copy_dcd36f7314434aae9c41ebfe31662933.jpg"
                    alt="background"
                  />
                </div>
              </Row>
              <Row>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <h2>{selectedCategory ? selectedCategory.label : ""}</h2>
                  <div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Sắp xếp theo:
                    <Select
                      value={sortOption}
                      style={{ width: 120, marginLeft: 10 }}
                      onChange={(value) => {
                        setSortOption(value);
                      }}
                    >
             
                      <Option value="Giá thấp đến cao">Giá thấp đến cao</Option>
                      <Option value="Giá cao đến thấp">Giá cao đến thấp</Option>
               
                    </Select>
                  </div>
                </div>
              </Row>
              <Row gutter={[24, 24]} className="products-container">
                <Col span={24}>
                  <div className="product-list">
                    {loading ? (
                      <div className="loading-container">
                        <Spin size="large" />
                        <p className="mt-4">Đang tải sản phẩm...</p>
                      </div>
                    ) : filteredProducts.length > 0 ? (
                      <Row gutter={[24, 24]}>
                        {filteredProducts.map((product) => (
                          <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                            <Card
                              hoverable
                              className="product-card shadow-sm"
                              cover={
                                <div className="product-image-container">
                                  <img
                                    alt={product.name}
                                    src={
                                      product.image ||
                                      "https://via.placeholder.com/200"
                                    }
                                    className="product-image"
                                    onClick={() =>
                                      navigate(`/detailPage/${product.id}`)
                                    }
                                  />
                                  {product.discount > 0 && (
                                    <div className="discount-badge">
                                      -{product.discount}%
                                    </div>
                                  )}
                                </div>
                              }
                              bodyStyle={{ padding: "16px" }}
                            >
                              <div className="product-content">
                                <Title
                                  className="product-title"
                                  level={5}
                                  ellipsis={{ rows: 2, tooltip: product.name }}
                                  onClick={() =>
                                    navigate(`/detailPage/${product.id}`)
                                  }
                                >
                                  {product.name}
                                </Title>

                                <div className="product-price">
                                  <span className="sale-price">
                                    {new Intl.NumberFormat("vi-VN", {
                                      style: "currency",
                                      currency: "VND",
                                    }).format(product.priceAfterDiscount)}
                                  </span>

                                  {product.discount > 0 && (
                                    <span className="original-price">
                                      {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                      }).format(product.price)}
                                    </span>
                                  )}
                                </div>

                                <div className="button-container">
                                  <Button
                                    type="primary"
                                    className="add-to-cart-button"
                                    // icon={<ShoppingCartOutlined />}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleAddProductToCart(product.id, 1);
                                    }}
                                  >
                                    Thêm vào giỏ
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    ) : (
                      <Empty
                        description="Không tìm thấy sản phẩm nào"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                      />
                    )}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
}

export default ProductListPage;
