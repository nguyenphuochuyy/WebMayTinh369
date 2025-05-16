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
import { getAllOrdersAPI, getProductSoldAPI } from '../../services/api.service';
import { getAllProducts } from '../../services/product.service';
import { Bar } from 'recharts';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const { Content } = Layout;
const { Title } = Typography;

const Dashboard = () => {

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [productSold, setProductSold] = useState([]);

  const formatPrice = (price) => {
    return `${Math.round(price)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ₫`;
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
    const fetchData = async () => {
      try {
        const userResponse = await getListUser();
        const userCount = userResponse.data.filter(user => user.role === 'USER').length;
        setTotalUsers(userCount);

        const orderResponse = await getAllOrdersAPI();

        const recentOrders = orderResponse.data.orders.slice(0, 10);
        setRecentOrders(recentOrders);
        setTotalOrder(orderResponse.data.orders.length);

        const productsResponse = await getAllProducts();
        setTotalProduct(productsResponse.length);

        const productSoldResponse = await getProductSoldAPI();
        setProductSold(productSoldResponse.data.products);
        
        const total = orderResponse.data.orders.reduce((acc, order) => acc + order.total, 0);
        setTotalRevenue(total);


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  },[])

  



  const stats = [
    {
      title: 'Tổng người dùng',
      value: totalUsers,
      icon: <UserOutlined />,
      color: '#1890ff',
    },
    {
      title: 'Tổng sản phẩm',
      value: totalProduct,
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
      title: 'Ngày đặt hàng',
      dataIndex: 'date',
      key: 'date',
      render: (text) => formatDate(text),
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: 'Số tiền',
      dataIndex: 'total',
      key: 'total',
      render: (text) => formatPrice(text),
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
                    valueStyle={{ color: stat.color }}
                    prefix={stat.icon}
                  />
                </Card>
              </Col>
            ))}
          </Row>
          
          {/* Biểu đồ sản phẩm bán chạy */}
          <Card title="Sản phẩm bán chạy" style={{ marginBottom: 24 }}>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={productSold}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 150,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end"
                  interval={0} 
                  height={80}
                />
                <YAxis />
                <Tooltip formatter={(value) => [`Đã bán: ${value} sản phẩm`, 'Số lượng']} />
                <Legend verticalAlign="top" height={36} />
                <Bar dataKey="totalSold" name="Số lượng đã bán" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          
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