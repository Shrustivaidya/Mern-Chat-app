import React, { useState } from 'react';
import { Input, Button, Form, Checkbox, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { notification } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null); // Ensure this is defined
  const navigate = useNavigate(); // Initialize navigate

  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      notification.warning({
        message: "Warning",
        description: "Please fill all the fields.",
        placement: "bottom",
        duration: 5,
      });
      setLoading(false);
      return;
    }
  
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
  
      notification.success({
        message: "Login Successful",
        description: "You have successfully logged in.",
        placement: "bottom",
        duration: 5,
      });
  
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
  
      navigate("/chat"); // Redirect to the chats page
    } catch (error) {
      notification.error({
        message: "Error Occurred",
        description: error.response?.data?.message || "An unexpected error occurred.",
        placement: "bottom",
        duration: 5,
      });
      setLoading(false);
    }
  };

  return (
    <Form
      name="login"
      onFinish={submitHandler}
      layout="vertical"
    >
      {/* Email Field */}
      <Form.Item
        label="Email Address"
        name="email"
        rules={[
          { required: true, message: 'Please input your email!' },
          { type: 'email', message: 'The input is not a valid email!' },
        ]}
      >
        <Input
          value={email}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Item>

      {/* Password Field */}
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Form.Item>

      {/* Login Button */}
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          loading={loading}
        >
          Login
        </Button>
      </Form.Item>

      {/* Guest User Button */}
      <Form.Item>
        <Button
          type="default"
          block
          onClick={() => {
            setEmail('guest@example.com');
            setPassword('123456');
          }}
        >
          Get Guest User Credentials
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
