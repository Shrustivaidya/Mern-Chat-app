import React ,{useState,useEffect} from 'react'
import { ChatState } from '../Context/ChatProvider';
import axios from 'axios';
import { message } from 'antd';
import { Card, Button, Typography, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from './miscellaneous/GroupChatModal';


const MyChats = (fetchAgain) => {
  const { Title, Text } = Typography;
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  
  const fetchChats = async () => {
    //console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      message({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }; 
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, []);
  return (
    <Card
      style={{
        display: selectedChat ? "none" : "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 16,
        backgroundColor: "white",
        width: "100%",
        maxWidth: 400,
        borderRadius: 8,
      }}
      bordered
    >
      <Row
        justify="space-between"
        align="middle"
        style={{ width: '100%', paddingBottom: 16 }}
      >
        <Title level={3} style={{ fontFamily: "Work sans" }}>
          My Chats
        </Title>

        <GroupChatModal>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="small"
            style={{ fontSize: '14px' }}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Row>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 16,
          backgroundColor: "#F8F8F8",
          width: '100%',
          borderRadius: 8,
          height: '100%',
          overflowY: 'auto',
        }}
      >
        {chats ? (
          chats.map((chat) => (
            <Card
            key={chat._id}
            onClick={() => {
              setSelectedChat(chat);
              console.log("Selected Chat:", chat);
            }}
            style={{
              marginBottom: 8,
              cursor: "pointer",
              backgroundColor: selectedChat === chat ? "#38B2AC" : "#E8E8E8",
              color: selectedChat === chat ? "white" : "black",
            }}
          >
            <Text>
              {!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName}
            </Text>
            {chat.latestMessage && (
              <Text style={{ fontSize: '12px', display: 'block' }}>
                <b>{chat.latestMessage.sender.name} : </b>
                {chat.latestMessage.content.length > 50
                  ? chat.latestMessage.content.substring(0, 51) + "..."
                  : chat.latestMessage.content}
              </Text>
            )}
          </Card>
          
          ))
        ) : (
          <ChatLoading />
        )}
      </div>
    </Card>
  )
}

export default MyChats
