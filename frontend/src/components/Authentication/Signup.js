import React, { useState } from 'react';
import { Input, Button, Form, Checkbox, Upload, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone ,UploadOutlined} from '@ant-design/icons';
import { notification } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";// Import useNavigate from react-router-dom

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [picLoading, setPicLoading] = useState(false);
  const [pic, setPic] = useState();

  const navigate = useNavigate(); // Use useNavigate instead of history

  const handleClick = () => setShowPassword(!showPassword);

 

  const submitHandler = async () => {
   

  setPicLoading(true);

  if (!name || !email || !password || !confirmpassword) {
    notification.warning({
      message: "Warning",
      description: "Please fill all the fields.",
      placement: "bottom",
    });
    setPicLoading(false);
    return;
  }

  if (password !== confirmpassword) {
    notification.warning({
      message: "Warning",
      description: "Passwords do not match.",
      placement: "bottom",
    });
    setPicLoading(false);
    return;
  }

  console.log(name, email, password, pic);

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/user",
      {
        name,
        email,
        password,
        pic,
      },
      config
    );

    console.log(data);

    notification.success({
      message: "Success",
      description: "Registration Successful",
      placement: "bottom",
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
    setPicLoading(false);
    navigate("/chats"); // Use navigate to go to the chats page
  } catch (error) {
    notification.error({
      message: "Error",
      description: error.response?.data?.message || "An error occurred!",
      placement: "bottom",
    });
    setPicLoading(false);
  }
    
    
  };


  const postDetails = (pics) => {
    setPicLoading(true);
  
    // Handle undefined image
    if (!pics) {
      notification.warning({
        message: "Warning",
        description: "Please Select an Image!",
        placement: "bottom",
        duration: 5,
      });
      setPicLoading(false);
      return;
    }
  
    console.log(pics);
  
    // Validate image type
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "roadsider");
  
      // Use Cloudinary URL with authentication via API key and secret
      const cloudinaryUrl =
        "https://api.cloudinary.com/v1_1/roadsider/image/upload";
  
      axios
        .post(cloudinaryUrl, data)
        .then((response) => {
          const imageUrl = response.data.secure_url; // Use secure URL
          setPic(imageUrl);
          console.log(imageUrl);
          setPicLoading(false);
  
          notification.success({
            message: "Success",
            description: "Image uploaded successfully!",
            placement: "bottom",
            duration: 5,
          });
        })
        .catch((error) => {
          console.error(error);
          setPicLoading(false);
  
          notification.error({
            message: "Error",
            description: "Failed to upload image. Please try again later.",
            placement: "bottom",
            duration: 5,
          });
        });
    } else {
      notification.warning({
        message: "Warning",
        description: "Please Select a valid Image (JPEG/PNG)!",
        placement: "bottom",
        duration: 5,
      });
      setPicLoading(false);
    }
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
        block
        loading={picLoading}
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Sign Up
      </Button>
      </Form.Item>
    </Form>
  );
};

export default SignupForm;
