import { Button, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
import "./VerifyPage.css"
const VerifyPage = () => {
    const navigate = useNavigate();
    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="confirmation-container">
                    <Title level={2}>Email xác nhận </Title>
                    <Paragraph style={{ fontSize: '16px', marginBottom: '24px' }}>
                        Chúng tôi đã gửi một email xác nhận đến email trên . Vui lòng kiểm tra hộp thư đến của bạn và làm theo hướng dẫn trong email để xác nhận tài khoản của bạn.
                    </Paragraph>
                    <Button
                        type="primary" 
                        size="large" 
                        onClick={() => navigate('/')}
                    >
                        Về trang chủ
                    </Button>
                </div>
            </Content>
        </Layout>
    );
};
export default VerifyPage;