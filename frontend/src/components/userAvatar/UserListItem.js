import React from "react";
import { Avatar, Card, Typography } from "antd";
import { ChatState } from "../../Context/ChatProvider";

const { Text } = Typography;

const UserListItem = ({ user,handleFunction }) => {
 

  return (
    <Card
      hoverable
      onClick={handleFunction}
      style={{
        backgroundColor: "#E8E8E8",
        cursor: "pointer",
        marginBottom: "8px",
        display: "flex",
        alignItems: "center",
        borderRadius: "8px",
        padding: "8px",
      }}
      bodyStyle={{
        padding: "0",
      }}
    >
      <Avatar
        size="small"
        src={user.pic}
        alt={user.name}
        style={{ marginRight: "8px" }}
      />
      <div>
        <Text>{user.name}</Text>
        <Text type="secondary" style={{ fontSize: "12px", display: "block" }}>
          <b>Email: </b>
          {user.email}
        </Text>
      </div>
    </Card>
  );
};

export default UserListItem;
