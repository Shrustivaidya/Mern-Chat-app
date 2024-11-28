import React, { useState } from "react";
import {
  Modal,
  Button,
  Input,
  Form,
  Spin,
  notification,
  Typography,
  List,
  Divider,
} from "antd";
import { UserOutlined, SearchOutlined, CloseOutlined } from "@ant-design/icons";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import UserListItem from "../userAvatar/UserListItem";
import { Navigate } from "react-router-dom";

const { Text } = Typography;

const UpdateGroupChatModal = ({ fetchMessages, fetchAgain, setFetchAgain }) => {
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const { selectedChat, setSelectedChat, user } = ChatState();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      setSearchResult([]);
      return;
    }
  
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.get(`/api/user?search=${query}`, config);
  
      // Check if response and response.data are defined
      if (response && response.data) {
        setSearchResult(response.data);
      } else {
        throw new Error("No data received from the server");
      }
    } catch (error) {
      // Handle specific cases when response data is undefined
      if (error.response) {
        // Server responded with a status code outside of 2xx range
        console.error("Server error:", error.response.data);
        notification.error({
          message: "Error Occurred!",
          description: "Failed to load the search results",
          duration: 5,
        });
      } else if (error.request) {
        // No response received from the server
        console.error("No response from server:", error.request);
        notification.error({
          message: "Error Occurred!",
          description: "No response received from the server",
          duration: 5,
        });
      } else {
        // Other errors such as request configuration issues
        console.error("Error:", error.message);
        notification.error({
          message: "Error Occurred!",
          description: "An unexpected error occurred",
          duration: 5,
        });
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleRename = async () => {
    if (!groupChatName) return;
  
    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.put(
        `/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );
  
      // Check if the response and data are valid before accessing data
      if (response && response.data) {
        setSelectedChat(response.data);
        setFetchAgain(!fetchAgain);
        Navigate('/chat');
      } else {
        throw new Error("Invalid response data from the server");
      }
    } catch (error) {
     
      setRenameLoading(false);
    }
    setGroupChatName("");
  };
  
  const handleAddUser = async (userToAdd) => {
    if (selectedChat.users.find((u) => u._id === userToAdd._id)) {
      notification.error({
        message: "User Already in Group!",
        duration: 5,
      });
      return;
    }
  
    if (selectedChat.groupAdmin._id !== user._id) {
      notification.error({
        message: "Only Admins Can Add Users!",
        duration: 5,
      });
      return;
    }
  
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.put(
        `/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: userToAdd._id,
        },
        config
      );
  
      // Check if response and response.data are defined
      if (response && response.data) {
        setSelectedChat(response.data);
        setFetchAgain(!fetchAgain);
        setLoading(false);
      } else {
        throw new Error("No data received from the server");
      }
    } catch (error) {
      let errorMessage = "An error occurred";
      if (error.response) {
        // Check if error.response and error.response.data exist
        errorMessage = error.response.data && error.response.data.message
          ? error.response.data.message
          : "An error occurred while adding the user";
      } else if (error.request) {
        errorMessage = "No response received from the server";
      } else if (error.message) {
        errorMessage = error.message;
      }
  
      
  
      setLoading(false);
    }
  };
  

  const handleRemove = async (userToRemove) => {
    if (
      selectedChat.groupAdmin._id !== user._id &&
      userToRemove._id !== user._id
    ) {
      notification.error({
        message: "Only Admins Can Remove Users!",
        duration: 5,
      });
      return;
    }
  
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.put(
        `/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: userToRemove._id,
        },
        config
      );
  
      // Check if response and response.data are defined
      if (response && response.data) {
        userToRemove._id === user._id ? setSelectedChat() : setSelectedChat(response.data);
        setFetchAgain(!fetchAgain);
        fetchMessages();
        window.location.reload();
      } else {
        throw new Error("No data received from the server");
      }
  
      setLoading(false);
    } catch (error) {
      // Improved error handling
      let errorMessage = "An error occurred";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.request) {
        errorMessage = "No response received from the server";
      } else if (error.message) {
        errorMessage = error.message;
      }
  
    
  
      setLoading(false);
    }
    setGroupChatName("");
  };
  

  return (
    <Modal
      title="Group Chat Settings"
      visible={selectedChat}
      onCancel={() => setSelectedChat(null)}
      footer={null}
      centered
      width={600}
    >
      <Form layout="vertical">
        <Form.Item label="Group Name">
          <Input
            value={groupChatName}
            onChange={(e) => setGroupChatName(e.target.value)}
            placeholder="Enter new group name"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            loading={renameLoading}
            onClick={handleRename}
            block
          >
            Update Group Name
          </Button>
        </Form.Item>
      </Form>

      <Divider />

      <Form.Item label="Add User to Group">
        <Input
          prefix={<SearchOutlined />}
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search users"
        />
      </Form.Item>

      {loading ? (
        <Spin size="large" />
      ) : (
        <List
          bordered
          dataSource={searchResult}
          renderItem={(userItem) => (
            <List.Item>
              <UserListItem
                user={userItem}
                handleFunction={() => handleAddUser(userItem)}
              />
            </List.Item>
          )}
        />
      )}

      <Divider />

      <Text>Group Members:</Text>
      <div style={{ marginBottom: 16 }}>
        {selectedChat?.users.map((u) => (
          <UserBadgeItem
            key={u._id}
            user={u}
            admin={selectedChat.groupAdmin}
            handleFunction={() => handleRemove(u)}
          />
        ))}
      </div>

      <Button
        type="danger"
        onClick={() => handleRemove(user)}
        block
        style={{ marginTop: 16 }}
      >
        Leave Group
      </Button>
    </Modal>
  );
};

export default UpdateGroupChatModal;
