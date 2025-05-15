import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Layout, Spin, Result, Button } from "antd";
import "./VerifyPage.css";
import { Content } from "antd/es/layout/layout";

const VerifyPage = () => {
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get("code");

  useEffect(() => {
    console.log("code", code);
    
    const verifyCode = async () => {
      if (!code) {
        setStatus("error");
        setMessage("Mã xác minh không hợp lệ.");
        return;
      }
      try {
        // Call backend GET endpoint
        const response = await fetch(
          `http://localhost:8080/auth/verify?code=${code}`
        );
        const data = await response.json();
        if (response.ok) {
          console.log("data", data);
          setStatus("success");
          setMessage("Tài khoản của bạn đã được kích hoạt thành công!");
        } else {
          setStatus("error");
          setMessage(data.message || "Có lỗi xảy ra khi xác minh.");
        }
      } catch (error) {
        setStatus("error");
        setMessage("Không thể kết nối đến server. Vui lòng thử lại sau.");
      }
    };

    verifyCode();
  }, [code]);

  return (
    <Layout className="layout">
      <Content className="content">
        <div className="verify-container">
          {status === "loading" && (
            <div className="loading">
              <Spin size="large" />
              <p>Đang xác minh tài khoản...</p>
            </div>
          )}
          {status === "success" && (
            <Result
              status="success"
              title="Xác minh thành công!"
              subTitle={message}
              extra={[
                <Button
                  key="home"
                  type="primary"
                  size="large"
                  onClick={() => navigate("/")}
                >
                  Về trang chủ
                </Button>,
              ]}
            />
          )}
          {status === "error" && (
            <Result
              status="error"
              title="Xác minh thất bại"
              subTitle={message}
              extra={[
                <Button
                  key="home"
                  type="primary"
                  size="large"
                  onClick={() => navigate("/")}
                >
                  Về trang chủ
                </Button>,
              ]}
            />
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default VerifyPage;
