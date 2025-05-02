import React, { useContext, useState } from "react";
import { 
  Card, 
  Typography, 
  Button, 
  List, 
  Popconfirm, 
  message, 
  Empty,
  Row,
  Col,
  Space,
  Skeleton,
  Modal,
  Form,
  Input
} from "antd";
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  HomeOutlined,
  EnvironmentOutlined 
} from "@ant-design/icons";
import { AuthContext } from "../context/auth.context";
import "../../styles/AccountPage/Addresses.scss";
import AccountSidebar from "../../components/AccountPage/AccountSidebar";
import { addAddressAPI, deleteAddressAPI, updateAddressAPI } from "../../services/api.service";

const { Title, Text } = Typography;

const Addresses = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();

  // Xử lý xóa địa chỉ
  const handleDeleteAddress = async (addressId) => {
    setLoading(true);

    const res = await deleteAddressAPI(addressId);
    
    // Giả lập API call
    setTimeout(() => {
      setUser((prevUser) => ({
        ...prevUser,
        refresh: !prevUser.refresh,
      }));
      
      setLoading(false);
      message.success("Địa chỉ đã được xóa thành công!");
    }, 1000);
  };

  // Mở modal thêm địa chỉ mới
  const showAddAddressModal = () => {
    setAddModalVisible(true);
  };

  // Đóng modal thêm địa chỉ
  const handleAddCancel = () => {
    setAddModalVisible(false);
    addForm.resetFields();
  };

  // Xử lý thêm địa chỉ mới
  const handleAddAddress = async (values) => {
    setLoading(true);
    
    const res = await addAddressAPI(values.street, values.city);

    setTimeout(() => {
      setUser((prevUser) => ({
        ...prevUser,
        refresh: !prevUser.refresh,
      }));
      
      setLoading(false);
      setAddModalVisible(false);
      addForm.resetFields();
      message.success("Thêm địa chỉ mới thành công!");
    }, 1000);
  };

  // Mở modal chỉnh sửa địa chỉ
  const showEditAddressModal = (address, index) => {
    setCurrentAddress(address);
    setCurrentIndex(index);
    setEditModalVisible(true);
    
    // Điền thông tin địa chỉ hiện tại vào form
    editForm.setFieldsValue({
      city: address.city,
      street: address.street
    });
  };

  // Đóng modal chỉnh sửa địa chỉ
  const handleEditCancel = () => {
    setEditModalVisible(false);
    setCurrentAddress(null);
    setCurrentIndex(null);
    editForm.resetFields();
  };

  // Xử lý cập nhật địa chỉ
  const handleUpdateAddress = async (values) => {
    if (!currentAddress) return;
    
    setLoading(true);
    
    const res = await updateAddressAPI(currentAddress.id, values.street, values.city);

    setTimeout(() => {
      setUser((prevUser) => ({
        ...prevUser,
        refresh: !prevUser.refresh,
      }));
      
      setLoading(false);
      setEditModalVisible(false);
      setCurrentAddress(null);
      setCurrentIndex(null);
      editForm.resetFields();
      message.success("Cập nhật địa chỉ thành công!");
    }, 1000);
  };

  // Kiểm tra xem có địa chỉ nào không
  const hasAddresses = user?.addresses && user.addresses.length > 0;

  if (!user) {
    return (
      <div className="account-page">
        <AccountSidebar />
        <Card className="profile-card">
          <Skeleton active avatar paragraph={{ rows: 4 }} />
        </Card>
      </div>
    );
  }

  return (
    <div className="account-page addresses-page">
      <AccountSidebar />
      
      <div className="addresses-content">
        <Card
          className="addresses-card"
          title={
            <Row align="middle" justify="space-between">
              <Col>
                <Title level={3}>
                  <EnvironmentOutlined /> Địa chỉ giao hàng
                </Title>
              </Col>
              <Col>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={showAddAddressModal}
                >
                  Thêm địa chỉ mới
                </Button>
              </Col>
            </Row>
          }
        >
          {!hasAddresses ? (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Bạn chưa có địa chỉ nào"
            >
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={showAddAddressModal}
              >
                Thêm địa chỉ mới
              </Button>
            </Empty>
          ) : (
            <List
              dataSource={user.addresses}
              renderItem={(address, index) => (
                <List.Item
                  key={index}
                  className="address-list-item"
                  actions={[
                    <Button
                      key="edit"
                      icon={<EditOutlined />}
                      onClick={() => showEditAddressModal(address, index)}
                    >
                      Sửa
                    </Button>,
                    <Popconfirm
                      key="delete"
                      title="Bạn có chắc chắn muốn xóa địa chỉ này?"
                      onConfirm={() => handleDeleteAddress(address.id)}
                      okText="Xóa"
                      cancelText="Hủy"
                    >
                      <Button 
                        danger 
                        icon={<DeleteOutlined />}
                        loading={loading}
                      >
                        Xóa
                      </Button>
                    </Popconfirm>
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <div className="address-icon">
                        <HomeOutlined />
                      </div>
                    }
                    title={`Địa chỉ ${index + 1}`}
                    description={
                      <div className="address-details">
                        <Row gutter={[0, 8]}>                      
                          <Col span={24}>
                            <Space>
                              <Text strong>Đường/Số nhà:</Text>
                              <Text>{address.street || "Chưa cập nhật"}</Text>
                            </Space>
                          </Col>
                          <Col span={24}>
                            <Space>
                              <Text strong>Thành phố:</Text>
                              <Text>{address.city || "Chưa cập nhật"}</Text>
                            </Space>
                          </Col>
                        </Row>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          )}
        </Card>
      </div>

      {/* Modal thêm địa chỉ mới */}
      <Modal
        title="Thêm địa chỉ mới"
        open={addModalVisible}
        onCancel={handleAddCancel}
        footer={[
          <Button key="cancel" onClick={handleAddCancel}>
            Hủy
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            loading={loading}
            onClick={() => addForm.submit()}
          >
            Thêm địa chỉ
          </Button>
        ]}
      >
        <Form
          form={addForm}
          layout="vertical"
          onFinish={handleAddAddress}
        >
          
          
          <Form.Item
            name="street"
            label="Đường/Số nhà"
            rules={[
              { required: true, message: 'Vui lòng nhập đường/số nhà' }
            ]}
          >
            <Input placeholder="Nhập đường/số nhà" />
          </Form.Item>

          <Form.Item
            name="city"
            label="Thành phố"
            rules={[
              { required: true, message: 'Vui lòng nhập thành phố' }
            ]}
          >
            <Input placeholder="Nhập thành phố" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal chỉnh sửa địa chỉ */}
      <Modal
        title="Chỉnh sửa địa chỉ"
        open={editModalVisible}
        onCancel={handleEditCancel}
        footer={[
          <Button key="cancel" onClick={handleEditCancel}>
            Hủy
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            loading={loading}
            onClick={() => editForm.submit()}
          >
            Cập nhật
          </Button>
        ]}
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={handleUpdateAddress}
        >
          
          
          <Form.Item
            name="street"
            label="Đường/Số nhà"
            rules={[
              { required: true, message: 'Vui lòng nhập đường/số nhà' }
            ]}
          >
            <Input placeholder="Nhập đường/số nhà" />
          </Form.Item>

          <Form.Item
            name="city"
            label="Thành phố"
            rules={[
              { required: true, message: 'Vui lòng nhập thành phố' }
            ]}
          >
            <Input placeholder="Nhập thành phố" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Addresses;