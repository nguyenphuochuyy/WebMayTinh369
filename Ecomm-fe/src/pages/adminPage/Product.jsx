import React, { useState } from 'react';
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
  Tooltip
} from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  EyeOutlined,
  UploadOutlined
} from '@ant-design/icons';

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const Products = () => {
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);
  const [form] = Form.useForm();
  
  // Dữ liệu giả lập cho danh sách sản phẩm
  const [products, setProducts] = useState([
    {
      key: '1',
      id: 'P001',
      name: 'Laptop Dell XPS 13',
      category: 'Electronics',
      price: 1200,
      stock: 23,
      status: 'In Stock',
      description: 'Dell XPS 13 9310 Laptop: 13.4-inch FHD+ Display, Intel Core i7-1185G7, 16GB RAM, 512GB SSD, Iris Xe Graphics, Windows 10 Pro',
      image: 'laptop.jpg',
    },
    {
      key: '2',
      id: 'P002',
      name: 'Samsung Galaxy S23',
      category: 'Electronics',
      price: 999,
      stock: 45,
      status: 'In Stock',
      description: 'Samsung Galaxy S23 with 6.1-inch Dynamic AMOLED 2X, 8GB RAM, 256GB storage, 50MP camera',
      image: 'phone.jpg',
    },
    {
      key: '3',
      id: 'P003',
      name: 'Nike Air Max 270',
      category: 'Footwear',
      price: 150,
      stock: 0,
      status: 'Out of Stock',
      description: 'Nike Air Max 270 Men\'s shoe with large Air unit and comfortable fit',
      image: 'shoes.jpg',
    },
    {
      key: '4',
      id: 'P004',
      name: 'Ceramic Coffee Mug',
      category: 'Home',
      price: 12.99,
      stock: 120,
      status: 'In Stock',
      description: 'Premium 12oz ceramic coffee mug, microwave and dishwasher safe',
      image: 'mug.jpg',
    },
    {
      key: '5',
      id: 'P005',
      name: 'Cotton T-Shirt',
      category: 'Clothing',
      price: 19.99,
      stock: 78,
      status: 'In Stock',
      description: '100% organic cotton t-shirt, available in multiple colors',
      image: 'tshirt.jpg',
    },
  ]);

  const categories = ['Electronics', 'Footwear', 'Home', 'Clothing', 'Books', 'Toys', 'Sports'];

  const showModal = (product = null) => {
    setEditingProduct(product);
    if (product) {
      form.setFieldsValue(product);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const showViewModal = (product) => {
    setViewingProduct(product);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingProduct(null);
    form.resetFields();
  };

  const handleViewCancel = () => {
    setIsViewModalVisible(false);
    setViewingProduct(null);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingProduct) {
        // Cập nhật sản phẩm hiện có
        setProducts(prev => 
          prev.map(product => 
            product.id === editingProduct.id ? 
            { 
              ...product, 
              ...values, 
              status: values.stock > 0 ? 'In Stock' : 'Out of Stock'
            } : product
          )
        );
        message.success('Sản phẩm đã được cập nhật!');
      } else {
        // Thêm sản phẩm mới
        const newProduct = {
          key: Date.now().toString(),
          id: `P00${products.length + 1}`,
          ...values,
          status: values.stock > 0 ? 'In Stock' : 'Out of Stock',
          image: 'default.jpg', // Sử dụng ảnh mặc định
        };
        setProducts(prev => [...prev, newProduct]);
        message.success('Sản phẩm mới đã được thêm!');
      }
      setIsModalVisible(false);
      setEditingProduct(null);
      form.resetFields();
    });
  };

  const handleDelete = (id) => {
    setProducts(prev => prev.filter(product => product.id !== id));
    message.success('Sản phẩm đã được xóa!');
  };

  // Lọc sản phẩm dựa trên từ khóa tìm kiếm
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchText.toLowerCase()) ||
    product.category.toLowerCase().includes(searchText.toLowerCase()) ||
    product.id.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '8%',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      ellipsis: {
        showTitle: false,
      },
      render: (name) => (
        <Tooltip placement="topLeft" title={name}>
          {name}
        </Tooltip>
      ),
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      filters: categories.map(category => ({ text: category, value: category })),
      onFilter: (value, record) => record.category === value,
      width: '15%',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
      render: (price) => `$${price.toFixed(2)}`,
      width: '10%',
    },
    {
      title: 'Tồn kho',
      dataIndex: 'stock',
      key: 'stock',
      sorter: (a, b) => a.stock - b.stock,
      width: '10%',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'In Stock', value: 'In Stock' },
        { text: 'Out of Stock', value: 'Out of Stock' },
        { text: 'Discontinued', value: 'Discontinued' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        let color = '';
        if (status === 'In Stock') color = 'green';
        else if (status === 'Out of Stock') color = 'red';
        else if (status === 'Discontinued') color = 'gray';
        
        return <Tag color={color}>{status}</Tag>;
      },
      width: '15%',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="default" 
            size="small" 
            icon={<EyeOutlined />} 
            onClick={() => showViewModal(record)}
          >
            Xem
          </Button>
          <Button 
            type="primary" 
            size="small" 
            icon={<EditOutlined />} 
            onClick={() => showModal(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa sản phẩm này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button 
              type="primary" 
              danger 
              size="small" 
              icon={<DeleteOutlined />}
            >
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ marginLeft: 200, minHeight: '100vh' }}>
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <div style={{ padding: 24, background: '#fff', minHeight: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
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
                onClick={() => showModal()}
              >
                Thêm sản phẩm
              </Button>
            </div>
          </div>
          
          <Table
            columns={columns}
            dataSource={filteredProducts}
            pagination={{ pageSize: 10 }}
            bordered
          />

          {/* Modal thêm/sửa sản phẩm */}
          <Modal
            title={editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={editingProduct ? "Cập nhật" : "Thêm"}
            cancelText="Hủy"
            width={600}
          >
            <Form
              form={form}
              layout="vertical"
              name="product_form"
            >
              <Form.Item
                name="name"
                label="Tên sản phẩm"
                rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
              >
                <Input placeholder="Nhập tên sản phẩm" />
              </Form.Item>
              
              <Form.Item
                name="category"
                label="Danh mục"
                rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
              >
                <Select placeholder="Chọn danh mục">
                  {categories.map(category => (
                    <Option key={category} value={category}>{category}</Option>
                  ))}
                </Select>
              </Form.Item>
              
              <Form.Item
                name="price"
                label="Giá"
                rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}
              >
                <InputNumber 
                  min={0} 
                  step={0.01} 
                  placeholder="0.00" 
                  prefix="$"
                  style={{ width: '100%' }}
                />
              </Form.Item>
              
              <Form.Item
                name="stock"
                label="Tồn kho"
                rules={[{ required: true, message: 'Vui lòng nhập số lượng tồn kho!' }]}
              >
                <InputNumber 
                  min={0} 
                  placeholder="0" 
                  style={{ width: '100%' }}
                />
              </Form.Item>
              
              <Form.Item
                name="description"
                label="Mô tả"
              >
                <TextArea 
                  rows={4} 
                  placeholder="Nhập mô tả sản phẩm"
                />
              </Form.Item>
              
              <Form.Item
                name="image"
                label="Hình ảnh"
              >
                <Upload 
                  maxCount={1}
                  listType="picture"
                  beforeUpload={() => false}
                >
                  <Button icon={<UploadOutlined />}>Tải lên</Button>
                </Upload>
              </Form.Item>
            </Form>
          </Modal>

          {/* Modal xem chi tiết sản phẩm */}
          <Modal
            title="Chi tiết sản phẩm"
            visible={isViewModalVisible}
            onCancel={handleViewCancel}
            footer={[
              <Button key="back" onClick={handleViewCancel}>
                Đóng
              </Button>,
              <Button 
                key="edit" 
                type="primary"
                onClick={() => {
                  handleViewCancel();
                  showModal(viewingProduct);
                }}
              >
                Chỉnh sửa
              </Button>,
            ]}
            width={600}
          >
            {viewingProduct && (
              <div style={{ padding: '0 20px' }}>
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                  <img 
                    src={`/api/placeholder/200/200?text=${viewingProduct.name}`} 
                    alt={viewingProduct.name} 
                    style={{ maxWidth: '200px' }} 
                  />
                </div>
                
                <p><strong>ID:</strong> {viewingProduct.id}</p>
                <p><strong>Tên sản phẩm:</strong> {viewingProduct.name}</p>
                <p><strong>Danh mục:</strong> {viewingProduct.category}</p>
                <p><strong>Giá:</strong> ${viewingProduct.price.toFixed(2)}</p>
                <p><strong>Tồn kho:</strong> {viewingProduct.stock}</p>
                <p><strong>Trạng thái:</strong> 
                  <Tag 
                    color={
                      viewingProduct.status === 'In Stock' ? 'green' : 
                      viewingProduct.status === 'Out of Stock' ? 'red' : 'gray'
                    }
                    style={{ marginLeft: 8 }}
                  >
                    {viewingProduct.status}
                  </Tag>
                </p>
                <p><strong>Mô tả:</strong> {viewingProduct.description}</p>
              </div>
            )}
          </Modal>
        </div>
      </Content>
    </Layout>
  );
};

export default Products;