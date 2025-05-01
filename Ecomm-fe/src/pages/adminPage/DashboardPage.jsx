import React from 'react';
import { Layout, Typography, Row, Col, Card, Statistic, Table, Button } from 'antd';
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined, 
  UserOutlined, 
  ShoppingOutlined, 
  DollarOutlined, 
  EyeOutlined 
} from '@ant-design/icons';

const { Content } = Layout;
const { Title } = Typography;

const Dashboard = () => {
  // Dữ liệu giả lập cho các thống kê
  const stats = [
    {
      title: 'Tổng người dùng',
      value: 4523,
      icon: <UserOutlined />,
      color: '#1890ff',
      percent: 12.3,
      isIncrease: true,
    },
    {
      title: 'Sản phẩm',
      value: 1200,
      icon: <ShoppingOutlined />,
      color: '#52c41a',
      percent: 4.2,
      isIncrease: true,
    },
    {
      title: 'Doanh thu',
      value: 25400,
      prefix: '$',
      icon: <DollarOutlined />,
      color: '#722ed1',
      percent: 8.7,
      isIncrease: true,
    },
    {
      title: 'Lượt truy cập',
      value: 983457,
      icon: <EyeOutlined />,
      color: '#fa8c16',
      percent: 3.5,
      isIncrease: false,
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
                    prefix={stat.prefix}
                    valueStyle={{ color: stat.color }}
                    // prefix={stat.icon}
                    suffix={
                      <span style={{ fontSize: '14px', marginLeft: '8px', color: stat.isIncrease ? '#3f8600' : '#cf1322' }}>
                        {stat.percent}%
                        {stat.isIncrease ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                      </span>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
          
          {/* Giao dịch gần đây */}
          <Card title="Giao dịch gần đây" style={{ marginBottom: 24 }}>
            <Table
              columns={columns}
              dataSource={recentTransactions}
              pagination={false}
            />
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default Dashboard;