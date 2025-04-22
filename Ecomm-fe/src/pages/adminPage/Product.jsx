import React, { useState, useEffect } from "react";
import { Form, Input, Button, Upload, message, InputNumber, Table, Space, Select } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined, LoadingOutlined } from "@ant-design/icons";
import axios from "axios";

const API_URL = "http://localhost:8082/api"; // Đảm bảo URL này đúng với backend của bạn

const Product = () => {
  const [form] = Form.useForm();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (editingProduct) {
      form.setFieldsValue({
        name: editingProduct.name,
        price: editingProduct.price,
        description: editingProduct.description,
        quantity: editingProduct.quantity,
        factory: editingProduct.factory,
        categoryId: editingProduct.category?.id,
      });
      setImageUrl(editingProduct.image);
    } else {
      form.resetFields();
      setImageUrl(null);
    }
  }, [editingProduct, form]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      message.error("Failed to fetch products.");
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      setCategories(response.data);
    } catch (error) {
      message.error("Failed to fetch categories.");
      console.error("Error fetching categories:", error);
    }
  };

  const handleUploadChange = (info) => {
    if (info.file.status === "uploading") {
      setUploadLoading(true);
      return;
    }
    if (info.file.status === "done") {
      setImageUrl(info.file.response);
      setUploadLoading(false);
    } else if (info.file.status === "error") {
      message.error("Failed to upload image.");
      setUploadLoading(false);
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();

      const productData = {
        name: values.name,
        price: values.price,
        description: values.description,
        quantity: values.quantity,
        factory: values.factory,
        category: {
          id: values.categoryId
        }
      };

      formData.append("product", new Blob([JSON.stringify(productData)], { type: 'application/json' }));

      const imageFileList = values.image;
      if (imageFileList && imageFileList.length > 0) {
        const imageFile = imageFileList[0]?.originFileObj;
        if (imageFile) {
          formData.append("image", imageFile);
        }
      }

      const apiCall = editingProduct
        ? axios.put(`${API_URL}/products/${editingProduct.id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
        : axios.post(`${API_URL}/products`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

      const response = await apiCall;

      if (response.status === (editingProduct ? 200 : 201)) {
        message.success(`Product ${editingProduct ? 'updated' : 'created'} successfully!`);
        form.resetFields();
        setImageUrl(null);
        setEditingProduct(null);
        fetchProducts();
      } else {
        message.error(`Failed to ${editingProduct ? 'update' : 'create'} product. Status: ${response.status}`);
        console.error("Backend Response:", response.data);
      }

    } catch (error) {
      message.error(`Failed to ${editingProduct ? 'update' : 'create'} product.`);
      console.error("Error:", error);
      if (error.response) {
        console.error("Backend Response Data:", error.response.data);
        console.error("Backend Response Status:", error.response.status);
        console.error("Backend Response Headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request Error:", error.request);
      } else {
        console.error("Axios Error:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record) => {
    setEditingProduct(record);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    form.resetFields();
    setImageUrl(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${API_URL}/products/${id}`);
        message.success("Product deleted successfully!");
        fetchProducts();
      } catch (error) {
        message.error("Failed to delete product.");
        console.error("Error deleting product:", error);
      }
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image} alt="product" style={{ width: 50, height: 50, objectFit: 'cover' }} />
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Factory",
      dataIndex: "factory",
      key: "factory",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>{editingProduct ? "Edit Product" : "Create Product"}</h2>
      <div style={{ maxWidth: 600, margin: "0 auto", marginBottom: "30px", border: "1px solid #d9d9d9", padding: "20px", borderRadius: "5px" }}>
        <Form
          form={form}
          name="product_form"
          onFinish={onFinish}
          layout="vertical"
          initialValues={{
            quantity: 1,
          }}
        >
          <Form.Item
            label="Product Name"
            name="name"
            rules={[{ required: true, message: "Please input product name!" }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input price!" }]}
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              placeholder="Enter product price"
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value.replace(/,*/g, '')}
            />
          </Form.Item>

          <Form.Item
            label="Product Image"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
          >
            <Upload
              name="image"
              listType="picture-card"
              showUploadList={true}
              onChange={handleUploadChange}
              loading={uploadLoading}
              initialFileList={imageUrl ? [{ uid: '-1', name: 'image', status: 'done', url: imageUrl }] : []}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="product" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div>
                  {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input product description!" }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Enter product description"
            />
          </Form.Item>

          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Please input product quantity!" }]}
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              placeholder="Enter product quantity"
            />
          </Form.Item>

          <Form.Item
            label="Factory"
            name="factory"
            rules={[{ required: true, message: "Please input product factory!" }]}
          >
            <Input placeholder="Enter product factory" />
          </Form.Item>

          <Form.Item
            label="Category"
            name="categoryId"
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            <Select
              placeholder="Select a category"
              loading={!categories || categories.length === 0}
            >
              {categories && categories.map(category => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {editingProduct ? "Update Product" : "Create Product"}
            </Button>
            {editingProduct && (
              <Button style={{ marginTop: 10 }} onClick={handleCancelEdit} block>
                Cancel Edit
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>

      <h2>Product List</h2>
      {loading ? (
        <LoadingOutlined />
      ) : (
        <Table columns={columns} dataSource={products} rowKey="id" />
      )}
    </div>
  );
};

export default Product;