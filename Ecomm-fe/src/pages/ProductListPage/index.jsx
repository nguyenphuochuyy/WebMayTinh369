import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Typography, Breadcrumb, Select, Input } from "antd";
import "./ProductListPage.css";
import { useParams } from "react-router-dom";
import { Footer, Header } from "antd/es/layout/layout";
import { Option } from "antd/es/mentions";
import "../../styles/Base_CSS/style.css";
const { Content } = Layout;
const { Title } = Typography;

// Dữ liệu giả lập (thay thế cho API)
const mockProducts = [
  {
    id: 1,
    category: "PC Gaming",
    brand: "Intel",
    name: "PC TTG Gaming Pro i5 14600KF - RTX 3060 8G",
    price: 20680000,
    originalPrice: 22680000,
    discount: 10,
    image: "https://via.placeholder.com/300x200?text=PC+TTG+Gaming+Pro+i5",
  },
  {
    id: 2,
    category: "PC Gaming",
    brand: "Intel",
    name: "PC TTG Gaming Pro i5 14600KF - RTX 3050 6G",
    price: 18680000,
    originalPrice: 19860000,
    discount: 6,
    image:
      "https://via.placeholder.com/300x200?text=PC+TTG+Gaming+Pro+i5+RTX+3050",
  },
  {
    id: 3,
    category: "PC Gaming",
    brand: "Intel",
    name: "PC Mini Gaming Luxury i5 12400F",
    price: 20380000,
    originalPrice: 22380000,
    discount: 11,
    image: "https://via.placeholder.com/300x200?text=PC+Mini+Gaming+Luxury",
  },
  {
    id: 4,
    category: "PC Gaming",
    brand: "AMD",
    name: "PC Super Luxury AMD Gaming Ryzen 7",
    price: 45680000,
    originalPrice: 53680000,
    discount: 15,
    image: "https://via.placeholder.com/300x200?text=PC+Super+Luxury+AMD",
  },
  {
    id: 5,
    category: "PC Gaming",
    brand: "AMD",
    name: "PC AMD Gaming Pro Ryzen 9 9950X - RTX",
    price: 38680000,
    originalPrice: 40680000,
    discount: 5,
    image: "https://via.placeholder.com/300x200?text=PC+AMD+Gaming+Pro+Ryzen+9",
  },
  {
    id: 6,
    category: "PC Workstation",
    brand: "Intel",
    name: "PC TTG Gaming i7 12700KF - RTX 4060 8G",
    price: 21680000,
    originalPrice: 23680000,
    discount: 9,
    image: "https://via.placeholder.com/300x200?text=PC+TTG+Gaming+i7",
  },
  {
    id: 7,
    category: "PC Workstation",
    brand: "Intel",
    name: "PC TTG Gaming i7 14700KF - 32GB DDR5",
    price: 28680000,
    originalPrice: 30680000,
    discount: 7,
    image: "https://via.placeholder.com/300x200?text=PC+TTG+Gaming+i7+32GB",
  },
  {
    id: 8,
    category: "PC Workstation",
    brand: "Intel",
    name: "PC TTG Gaming i5 12400F-16GB DDR5",
    price: 16980000,
    originalPrice: 20980000,
    discount: 19,
    image: "https://via.placeholder.com/300x200?text=PC+TTG+Gaming+i5+16GB",
  },
  {
    id: 9,
    category: "PC Workstation",
    brand: "AMD",
    name: "PC AMD Gaming Ryzen 7 9700X - RTX 4070",
    price: 35680000,
    originalPrice: 37680000,
    discount: 5,
    image: "https://via.placeholder.com/300x200?text=PC+AMD+Gaming+Ryzen+7",
  },
  {
    id: 10,
    category: "PC Workstation",
    brand: "AMD",
    name: "PC AMD Gaming Ryzen 5 7500F - RTX 5070 Ti",
    price: 35980000,
    originalPrice: 37980000,
    discount: 5,
    image: "https://via.placeholder.com/300x200?text=PC+AMD+Gaming+Ryzen+5",
  },
];

function ProductListPage() {
  const params = useParams();
  const { categoryId } = params;
  const [selectedCategory, setSelectedCategory] = useState("PC Gaming");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Lọc sản phẩm khi danh mục thay đổi
  useEffect(() => {
    setFilteredProducts(mockProducts);
  }, [selectedCategory]);
  console.log(categoryId, "categoryId");
  return (
    <div className="container">
      <Layout style={{ minHeight: "100vh" }}>
        <Content >
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
            <Breadcrumb.Item>Máy tính chơi game cực mạnh</Breadcrumb.Item>
            {/* <Breadcrumb.Item>{category}</Breadcrumb.Item> */}
          </Breadcrumb>
          <div style={{ background: "#ccc", padding: 24, minHeight: 280 }}>
            <Row gutter={16}>
              <Col span={6} style={{background : "red" }}>
                <div>
                  <h3>Danh mục sản phẩm</h3>
                  <Select
                    // defaultValue={category}
                    style={{ width: "100%" }}
                    // onChange={setCategory}
                  >
                    {/* {categories.map(cat => <Option key={cat} value={cat}>{cat}</Option>)} */}
                  </Select>
                </div>
                <div style={{ marginTop: 20 }}>
                  <h3>Nhà cung cấp</h3>
                  <Select defaultValue="Khác" style={{ width: "100%" }}>
                    <Option value="Khác">Khác</Option>
                    <Option value="Mãn">Mãn</Option>
                  </Select>
                </div>
                <div style={{ marginTop: 20 }}>
                  <h3>Lọc giá</h3>
                  <Select
                  // value={priceRange}
                  // style={{ width: '100%' }}
                  // onChange={setPriceRange}
                  >
                    {/* {priceRanges.map(range => <Option key={range} value={range}>{range}</Option>)} */}
                  </Select>
                </div>
              </Col>
              <Col span={18}>
                <Input
                  placeholder="Tìm kiếm"
                  // value={search}
                  // onChange={e => setSearch(e.target.value)}
                  style={{ marginBottom: 16, width: "100%" }}
                />
                <Row gutter={[16, 16]}>
                  {/* {products
              .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
              .map((product, index) => (
                <Col span={6} key={index}>
                  <Card
                    hoverable
                    cover={<img alt={product.name} src={product.img} />}
                    title={product.name}
                  >
                    {product.price}
                  </Card>
                </Col>
              ))} */}
                </Row>
              </Col>
            </Row>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Tự Build PC ©2025</Footer>
      </Layout>
    </div>
  );
}

export default ProductListPage;
