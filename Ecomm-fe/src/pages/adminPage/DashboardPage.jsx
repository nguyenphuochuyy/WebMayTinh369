import React, { useEffect, useState } from 'react';
import { Layout, Typography, Row, Col, Card, Statistic, Table, Button } from 'antd';
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined, 
  UserOutlined, 
  ShoppingOutlined, 
  DollarOutlined, 
  EyeOutlined, 
  ShoppingCartOutlined
} from '@ant-design/icons';
import { getListUser } from '../../services/user.service';
import { getAllOrdersAPI } from '../../services/api.service';

const { Content } = Layout;
const { Title } = Typography;

const Dashboard = () => {

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);

  const formatPrice = (price) => {
    return `${Math.round(price)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ₫`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const userResponse = await getListUser();
        // console.log("users" , userResponse);
        // console.log("users length" , userResponse.length);

        const orderResponse = await getAllOrdersAPI();
        // Nếu orders đã được sắp xếp theo thời gian giảm dần
        const recentOrders = orderResponse.data.orders.slice(0, 10);
        setRecentOrders(recentOrders);
        setTotalOrder(orderResponse.data.orders.length);

        
        const total = orderResponse.data.orders.reduce((acc, order) => acc + order.total, 0);
        setTotalRevenue(total);

        console.log("total revenue calculated:", total);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  },[])

  



  const stats = [
    {
      title: 'Tổng người dùng',
      value: 4523,
      icon: <UserOutlined />,
      color: '#1890ff',
    },
    {
      title: 'Sản phẩm',
      value: 1200,
      icon: <ShoppingOutlined />,
      color: '#52c41a',
    },
    {
      title: 'Tổng hóa đơn',
      value: totalOrder,
      icon: <ShoppingCartOutlined />,
      color: '#fa8c16',
    },
    {
      title: 'Doanh thu',
      value: formatPrice(totalRevenue),
      icon: <DollarOutlined />,
      color: '#722ed1',
    },
    
  ];

  // Dữ liệu giả lập cho bảng giao dịch gần đây
  const recentTransactions = [
    {
      key: '1',
      id: '#TR-0123',
      customer: 'John Doe',
      date: '28/04/2025',
      amount: '$340.00',
      status: 'Completed',
    },
    {
      key: '2',
      id: '#TR-0124',
      customer: 'Jane Smith',
      date: '28/04/2025',
      amount: '$120.00',
      status: 'Pending',
    },
    {
      key: '3',
      id: '#TR-0125',
      customer: 'Mike Johnson',
      date: '27/04/2025',
      amount: '$550.00',
      status: 'Completed',
    },
    {
      key: '4',
      id: '#TR-0126',
      customer: 'Sarah Williams',
      date: '27/04/2025',
      amount: '$210.00',
      status: 'Failed',
    },
    {
      key: '5',
      id: '#TR-0127',
      customer: 'David Brown',
      date: '26/04/2025',
      amount: '$175.00',
      status: 'Completed',
    },
  ];

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = '';
        if (status === 'Completed') color = 'green';
        else if (status === 'Pending') color = 'orange';
        else if (status === 'Failed') color = 'red';
        
        return (
          <span style={{ color }}>
            {status}
          </span>
        );
      },
    },
    {
      title: 'Xem',
      key: 'action',
      render: () => <Button type="link" icon={<EyeOutlined />} size="small">Chi tiết</Button>,
    },
  ];

  return (
    <Layout style={{ marginLeft: 200, minHeight: '100vh' }}>
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <div style={{ padding: 24, background: '#fff', minHeight: '100%' }}>
          <Title level={2}>Dashboard</Title>
          
          {/* Thống kê */}
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            {stats.map((stat, index) => (
              <Col xs={24} sm={12} md={12} lg={6} key={index}>
                <Card>
                  <Statistic
                    title={stat.title}
                    value={stat.value}
                    // prefix={stat.prefix}
                    valueStyle={{ color: stat.color }}
                    prefix={stat.icon}
                  />
                </Card>
              </Col>
            ))}
          </Row>
          
          {/* Giao dịch gần đây */}
          <Card title="Giao dịch gần đây" style={{ marginBottom: 24 }}>
            <Table
              columns={columns}
              dataSource={recentOrders}
              pagination={false}
            />
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default Dashboard;