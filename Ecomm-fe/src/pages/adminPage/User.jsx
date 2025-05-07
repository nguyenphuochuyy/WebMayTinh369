import React, { use, useEffect, useState } from "react";
import { Form, Input, Button, Select, message, Spin, Table, Space, Layout, List } from "antd";
import { useNavigate } from "react-router-dom";
import {DeleteOutlined, EditOutlined, LoadingOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { getListUser } from "../../services/user.service";
import { Content } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import { render } from "sass";
const { Option } = Select;

const User = () => {
  // sate quản lý loading danh sách người dùng
  const [loading, setLoading] = useState(false);
  // sate quản lý danh sách người dùng
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Nhận values:", values);
    message.success("Tạo người dùng thành công!");
    navigate("/admin/users");
  };
  const handleEdit = (record) => {
    console.log("Chỉnh sửa người dùng:", record);
    // Chuyển hướng đến trang chỉnh sửa người dùng với ID người dùng
    navigate(`/admin/users/edit/${record.id}`);
  };
  const handleDelete = async (userId) => {
    console.log("Xóa người dùng:", userId);
    try {
      const response = await fetch(`http://localhost:8080/users/delete/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Lỗi khi xóa người dùng");
      }
      message.success("Xóa người dùng thành công!");
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error);
    }
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",    
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "addresses",
      key: "address",   
      render: (addresses) => (
        <List
          dataSource={addresses}
          renderItem={(item) => (
            <List.Item>
              {item.street}, {item.city}
            </List.Item>
          )}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
             Sửa
          </Button>
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  
  
  ]
 // hàm gọi api lấy danh sách người dùng
 useEffect(() => {
   const fetchUsers = async () => {
    const listUser = await getListUser();
    if (listUser) {
      setUsers(listUser.data);
      setLoading(false);
    } else {
      message.error("Lỗi khi lấy danh sách người dùng", listUser.message);
    }
   }
   fetchUsers();
  
 },[])
  return (
       <Layout style={{ marginLeft: 200, minHeight: "100vh" }}>
       <div style={{ padding: 20 }}>
       <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
       <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <Title level={2}>Quản lý người dùng</Title>
            <div>
              <Input
                placeholder="Tìm kiếm người dùng"
                prefix={<SearchOutlined />}
                style={{ width: 250, marginRight: 16 }}
                // value={searchText}
                // onChange={(e) => setSearchText(e.target.value)}
              />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                // onClick={() => showProductModal()}
                style={{ marginRight: 8 }}
              >
                Thêm người dùng
              </Button>
            </div>
          </div>
       </Content>

        {loading ? (
          <Spin tip="Đang tải danh sách người dùng" />
        ) : (<Table columns={columns} dataSource={users} rowKey="id" /> )   
        }
      </div>
       </Layout>
      

    
  );
};

export default User;