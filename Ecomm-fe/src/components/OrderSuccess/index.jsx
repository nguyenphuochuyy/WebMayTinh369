import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Descriptions, Button, Result, Space } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const OrderSuccess = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    console.log('params', params);
    
    const navigate = useNavigate();
    const { orderInfo, cartItems, user, selectedAddress, total } = location.state || {};

    // Nếu không có dữ liệu, hiển thị thông báo lỗi
    if (!orderInfo) {
        return (
            <Result
                status="error"
                title="Không tìm thấy thông tin đơn hàng"
                subTitle="Vui lòng kiểm tra lại hoặc liên hệ hỗ trợ."
                extra={[
                    <Button type="primary" onClick={navigate('/')} key="home">
                        Quay về trang chủ
                    </Button>,
                ]}
            />
        );
    }

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <Result
                status="success"
                title="Thanh toán thành công!"
                subTitle={`Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đã được ghi nhận.`}
                icon={<CheckCircleOutlined />}
            />

            <Card title="Thông tin giao dịch" style={{ marginBottom: '20px' }}>
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Mã đơn hàng">{orderInfo.paymentId}</Descriptions.Item>
                    <Descriptions.Item label="Số tiền">
                        {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                        }).format(orderInfo.amount)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Trạng thái thanh toán">
                        {orderInfo.paymentStatus === 'success' ? 'Thành công' : 'Thất bại'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Mã giao dịch VNPay">{orderInfo.transactionNo}</Descriptions.Item>
                    <Descriptions.Item label="Thời gian thanh toán">
                        {moment(orderInfo.payDate, 'YYYYMMDDHHmmss').format('DD/MM/YYYY HH:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngân hàng">{orderInfo.bankCode}</Descriptions.Item>
                </Descriptions>
            </Card>

            <Card title="Thông tin đơn hàng" style={{ marginBottom: '20px' }}>
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Tên khách hàng">{user?.name || 'Không có thông tin'}</Descriptions.Item>
                    <Descriptions.Item label="Địa chỉ giao hàng">
                        {selectedAddress?.address || 'Không có thông tin'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Sản phẩm">
                        {cartItems?.length > 0 ? (
                            <ul>
                                {cartItems.map((item, index) => (
                                    <li key={index}>
                                        {item.name} (x{item.quantity}) -{' '}
                                        {new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        }).format(item.price * item.quantity)}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            'Không có sản phẩm'
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tổng tiền">
                        {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                        }).format(total)}
                    </Descriptions.Item>
                </Descriptions>
            </Card>

            <Space style={{ textAlign: 'center', width: '100%' }}>
                <Button type="primary" onClick={() => navigate('/')}>
                    Quay về trang chủ
                </Button>
                <Button onClick={() => navigate('/orders')}>
                    Xem lịch sử đơn hàng
                </Button>
            </Space>
        </div>
    );
};

export default OrderSuccess;