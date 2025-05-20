import React, { useState, useEffect } from "react";
import {
  Table,
  Card,
  Button,
  Space,
  Tag,
  Input,
  Select,
  DatePicker,
  Row,
  Col,
  Typography,
  Drawer,
  Form,
  Divider,
  Badge,
  message,
  Layout,
  Statistic,
} from "antd";
import {
  SearchOutlined,
  ReloadOutlined,
  EyeOutlined,
  PlusOutlined,
  PrinterOutlined,
  ExportOutlined,
  FilterOutlined,
  ShoppingCartOutlined,
  ClockCircleOutlined,
  CarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { getAllOrdersAPI, updateOrderStatusForAdminAPI } from "../../services/api.service";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const Order = () => {
  // States
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [dateRange, setDateRange] = useState(null);
  const [orderStatistics, setOrderStatistics] = useState({
    total: 0,
    PENDING: 0,
    PROCESSING: 0,
    SHIPPING: 0,
    COMPLETED: 0,
    CANCELED: 0,
  });

  const [orders, setOrders] = useState([]);

  const calculateStatistics = () => {
    const stats = {
      total: orders.length,
      PENDING: orders.filter((order) => order.status === "PENDING").length,
      PROCESSING: orders.filter((order) => order.status === "PROCESSING").length,
      SHIPPING: orders.filter((order) => order.status === "SHIPPING").length,
      COMPLETED: orders.filter((order) => order.status === "COMPLETED").length,
      CANCELED: orders.filter((order) => order.status === "CANCELED").length,
    };
    setOrderStatistics(stats);
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };


  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await getAllOrdersAPI();
        if (res.data && res.data.orders) {
          setOrders(res.data.orders); 
        }
      } catch (error) {
        message.error("Không thể tải danh sách đơn hàng!");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrders();
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      calculateStatistics(orders);
    }
  }, [orders]);
  
  // Filter data dựa trên các điều kiện tìm kiếm
  const filteredOrders = orders.filter((order) => {
    // Filter theo text tìm kiếm
    const searchMatch =
      order.id.toString().toLowerCase().includes(searchText.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchText.toLowerCase()) ||
      order.phone.includes(searchText);

    // Filter theo trạng thái
    const statusMatch =
      filterStatus === "all" ? true : order.status === filterStatus;

    // Filter theo khoảng thời gian
    let dateMatch = true;
    if (dateRange && dateRange[0] && dateRange[1]) {
      const orderDate = new Date(order.date);
      const startDate = new Date(dateRange[0]);
      const endDate = new Date(dateRange[1]);
      dateMatch = orderDate >= startDate && orderDate <= endDate;
    }

    return searchMatch && statusMatch && dateMatch;
  });

  const handleUpdateStatus = async (status) => {
    const res = await updateOrderStatusForAdminAPI(currentOrder.id, status);
    console.log(">>>>>>>>>" , res);
    console.log("<<<<<<<<<<<<<", status);
    console.log("currentOrder", currentOrder.id);
    if (res) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === currentOrder.id ? { ...order, status } : order
        )
      );
      setCurrentOrder({ ...currentOrder, status });
      message.success(`Đã cập nhật trạng thái đơn hàng ${currentOrder.id} thành "${status}"`);
    } else {
      message.error("Cập nhật trạng thái không thành công");
    }
  }


  // Cấu hình cột cho bảng
  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
      render: (text, record) => (
        <div>
          <div>{text}</div>
          <div style={{ fontSize: "12px", color: "#888" }}>{record.phone}</div>
        </div>
      ),
      sorter: (a, b) => a.customer.localeCompare(b.customer),
    },
    {
      title: "Ngày đặt",
      dataIndex: "date",
      key: "date",
      render: (text) => formatDate(text),
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (total) => `${total.toLocaleString("vi-VN")} đ`,
      sorter: (a, b) => a.total - b.total,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "default";
        let text = "Không xác định";

        switch (status) {
          case "PENDING":
            color = "warning";
            text = "Chờ xử lý";
            break;
          case "PROCESSING":
            color = "processing";
            text = "Đang xử lý";
            break;
          case "SHIPPING":
            color = "blue";
            text = "Đang vận chuyển";
            break;
          case "COMPLETED":
            color = "success";
            text = "Hoàn thành";
            break;
          case "CANCELED":
            color = "error";
            text = "Đã hủy";
            break;
          default:
            break;
        }

        return <Tag color={color}>{text}</Tag>;
      },
      filters: [
        { text: "Chờ xử lý", value: "PENDING" },
        { text: "Đang xử lý", value: "PROCESSING" },
        { text: "Đang vận chuyển", value: "SHIPPING" },
        { text: "Hoàn thành", value: "COMPLETED" },
        { text: "Đã hủy", value: "CANCELED" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Thanh toán",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (method) => {
        let color = "default";
        switch (method) {
          case "Banking":
            color = "volcano";
            break;
          case "Tiền mặt":
            color = "magenta";
            break;
          default:
            break;
        }
        return <Tag color={color}>{method}</Tag>;
      },
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => viewOrderDetails(record)}
          />
          {/* {record.status !== "COMPLETED" && record.status !== "CANCELED" && (
            <Button
              type="default"
              icon={<ArrowRightOutlined />}
              size="small"
              onClick={() => advanceOrderStatus(record)}
              title="Chuyển đến trạng thái tiếp theo"
            />
          )} */}
        </Space>
      ),
    },
  ];

  // Xem chi tiết đơn hàng
  const viewOrderDetails = (order) => {
    setCurrentOrder(order);
    setDrawerVisible(true);
  };

  // Chuyển trạng thái đơn hàng sang giai đoạn tiếp theo
  const advanceOrderStatus = (order) => {
    let nextStatus;
    
    switch (order.status) {
      case "PENDING":
        nextStatus = "PROCESSING";
        break;
      case "PROCESSING":
        nextStatus = "SHIPPING";
        break;
      case "SHIPPING":
        nextStatus = "COMPLETED";
        break;
      default:
        return; // Không thể chuyển tiếp nếu đã COMPLETED hoặc CANCELED
    }
    
    // Cập nhật trạng thái đơn hàng
    const updatedOrders = orders.map(item => 
      item.id === order.id 
        ? { ...item, status: nextStatus } 
        : item
    );
    
    setOrders(updatedOrders);
    calculateStatistics();
    
    // Nếu đơn hàng đang được xem chi tiết, cập nhật luôn
    if (currentOrder && currentOrder.id === order.id) {
      setCurrentOrder({ ...currentOrder, status: nextStatus });
    }
    
    message.success(`Đã chuyển đơn hàng ${order.id} sang trạng thái "${nextStatus}"`);
    
    // Trong thực tế, đây sẽ là API call để cập nhật trạng thái
    // updateOrderStatusAPI(order.id, nextStatus);
  };

  // Cập nhật trạng thái đơn hàng (trong drawer)
  const updateOrderStatus = (status) => {
    const updatedOrders = orders.map(order => 
      order.id === currentOrder.id 
        ? { ...order, status: status } 
        : order
    );
    
    setOrders(updatedOrders);
    setCurrentOrder({ ...currentOrder, status });
    calculateStatistics();
    message.success(
      `Đã cập nhật trạng thái đơn hàng ${currentOrder.id} thành "${status}"`
    );
    
    // Trong thực tế, đây sẽ là API call để cập nhật trạng thái
    // updateOrderStatusAPI(currentOrder.id, status);
  };

  // Reset bộ lọc
  const resetFilters = () => {
    setSearchText("");
    setFilterStatus("all");
    setDateRange(null);
  };

  // Cấu hình chọn nhiều dòng
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys) => setSelectedRowKeys(keys),
  };

  // Xử lý các hành động trên nhiều đơn hàng đã chọn
  const handleBatchAction = (action) => {
    if (selectedRowKeys.length === 0) {
      message.warning("Vui lòng chọn ít nhất một đơn hàng");
      return;
    }

    switch (action) {
      case "export":
        message.success(`Đã xuất ${selectedRowKeys.length} đơn hàng`);
        break;
      case "print":
        message.success(`Đã in ${selectedRowKeys.length} đơn hàng`);
        break;
      default:
        break;
    }
    // Trong thực tế, đây sẽ là các API call khác nhau
  };

  // Mock refresh data
  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("Đã làm mới dữ liệu");
    }, 500);
  };

  // Lấy trạng thái tiếp theo dựa vào trạng thái hiện tại
  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case "PENDING":
        return "PROCESSING";
      case "PROCESSING":
        return "SHIPPING";
      case "SHIPPING":
        return "COMPLETED";
      default:
        return null;
    }
  };


  return (
    <Layout style={{ marginLeft: 200, minHeight: "100vh" }}>
      <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
        <div style={{ padding: "24px" }}>
          <Title level={2}>Quản lý đơn hàng</Title>

          {/* Dashboard thống kê */}
          <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
            <Col xs={24} sm={12} md={8} lg={4}>
              <Card>
                <Statistic
                  title="Tổng đơn hàng"
                  value={orderStatistics.total}
                  prefix={<ShoppingCartOutlined />}
                  valueStyle={{ color: "#1890ff" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={4}>
              <Card>
                <Statistic
                  title="Chờ xử lý"
                  value={orderStatistics.PENDING}
                  prefix={<ClockCircleOutlined />}
                  valueStyle={{ color: "#faad14" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={4}>
              <Card>
                <Statistic
                  title="Đang xử lý"
                  value={orderStatistics.PROCESSING}
                  prefix={<ClockCircleOutlined />}
                  valueStyle={{ color: "#722ed1" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={4}>
              <Card>
                <Statistic
                  title="Đang vận chuyển"
                  value={orderStatistics.SHIPPING}
                  prefix={<CarOutlined />}
                  valueStyle={{ color: "#108ee9" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={4}>
              <Card>
                <Statistic
                  title="Hoàn thành"
                  value={orderStatistics.COMPLETED}
                  prefix={<CheckCircleOutlined />}
                  valueStyle={{ color: "#52c41a" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={4}>
              <Card>
                <Statistic
                  title="Đã hủy"
                  value={orderStatistics.CANCELED}
                  prefix={<CloseCircleOutlined />}
                  valueStyle={{ color: "#ff4d4f" }}
                />
              </Card>
            </Col>
          </Row>

          {/* Bộ lọc và tìm kiếm */}
          <Card style={{ marginBottom: "16px" }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={6} lg={6}>
                <Input
                  placeholder="Tìm mã đơn, khách hàng, SĐT"
                  prefix={<SearchOutlined />}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  allowClear
                />
              </Col>
              <Col xs={24} sm={12} md={6} lg={5}>
                <Select
                  style={{ width: "100%" }}
                  placeholder="Trạng thái đơn hàng"
                  value={filterStatus}
                  onChange={(value) => setFilterStatus(value)}
                >
                  <Option value="all">Tất cả trạng thái</Option>
                  <Option value="PENDING">Chờ xử lý</Option>
                  <Option value="PROCESSING">Đang xử lý</Option>
                  <Option value="SHIPPING">Đang vận chuyển</Option>
                  <Option value="COMPLETED">Hoàn thành</Option>
                  <Option value="CANCELED">Đã hủy</Option>
                </Select>
              </Col>
              <Col xs={24} sm={12} md={8} lg={8}>
                <RangePicker
                  style={{ width: "100%" }}
                  placeholder={["Từ ngày", "Đến ngày"]}
                  value={dateRange}
                  onChange={(dates) => setDateRange(dates)}
                />
              </Col>
              <Col xs={24} sm={12} md={4} lg={5}>
                <Space>
                  <Button icon={<FilterOutlined />} onClick={resetFilters}>
                    Bỏ lọc
                  </Button>
                  <Button
                    type="primary"
                    icon={<ReloadOutlined />}
                    onClick={refreshData}
                  >
                    Làm mới
                  </Button>
                </Space>
              </Col>
            </Row>
          </Card>

          {/* Thanh công cụ */}
          <Card style={{ marginBottom: "16px" }}>
            <Space>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => message.info("Chức năng tạo đơn hàng mới")}
              >
                Tạo đơn hàng
              </Button>

              <Button
                type="default"
                icon={<ExportOutlined />}
                onClick={() => handleBatchAction("export")}
                disabled={selectedRowKeys.length === 0}
              >
                Xuất Excel
              </Button>

              <Button
                type="default"
                icon={<PrinterOutlined />}
                onClick={() => handleBatchAction("print")}
                disabled={selectedRowKeys.length === 0}
              >
                In đơn hàng
              </Button>
            </Space>

            {selectedRowKeys.length > 0 && (
              <div style={{ marginTop: "8px" }}>
                <Tag color="processing">
                  Đã chọn {selectedRowKeys.length} đơn hàng
                </Tag>
              </div>
            )}
          </Card>

          {/* Bảng dữ liệu */}
          <Card>
            <Table
              rowKey="id"
              columns={columns}
              dataSource={filteredOrders}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Tổng cộng ${total} đơn hàng`,
              }}
              rowSelection={rowSelection}
              loading={loading}
            />
          </Card>

          {/* Drawer xem chi tiết */}
          <Drawer
            title={
              currentOrder
                ? `Chi tiết đơn hàng #${currentOrder.id}`
                : "Chi tiết đơn hàng"
            }
            width={600}
            placement="right"
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
            extra={
              currentOrder && (
                <Space>
                  <Button onClick={() => setDrawerVisible(false)}>Đóng</Button>
                  {currentOrder.status !== "COMPLETED" && currentOrder.status !== "CANCELED" && (
                    <Button
                      type="primary"
                      onClick={() => {
                        // const nextStatus = getNextStatus(currentOrder.status);
                        // if (nextStatus) {
                        //   updateOrderStatus(nextStatus);
                        // }
                        handleUpdateStatus(getNextStatus(currentOrder.status));
                      }}
                      icon={<ArrowRightOutlined />}
                    >
                      Chuyển giai đoạn tiếp theo
                    </Button>
                  )}
                </Space>
              )
            }
          >
            {currentOrder && (
              <>
              console.log(currentOrder)
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <div className="detail-section">
                      <div className="detail-label">Mã đơn hàng:</div>
                      <div className="detail-value">{currentOrder.id}</div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="detail-section">
                      <div className="detail-label">Ngày đặt:</div>
                      <div className="detail-value">{formatDate(currentOrder.date)}</div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="detail-section">
                      <div className="detail-label">Tổng tiền:</div>
                      <div className="detail-value">
                        {currentOrder.total.toLocaleString("vi-VN")} đ
                      </div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="detail-section">
                      <div className="detail-label">Trạng thái:</div>
                      <div className="detail-value">
                        {currentOrder.status === "PENDING" && (
                          <Tag color="warning">Chờ xử lý</Tag>
                        )}
                        {currentOrder.status === "PROCESSING" && (
                          <Tag color="processing">Đang xử lý</Tag>
                        )}
                        {currentOrder.status === "SHIPPING" && (
                          <Tag color="blue">Đang vận chuyển</Tag>
                        )}
                        {currentOrder.status === "COMPLETED" && (
                          <Tag color="success">Hoàn thành</Tag>
                        )}
                        {currentOrder.status === "CANCELED" && (
                          <Tag color="error">Đã hủy</Tag>
                        )}
                      </div>
                    </div>
                  </Col>
                  {currentOrder.note && (
                      <Col span={12}>
                      <div className="detail-section">
                        <div className="detail-label">Ghi chú:</div>
                        <div className="detail-value">{currentOrder.note}</div>
                      </div>
                    </Col>
                     )}
                  {currentOrder.reasonCancel && (
                      <Col span={12}>
                      <div className="detail-section">
                        <div className="detail-label">Lý do hủy:</div>
                        <div className="detail-value">{currentOrder.reasonCancel}</div>
                      </div>
                    </Col>
                     )}
                </Row>

                <Divider orientation="left">Thông tin khách hàng</Divider>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <div className="detail-section">
                      <div className="detail-label">Tên khách hàng:</div>
                      <div className="detail-value">
                        {currentOrder.customer}
                      </div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="detail-section">
                      <div className="detail-label">Số điện thoại:</div>
                      <div className="detail-value">{currentOrder.phone}</div>
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className="detail-section">
                      <div className="detail-label">Email:</div>
                      <div className="detail-value">{currentOrder.email}</div>
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className="detail-section">
                      <div className="detail-label">Địa chỉ giao hàng:</div>
                      <div className="detail-value">{currentOrder.address}</div>
                    </div>
                  </Col>
                </Row>

                <Divider orientation="left">Chi tiết đơn hàng</Divider>
                <Table
                  dataSource={currentOrder.items}
                  rowKey="id"
                  pagination={false}
                  columns={[
                    {
                      title: "Sản phẩm",
                      dataIndex: "name",
                      key: "name",
                    },
                    {
                      title: "Số lượng",
                      dataIndex: "quantity",
                      key: "quantity",
                    },
                    {
                      title: "Đơn giá",
                      dataIndex: "price",
                      key: "price",
                      render: (price) => `${price.toLocaleString("vi-VN")} đ`,
                    },
                    {
                      title: "Thành tiền",
                      key: "total",
                      render: (_, record) =>
                        `${(record.price * record.quantity).toLocaleString(
                          "vi-VN"
                        )} đ`,
                    },
                  ]}
                  summary={() => (
                    <Table.Summary.Row>
                      <Table.Summary.Cell colSpan={3} index={0}>
                        <strong>Tổng tiền</strong>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1}>
                        <strong>
                          {currentOrder.total.toLocaleString("vi-VN")} đ
                        </strong>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  )}
                />

                <Divider orientation="left">Thông tin thanh toán</Divider>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <div className="detail-section">
                      <div className="detail-label">
                        Phương thức thanh toán:
                      </div>
                      <div className="detail-value">
                        <Tag
                          color={
                            currentOrder.paymentMethod === "Banking"
                              ? "volcano"
                              : currentOrder.paymentMethod === "Tiền mặt"
                              ? "magenta"
                              : "blue"
                          }
                        >
                          {currentOrder.paymentMethod}
                        </Tag>
                      </div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="detail-section">
                      <div className="detail-label">Trạng thái thanh toán:</div>
                      <div className="detail-value">
                        <Badge
                          status={
                            currentOrder.status === "COMPLETED"
                              ? "success"
                              : currentOrder.status === "CANCELED"
                              ? "error"
                              : "warning"
                          }
                          text={
                            currentOrder.status === "COMPLETED"
                              ? "Đã thanh toán"
                              : currentOrder.status === "CANCELED"
                              ? "Đã hủy"
                              : "Đang xử lý"
                          }
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </>
            )}
          </Drawer>

          <style>{`
        .detail-section {
          margin-bottom: 8px;
        }
        .detail-label {
          color: #8c8c8c;
          font-size: 14px;
        }
        .detail-value {
          font-size: 14px;
          font-weight: 500;
        }
      `}</style>
        </div>
      </Content>
    </Layout>
  );
};

export default Order;