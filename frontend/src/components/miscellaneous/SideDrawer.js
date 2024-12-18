import React, { useState } from "react";
import { Tooltip, Menu, Badge, Dropdown, message, Drawer, Input, List, Avatar, Spin, Button, Typography } from "antd";
import { SearchOutlined, BellOutlined, DownOutlined } from "@ant-design/icons";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import UserListItem from "../userAvatar/UserListItem";
import ChatLoading from "../ChatLoading";
import 'react-toastify/dist/ReactToastify.css'; // Import the default CSS for styling


const { Text } = Typography;

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  
 
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);




  const { user, setSelectedChat,chats, setChats } = ChatState();
  const navigate = useNavigate();

  const onClose = () => setIsDrawerOpen(false);


  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    message.success("Successfully logged out.");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
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

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const dropdownMenu = (
    <Menu>
      <Menu.Item>
        <ProfileModal user={user}>
          <Button type="text">View Profile</Button>
        </ProfileModal>
      </Menu.Item>
      <Menu.Item>
        <Button type="text" onClick={logoutHandler}>
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "white",
          width: "97.8%",
          padding: "5px 10px",
          borderWidth: "5px",
          borderStyle: "solid",
        }}
      >
        {/* Tooltip wrapped around Button and Search Text */}
        <Tooltip title="Search Users to chat" placement="bottom">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              type="text"
              icon={<SearchOutlined />}
              onClick={() => setIsDrawerOpen(true)}
            />
            <Text
              style={{
                paddingLeft: 8,
                marginLeft: "10px",
              }}
            >
              Search User
            </Text>
          </div>
        </Tooltip>

        <Text
          style={{
            fontSize: "30px",
            fontFamily: "Work sans",
            marginRight: "50px",
          }}
        >
          Talk-A-Tive Chat App
        </Text>

        <Menu>
          <Badge>
            <BellOutlined style={{ fontSize: "24px", color: "#1890ff", marginRight: "10px" }} />
          </Badge>
        </Menu>

        {user && user.pic && user.name && (
          <Dropdown overlay={dropdownMenu} trigger={["click"]}>
            <Button style={{ backgroundColor: "white" }} icon={<DownOutlined />}>
              <Avatar size="small" src={user.pic} style={{ marginRight: 8 }} />
              {user.name}
            </Button>
          </Dropdown>
        )}
      </div>

      {/* Drawer for Search */}
      <Drawer
        title="Search Users"
        placement="left"
        onClose={() => setIsDrawerOpen(false)}
        visible={isDrawerOpen}
      >
        <div style={{ display: "flex", marginBottom: 16 }}>
          <Input
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginRight: 8 }}
          />
          <Button type="primary" onClick={handleSearch}>
            Go
          </Button>
          </div>

{/* Search Results */}
{loading ? (
  <ChatLoading />
) : (
  <List
    dataSource={searchResult}
    renderItem={(user) => (
      <UserListItem
        key={user._id}
        user={user}
        handleFunction={() => accessChat(user._id)}
      />
    )}
  />
)}

{/* Chat Loading */}
{loadingChat && (
  <div style={{ textAlign: "center", marginTop: 16 }}>
    <Spin />
  </div>
)}
</Drawer>
    </>
  );
};

export default SideDrawer;
