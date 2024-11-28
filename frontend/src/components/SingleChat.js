import { useState, useEffect, useRef } from "react";
import { Input, Button, Spin, Typography, notification } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import { getSender } from "../config/ChatLogics";
import ScrollableChat from "./ScrollableChat";
import lottie from "lottie-web";
import animationData from "../animations/typing.json";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import ProfileModal from "./miscellaneous/ProfileModal";

const { Text } = Typography;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const { selectedChat, setSelectedChat, user, notification, setNotification } = ChatState();
  const lottieRef = useRef(null);

  useEffect(() => {
    if (lottieRef.current) {
      lottie.loadAnimation({
        container: lottieRef.current,
        animationData,
        renderer: "svg",
        loop: true,
        autoplay: true,
      });
    }
  }, []);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);
      const response = await axios.get(`/api/message/${selectedChat._id}`, config);

      // Check if the response and response.data are valid
      if (response && response.data) {
        setMessages(response.data);
      } else {
        throw new Error("No data received from the server");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching messages:", error); // Log detailed error
      notification.error({
        message: "Error Occurred!",
        description: "Failed to load messages.",
        duration: 5,
      });
      setLoading(false);
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        setNewMessage("");
        const response = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );

        // Check if the response and response.data are valid
        if (response && response.data) {
          setMessages([...messages, response.data]);
        } else {
          throw new Error("Failed to send the message. No response data.");
        }
      } catch (error) {
        console.error("Error sending message:", error); // Log detailed error
        notification.error({
          message: "Error Occurred!",
          description: "Failed to send the message.",
          duration: 5,
        });
      }
    }
  };

  return (
    <div style={{ height: "100%" }}>
      {selectedChat ? (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 16 }}>
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={() => setSelectedChat("")}
              style={{ display: "flex", alignItems: "center" }}
            />
            <Text style={{ fontSize: 20, fontWeight: 600 }}>
              {!selectedChat.isGroupChat
                ? getSender(user, selectedChat.users)
                : selectedChat.chatName.toUpperCase()}
            </Text>
            {selectedChat.isGroupChat ? (
              <UpdateGroupChatModal
                fetchMessages={fetchMessages}
                fetchAgain={fetchAgain}
                setFetchAgain={setFetchAgain}
              />
            ) : (
              <ProfileModal user={selectedChat.users} />
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              background: "#f5f5f5",
              borderRadius: 8,
              padding: 16,
              overflowY: "hidden",
              height: "80%",
            }}
          >
            {loading ? (
              <Spin size="large" style={{ alignSelf: "center", margin: "auto" }} />
            ) : (
              <div style={{ overflowY: "auto", height: "100%" }}>
                <ScrollableChat messages={messages} />
              </div>
            )}
            {isTyping && (
              <div ref={lottieRef} style={{ height: 50, width: 70, marginBottom: 15 }} />
            )}
            <Input
              placeholder="Enter a message..."
              value={newMessage}
              onKeyDown={sendMessage}
              style={{ marginTop: 16, borderRadius: 8 }}
            />
          </div>
        </>
      ) : (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
          <Text style={{ fontSize: 24 }}>Click on a user to start chatting</Text>
        </div>
      )}
    </div>
  );
};

export default SingleChat;
