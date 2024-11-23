import React, { useState } from 'react';
import { Input, Button, Form, Checkbox, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = () => setShow(!show);

  const submitHandler = () => {
    // Handle login submission logic
    console.log('Email:', email);
    console.log('Password:', password);
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
