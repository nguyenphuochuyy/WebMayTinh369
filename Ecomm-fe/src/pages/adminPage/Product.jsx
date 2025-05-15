import React, { useState, useEffect } from "react";
import {
  Layout,
  Typography,
  Table,
  Tag,
  Space,
  Button,
  Input,
  Modal,
  Form,
  InputNumber,
  Select,
  Upload,
  Popconfirm,
  message,
  Tooltip,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const formatVND = (price) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
};

const getStockStatus = (quantity) => {
  if (quantity === 0) return { text: "Hết hàng", color: "red" };
  if (quantity > 0 && quantity <= 10) return { text: "Sắp hết hàng", color: "orange" };
  return { text: "Còn hàng", color: "green" };
};

const Products = () => {
  const [searchText, setSearchText] = useState("");
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [isViewProductModalVisible, setIsViewProductModalVisible] = useState(false);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false); // Trạng thái để hiển thị form
  const [productForm] = Form.useForm();
  const [categoryForm] = Form.useForm();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productFileList, setProductFileList] = useState([]);
  const [categoryFileList, setCategoryFileList] = useState([]);

  const API_URL = "http://localhost:8082/api";

  useEffect(() => {
    fetchCategoriesAndProducts();
  }, []);

  // Lấy danh mục và sản phẩm theo danh mục
  const fetchCategoriesAndProducts = async () => {
    try {
      setLoading(true);
      // Lấy danh sách danh mục
      const categoriesResponse = await axios.get(`${API_URL}/categories`);
      const categoriesData = categoriesResponse.data;
      setCategories(categoriesData);

      // Lấy sản phẩm theo từng danh mục
      const allProducts = [];
      for (const category of categoriesData) {
        const productsResponse = await axios.get(`${API_URL}/products/category/${category.id}`);
        const productsData = productsResponse.data.map((product) => ({
          key: product.id,
          id: product.id,
          name: product.name,
          category: category, // Gán thông tin danh mục vào sản phẩm
          price: product.price,
          quantity: product.quantity || 0,
          description: product.description || "",
          image: product.image || "",
          factory: product.factory || "",
          discount: product.discount || 0,
        }));
        allProducts.push(...productsData);
      }

      setProducts(allProducts);
    } catch (error) {
      message.error("Lỗi khi tải dữ liệu: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      setCategories(response.data);
    } catch (error) {
      message.error("Lỗi khi tải danh sách danh mục: " + error.message);
    }
  };

  const showProductModal = (product = null) => {
    setEditingProduct(product);
    setProductFileList(product && product.image ? [{ uid: "-1", name: "image", status: "done", url: product.image }] : []);
    if (product) {
      productForm.setFieldsValue({
        name: product.name,
        category: product.category?.id || null,
        price: product.price,
        quantity: product.quantity,
        description: product.description,
        factory: product.factory,
        discount: product.discount,
      });
    } else {
      productForm.resetFields();
    }
    setIsProductModalVisible(true);
  };

  const showViewProductModal = (product) => {
    setViewingProduct(product);
    setIsViewProductModalVisible(true);
  };

  const showCategoryModal = (category = null) => {
    setEditingCategory(category);
    setCategoryFileList(category && category.image ? [{ uid: "-1", name: "image", status: "done", url: category.image }] : []);
    if (category) {
      categoryForm.setFieldsValue({
        name: category.name,
        description: category.description,
      });
      setShowCategoryForm(true); // Hiển thị form khi chỉnh sửa
    } else {
      categoryForm.resetFields();
      setShowCategoryForm(false); // Ẩn form khi chỉ mở modal
    }
    setIsCategoryModalVisible(true);
  };

  const handleAddCategory = () => {
    setEditingCategory(null); // Đảm bảo không ở chế độ chỉnh sửa
    categoryForm.resetFields();
    setCategoryFileList([]);
    setShowCategoryForm(true); // Hiển thị form khi thêm mới
  };

  const handleProductCancel = () => {
    setIsProductModalVisible(false);
    setEditingProduct(null);
    setProductFileList([]);
    productForm.resetFields();
  };

  const handleViewProductCancel = () => {
    setIsViewProductModalVisible(false);
    setViewingProduct(null);
  };

  const handleCategoryCancel = () => {
    setIsCategoryModalVisible(false);
    setEditingCategory(null);
    setShowCategoryForm(false); // Ẩn form khi đóng modal
    setCategoryFileList([]);
    categoryForm.resetFields();
  };

  const handleProductOk = async () => {
    try {
      const values = await productForm.validateFields();
      const formData = new FormData();
      const productData = {
        name: values.name,
        category: values.category ? { id: values.category } : null,
        price: values.price,
        quantity: values.quantity,
        description: values.description,
        factory: values.factory,
        discount: values.discount,
      };

      // Nếu không có ảnh mới, giữ nguyên ảnh cũ
      if (productFileList.length > 0 && productFileList[0].originFileObj) {
        formData.append("image", productFileList[0].originFileObj);
      } else if (editingProduct && editingProduct.image) {
        productData.image = editingProduct.image; // Gửi ảnh cũ nếu không có ảnh mới
      }

      formData.append("product", new Blob([JSON.stringify(productData)], { type: "application/json" }));

      if (editingProduct) {
        await axios.put(`${API_URL}/products/${editingProduct.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("Sản phẩm đã được cập nhật!");
      } else {
        const response = await axios.post(`${API_URL}/products`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        productData.id = response.data.id;
        productData.key = response.data.id;
        setProducts([...products, productData]);
        message.success("Sản phẩm mới đã được thêm!");
      }
      handleProductCancel();
      fetchCategoriesAndProducts();
    } catch (error) {
      message.error("Lỗi khi lưu sản phẩm: " + error.message);
    }
  };

  const handleCategoryOk = async () => {
    try {
      const values = await categoryForm.validateFields();
      const formData = new FormData();
      const categoryData = {
        name: values.name,
        description: values.description,
      };

      // Nếu không có ảnh mới, giữ nguyên ảnh cũ
      if (categoryFileList.length > 0 && categoryFileList[0].originFileObj) {
        formData.append("image", categoryFileList[0].originFileObj);
      } else if (editingCategory && editingCategory.image) {
        categoryData.image = editingCategory.image; // Gửi ảnh cũ nếu không có ảnh mới
      }

      formData.append("category", new Blob([JSON.stringify(categoryData)], { type: "application/json" }));

      if (editingCategory) {
        await axios.put(`${API_URL}/categories/${editingCategory.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("Danh mục đã được cập nhật!");
      } else {
        const response = await axios.post(`${API_URL}/categories`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        categoryData.id = response.data.id;
        setCategories([...categories, categoryData]);
        message.success("Danh mục mới đã được thêm!");
      }
      setShowCategoryForm(false); // Ẩn form sau khi thêm/sửa
      fetchCategoriesAndProducts();
    } catch (error) {
      message.error("Lỗi khi lưu danh mục: " + error.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
      message.success("Sản phẩm đã được xóa!");
    } catch (error) {
      message.error("Lỗi khi xóa sản phẩm: " + error.message);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`${API_URL}/categories/${id}`);
      setCategories(categories.filter((category) => category.id !== id));
      setProducts(products.map((product) => (product.category?.id === id ? { ...product, category: null } : product)));
      message.success("Danh mục đã được xóa!");
    } catch (error) {
      message.error("Lỗi khi xóa danh mục: " + error.message);
    }
  };

  const handleEditCategory = (category) => {
    showCategoryModal(category);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase()) ||
    (product.category && product.category.name && product.category.name.toLowerCase().includes(searchText.toLowerCase())) ||
    product.id.toString().includes(searchText)
  );

  const productColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "8%",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      ellipsis: { showTitle: false },
      render: (name) => <Tooltip placement="topLeft" title={name}>{name}</Tooltip>,
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      render: (category) => (category && category.name ? category.name : "Chưa phân loại"),
      filters: categories.map((cat) => ({ text: cat.name, value: cat.id })),
      onFilter: (value, record) => record.category && record.category.id === value,
      width: "15%",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (price) => formatVND(price),
      width: "10%",
    },
    {
      title: "Tồn kho",
      dataIndex: "quantity",
      key: "stock",
      sorter: (a, b) => a.quantity - b.quantity,
      render: (quantity) => quantity || 0,
      width: "10%",
    },
    {
      title: "Giảm giá (%)",
      dataIndex: "discount",
      key: "stock",
      sorter: (a, b) => a.discount - b.discount,
      render: (discount) => discount || 0,
      width: "10%",
    },
    {
      title: "Trạng thái",
      dataIndex: "quantity",
      key: "status",
      render: (quantity) => {
        const { text, color } = getStockStatus(quantity);
        return <Tag color={color}>{text}</Tag>;
      },
      width: "15%",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="default"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => showViewProductModal(record)}
          >
            Xem
          </Button>
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => showProductModal(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa sản phẩm này?"
            onConfirm={() => handleDeleteProduct(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="primary" danger size="small" icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const categoryColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "10%",
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
      ellipsis: { showTitle: false },
      render: (name) => <Tooltip placement="topLeft" title={name}>{name}</Tooltip>,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      ellipsis: { showTitle: false },
      render: (description) => <Tooltip placement="topLeft" title={description}>{description}</Tooltip>,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEditCategory(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa danh mục này?"
            onConfirm={() => handleDeleteCategory(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="primary" danger size="small" icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleProductUploadChange = ({ fileList }) => {
    setProductFileList(fileList.slice(-1));
  };

  const handleCategoryUploadChange = ({ fileList }) => {
    setCategoryFileList(fileList.slice(-1));
  };

  return (
    <Layout style={{ marginLeft: 200, minHeight: "100vh" }}>
      <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
        <div style={{ padding: 24, background: "#fff", minHeight: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <Title level={2}>Quản lý sản phẩm</Title>
            <div>
              <Input
                placeholder="Tìm kiếm sản phẩm..."
                prefix={<SearchOutlined />}
                style={{ width: 250, marginRight: 16 }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => showProductModal()}
                style={{ marginRight: 8 }}
              >
                Thêm sản phẩm
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => showCategoryModal()}
              >
                Quản lý danh mục
              </Button>
            </div>
          </div>

          <Table
            columns={productColumns}
            dataSource={filteredProducts}
            pagination={{ pageSize: 10 }}
            loading={loading}
            bordered
          />

          {/* Modal quản lý sản phẩm */}
          <Modal
            title={editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
            visible={isProductModalVisible}
            onOk={handleProductOk}
            onCancel={handleProductCancel}
            okText={editingProduct ? "Cập nhật" : "Thêm"}
            cancelText="Hủy"
            width={600}
          >
            <Form form={productForm} layout="vertical" name="product_form">
              <Form.Item
                name="name"
                label="Tên sản phẩm"
                rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
              >
                <Input placeholder="Nhập tên sản phẩm" />
              </Form.Item>

              <Form.Item
                name="category"
                label="Danh mục"
                rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
              >
                <Select placeholder="Chọn danh mục">
                  {categories.map((category) => (
                    <Option key={category.id} value={category.id}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="price"
                label="Giá (VND)"
                rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm!" }]}
              >
                <InputNumber
                  min={0}
                  step={1000}
                  placeholder="0"
                  style={{ width: "100%" }}
                  formatter={(value) => formatVND(value).replace("₫", "")}
                  parser={(value) => value.replace(/[^0-9]/g, "")}
                />
              </Form.Item>

              <Form.Item
                name="quantity"
                label="Tồn kho"
                rules={[{ required: true, message: "Vui lòng nhập số lượng tồn kho!" }]}
              >
                <InputNumber min={0} placeholder="0" style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                name="discount"
                label="Giảm giá (%)"
                rules={[{ required: true, message: "Vui lòng nhập mức giảm giá của sản phẩm!" }]}
              >
                <InputNumber min={0} placeholder="0" style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item name="description" label="Mô tả">
                <TextArea rows={4} placeholder="Nhập mô tả sản phẩm" />
              </Form.Item>

              <Form.Item name="factory" label="Hãng sản xuất">
                <Input placeholder="Nhập hãng sản xuất" />
              </Form.Item>

              <Form.Item name="image" label="Hình ảnh">
                <Upload
                  beforeUpload={() => false}
                  onChange={handleProductUploadChange}
                  fileList={productFileList}
                  maxCount={1}
                  listType="picture"
                >
                  <Button icon={<UploadOutlined />}>Tải lên ảnh</Button>
                </Upload>
              </Form.Item>
            </Form>
          </Modal>

          {/* Modal xem chi tiết sản phẩm */}
          <Modal
            title="Chi tiết sản phẩm"
            visible={isViewProductModalVisible}
            onCancel={handleViewProductCancel}
            footer={[
              <Button key="back" onClick={handleViewProductCancel}>
                Đóng
              </Button>,
              <Button
                key="edit"
                type="primary"
                onClick={() => {
                  handleViewProductCancel();
                  showProductModal(viewingProduct);
                }}
              >
                Chỉnh sửa
              </Button>,
            ]}
            width={600}
          >
            {viewingProduct && (
              <div style={{ padding: "0 20px" }}>
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                  <img
                    src={viewingProduct.image || `/api/placeholder/200/200?text=${viewingProduct.name}`}
                    alt={viewingProduct.name}
                    style={{ maxWidth: "200px" }}
                  />
                </div>
                <p><strong>ID:</strong> {viewingProduct.id}</p>
                <p><strong>Tên sản phẩm:</strong> {viewingProduct.name}</p>
                <p><strong>Danh mục:</strong> {viewingProduct.category?.name || "Chưa phân loại"}</p>
                <p><strong>Giá:</strong> {formatVND(viewingProduct.price)}</p>
                <p><strong>Tồn kho:</strong> {viewingProduct.quantity}</p>
                <p><strong>Trạng thái:</strong>
                  <Tag
                    color={getStockStatus(viewingProduct.quantity).color}
                    style={{ marginLeft: 8 }}
                  >
                    {getStockStatus(viewingProduct.quantity).text}
                  </Tag>
                </p>
                <p><strong>Hãng sản xuất:</strong> {viewingProduct.factory}</p>
                <p><strong>Mô tả:</strong> {viewingProduct.description}</p>
              </div>
            )}
          </Modal>

          {/* Modal quản lý danh mục */}
          <Modal
            title="Quản lý danh mục"
            visible={isCategoryModalVisible}
            onCancel={handleCategoryCancel}
            footer={[
              <Button key="back" onClick={handleCategoryCancel}>
                Đóng
              </Button>,
              <Button
                key="add"
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddCategory}
              >
                Thêm danh mục
              </Button>,
            ]}
            width={800}
          >
            <Table
              columns={categoryColumns}
              dataSource={categories}
              pagination={{ pageSize: 5 }}
              bordered
              rowKey="id"
            />
            {showCategoryForm && (
              <Form form={categoryForm} layout="vertical" name="category_form" style={{ marginTop: 16 }}>
                <Form.Item
                  name="name"
                  label="Tên danh mục"
                  rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
                >
                  <Input placeholder="Nhập tên danh mục" />
                </Form.Item>

                <Form.Item name="description" label="Mô tả">
                  <TextArea rows={4} placeholder="Nhập mô tả danh mục" />
                </Form.Item>

                <Form.Item name="image" label="Hình ảnh">
                  <Upload
                    beforeUpload={() => false}
                    onChange={handleCategoryUploadChange}
                    fileList={categoryFileList}
                    maxCount={1}
                    listType="picture"
                  >
                    <Button icon={<UploadOutlined />}>Tải lên ảnh</Button>
                  </Upload>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" onClick={handleCategoryOk}>
                    {editingCategory ? "Cập nhật" : "Thêm"}
                  </Button>
                </Form.Item>
              </Form>
            )}
          </Modal>
        </div>
      </Content>
    </Layout>
  );
};

export default Products;