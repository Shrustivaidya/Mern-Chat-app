import React, { useState } from "react";
import { Modal, Button, Input, Form, Spin, Tag } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import UserListItem from "../userAvatar/UserListItem";

const GroupChatModal = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats } = ChatState();

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleGroup = (userToAdd) => {
    if (selectedUsers.some((u) => u._id === userToAdd._id)) {
      Modal.warning({
        title: "User already added",
        duration: 3,
      });
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) return;

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${query}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      Modal.error({
        title: "Error Occurred!",
        content: "Failed to load search results",
      });
      setLoading(false);
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers.length) {
      Modal.warning({
        title: "Please fill all the fields",
        duration: 3,
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      handleCancel();
      Modal.success({
        title: "New Group Chat Created!",
        duration: 3,
      });
    } catch (error) {
      Modal.error({
        title: "Failed to Create the Chat!",
        content: error.response?.data || "An error occurred",
      });
    }
  };

  return (
    <>
      <span onClick={showModal}>{children}</span>
      <Modal
        title="Create Group Chat"
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Create Chat
          </Button>,
        ]}
        centered
      >
        <Form layout="vertical">
          <Form.Item label="Chat Name">
            <Input
              placeholder="Enter chat name"
              value={groupChatName}
              onChange={(e) => setGroupChatName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Add Users">
            <Input
              placeholder="Search users, e.g., John, Jane"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </Form.Item>
        </Form>
        <div style={{ marginBottom: "16px" }}>
          {selectedUsers.map((u) => (
            <Tag
              key={u._id}
              color="purple"
              closable
              onClose={() => handleDelete(u)}
              style={{ marginBottom: "8px" }}
            >
              {u.name}
            </Tag>
          ))}
        </div>
        {loading ? (
          <Spin tip="Loading..." />
        ) : (
          searchResult.slice(0, 4).map((user) => (
            <UserListItem
              key={user._id}
              user={user}
              handleFunction={() => handleGroup(user)}
            />
          ))
        )}
      </Modal>
    </>
  );
};

export default GroupChatModal;
