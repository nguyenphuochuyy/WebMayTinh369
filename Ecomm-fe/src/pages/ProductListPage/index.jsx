import React, { useState, useEffect, use } from "react";
import {
  Layout,
  Row,
  Col,
  Typography,
  Breadcrumb,
  Select,
  Input,
  Card,
  message,
  Button,
} from "antd";
import "./ProductListPage.css";
import "../../styles/Base_CSS/style.css";
import { useParams } from "react-router-dom";
import { getCategories } from "../../services/product.service";
const { Content, Footer } = Layout;
const { Title } = Typography;
const { Option } = Select;

function ProductListPage() {
  const params = useParams();
  const categoryId = params.categoryId;
  const [listCategory, setListCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedBrand, setSelectedBrand] = useState("Khác");
  const [priceRange, setPriceRange] = useState("Dưới 5.000.000đ");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getListCategories = async () => {
      const result = await getCategories();
      console.log(result);

      if (result) {
        setListCategory(result);
      } else {
        message.error("Lỗi khi lấy danh sách danh mục sản phẩm");
      }
    };
    getListCategories();
  }, []);

  return (
    <>
      <div className="container">
        <Layout style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
          <Content>
            <Breadcrumb style={{ margin: "16px 20px" }}>
              <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
              <Breadcrumb.Item>Máy tính chơi game, Làm việc</Breadcrumb.Item>
            </Breadcrumb>
            <div
              style={{ background: "#fff", padding: 24, minHeight: "100vh" }}
            >
              <Row gutter={24}>
                <Col span={6}>
                  <div>
                    <Title level={4}>Danh mục sản phẩm</Title>
                    <Select
                      value={selectedCategory}
                      style={{ width: "100%", marginBottom: 20 }}
                      onChange={(value) => setSelectedCategory(value)}
                    >
                      {listCategory.map((category) => (
                        <Option key={category.id} value={category.name}>
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
                      onChange={(value) => setSelectedBrand(value)}
                    >
                      <Option value="Khác">Khác</Option>
                      <Option value="Dell">Dell</Option>
                      <Option value="AMD">AMD</Option>
                      <Option value="pc">pc</Option>
                    </Select>
                  </div>
                  <div>
                    <Title level={4}>Lọc giá</Title>
                    <Select
                      value={priceRange}
                      style={{ width: "100%" }}
                      onChange={(value) => setPriceRange(value)}
                    >
                      <Option value="Dưới 5.000.000đ">Dưới 5.000.000đ</Option>
                      <Option value="5.000.000đ - 10.000.000đ">
                        5.000.000đ - 10.000.000đ
                      </Option>
                      <Option value="10.000.000đ - 15.000.000đ">
                        10.000.000đ - 15.000.000đ
                      </Option>
                      <Option value="Trên 15.000.000đ">Trên 15.000.000đ</Option>
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
                      <h2>Pc chơi game</h2>
                      <div>
                        Sắp xếp theo:
                        <Select
                          defaultValue="Mới nhất"
                          style={{ width: 120, marginLeft: 10 }}
                          onChange={(value) => setSearchTerm(value)}
                        >
                          <Option value="Mới nhất">Mới nhất</Option>
                          <Option value="Giá thấp đến cao">
                            Giá thấp đến cao
                          </Option>
                          <Option value="Giá cao đến thấp">
                            Giá cao đến thấp
                          </Option>
                          <Option value="Đánh giá cao">Đánh giá cao</Option>
                        </Select>
                      </div>
                    </div>
                  </Row>
                  <Row>
                    {/* danh sách sản phẩm */}
                    <Col span={24}>
                      <div style={{ display: "flex", flexWrap: "wrap" }}>
                        <div>
                          <Card
                            hoverable
                            style={{ width: 200, marginTop: 16 , padding: 10}}
                            cover={
                              <img
                                alt="example"
                                src="https://product.hstatic.net/1000288298/product/pc_5090_8f71e305fa744713940a9d7009a42b03_large.jpg"
                              />
                            }
                          >
                            <Title style={{ fontSize: 14 , textAlign : 'center' , fontWeight : '500' , opacity : '0.7'}} level={5}>PC TTG GAMING ULTRA 9 285K - RTX 5090 32GB</Title>
                            <p style={{ textAlign: "center" , fontSize : '24px' , fontWeight : '500' , color : 'red'}}>10.000.000đ</p>
                      
                            <Button
                            type="primary"
                            style={{ width: "100%" }}
                            onClick={() =>  message.success("Thêm vào giỏ hàng thành công")}
                            >Thêm vào giỏ hàng
                            </Button>
                          </Card>
                        </div>
                     
                     
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Content>
        </Layout>
      </div>
    </>
  );
}

export default ProductListPage;
