import React from "react";
import { Card } from "antd";
import SingleChat from "./SingleChat"; // Adjust the import path as necessary

const ChatBox = ({ fetchAgain, setFetchAgain, selectedChat }) => {
  return (
    <Card
      style={{
        
        flexDirection: "column",
        alignItems: "center",
        padding: "16px", // 3 in Chakra is approximately 16px
        backgroundColor: "white",
        width: "100%", // Default base width
        borderRadius: "8px", // Approximate lg border radius
        border: "1px solid #d9d9d9", // Matches Ant Design default border color
        ...(window.innerWidth >= 768 && { width: "68%" }), // Responsive handling for 'md'
      }}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Card>
  );
};

export default ChatBox;
