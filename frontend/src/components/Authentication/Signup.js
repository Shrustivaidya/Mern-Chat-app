import React, { useState } from 'react';
import { Input, Button, Form, Checkbox, Upload, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone ,UploadOutlined} from '@ant-design/icons';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [picLoading, setPicLoading] = useState(false);

  const handleClick = () => setShowPassword(!showPassword);

  const postDetails = (file) => {
    // Logic to handle picture upload
  };

  const submitHandler = () => {
    // Handle form submission
  };

  return (
    <Form
      name="signup"
      initialValues={{ remember: true }}
      onFinish={submitHandler}
      layout="vertical"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Email Address"
        name="email"
        rules={[{ required: true, message: 'Please input your email address!' }, { type: 'email', message: 'The input is not a valid email!' }]}
      >
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        rules={[
          { required: true, message: 'Please confirm your password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The two passwords do not match!');
            },
          }),
        ]}
      >
        <Input.Password
          placeholder="Confirm password"
          value={confirmpassword}
          onChange={(e) => setConfirmpassword(e.target.value)}
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Form.Item>

      <Form.Item
        label="Upload your Picture"
        name="pic"
        valuePropName="fileList"
        getValueFromEvent={(e) => e?.fileList}
      >
        <Upload
          accept="image/*"
          beforeUpload={(file) => {
            postDetails(file);
            return false; // Prevent automatic upload
          }}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: '100%' }}
          loading={picLoading}
        >
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignupForm;
