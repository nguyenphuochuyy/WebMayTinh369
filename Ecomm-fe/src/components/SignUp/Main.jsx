import React from "react";
import "../../styles/SignUp_styles/SignupForm.scss";
import { Button, Form, Input, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { signupAPI } from "../../services/api.service";

function SignupForm() {
  const [form] = Form.useForm();
  let navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Form values: ", values);
    const { username, email, password } = values;
    const res = await signupAPI(username, email, password);
    if (res.data) {
      notification.success({
        message: "Đăng ký thành công!",
        description: "Bạn đã đăng ký tài khoản thành công.",
      });
      navigate("/notiVerify");
    } else {
      notification.error({
        message: "Đăng ký thất bại!",
        description: JSON.stringify(res.message),
      });
    }
  };

  return (
    <div className="signup-container">
      <div className="sign-image">
        <img
          src="https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_960_720.jpg"
          alt="signup"
        />
      </div>
      <div className="signup-form">
        <h2>Tạo tài khoản</h2>
        <p>Vui lòng nhập thông tin</p>

        <Form form={form} name="signup" onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[
              { required: true, message: "Vui lòng nhập tên đăng nhập!" },
            ]}
          >
            <Input placeholder="Nhập tên đăng nhập" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu!" },
              {
                min: 6,
                message: "Mật khẩu phải có ít nhất 6 ký tự!",
              },
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="btn-submit">
              Tạo tài khoản
            </Button>
          </Form.Item>
        </Form>

        <div className="login-link">
          <p>
            Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
