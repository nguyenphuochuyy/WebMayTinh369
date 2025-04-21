import React, { useState } from "react";
import { Form, Input, Button, Upload, message, InputNumber } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);


  const onFinish = (values) => {
   
    navigate("/admin/products"); 
  };

  
  const handleUploadChange = (info) => {
    if (info.file.status === "done") {
      setImageUrl(info.file.response.url); 
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px" }}>
      <h2>Create Product</h2>
      <Form
        form={form}
        name="create_product"
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
          />
        </Form.Item>

        <Form.Item
          label="Product Image"
          name="image"
          rules={[{ required: true, message: "Please upload product image!" }]}
        >
          <Upload
            name="file"
            action="/upload" 
            listType="picture-card"
            showUploadList={false}
            onChange={handleUploadChange}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="product"
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <div>
                <PlusOutlined />
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

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Product;
