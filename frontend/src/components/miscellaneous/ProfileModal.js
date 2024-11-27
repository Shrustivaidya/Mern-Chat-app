import React, { useState } from "react";
import { Modal, Button, Avatar, Typography } from "antd";
import { EyeOutlined } from "@ant-design/icons";

const { Text } = Typography;

const ProfileModal = ({ user = {}, children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Extract user details with default values
  const { name = "Default Name", pic = "default-pic-url", email = "example@example.com" } = user;

  const showModal = () => setIsModalVisible(true);
  const handleOk = () => setIsModalVisible(false);
  const handleCancel = () => setIsModalVisible(false);

  return (
    <>
      {/* Trigger to open modal */}
      {children ? (
        <span onClick={showModal}>{children}</span>
      ) : (
        <Button type="text" icon={<EyeOutlined />} onClick={showModal} />
      )}

      {/* Modal Component */}
      <Modal
        title={<Text style={{ fontSize: "24px", fontFamily: "Work sans", textAlign: "center" }}>{name}</Text>}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>,
        ]}
        centered
        width={400}
      >
        <div style={{ textAlign: "center", padding: "16px" }}>
          {/* Display user's avatar */}
          <Avatar src={pic} size={150} style={{ marginBottom: 16 }} />
          
          {/* Display user's email */}
          <Text style={{ fontSize: "18px", fontFamily: "Work sans" }}>
             {email}
          </Text>
        </div>
      </Modal>
    </>
  );
};

export default ProfileModal;
