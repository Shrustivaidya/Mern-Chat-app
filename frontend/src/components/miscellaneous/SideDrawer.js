import React, { useState } from 'react';
import { Tooltip, Menu, Badge,Dropdown,message } from 'antd';
import { Button, Typography,Avatar } from 'antd';
import { SearchOutlined, BellOutlined,DownOutlined } from '@ant-design/icons';
import { ChatState } from '../../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useNavigate } from "react-router-dom";


const { Text } = Typography;

const SideDrawer = ({ onOpen }) => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const { user } = ChatState();
  const navigate = useNavigate();

  const logoutHandler = () => {
    // Remove user information from local storage
    localStorage.removeItem("userInfo");

    // Show a success message using Ant Design's message component
    message.success("Successfully logged out.");

    // Navigate to the login or home page
    navigate("/");
  };

  

  const dropdownMenu = (
    <Menu>
      <Menu.Item>
        {/* Pass the user object as a prop */}
        <ProfileModal user={user}>
          <Button type="text">View Profile</Button>
        </ProfileModal>
      </Menu.Item>
      <Menu.Item>
        <Button type="text" onClick={logoutHandler}>Logout</Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
          width: '97.8%',
          padding: '5px 10px',
          borderWidth: '5px',
          borderStyle: 'solid', // Border style added
        }}
      >
         {/* Tooltip wrapped around Button and Search Text */}
         <Tooltip title="Search Users to chat" placement="bottom">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Search Button */}
            <Button type="text" onClick={onOpen} icon={<SearchOutlined />} />

            {/* Text - Search User */}
            <Text
              style={{
                '@media (min-width: 768px)': { display: 'inline' },
                paddingLeft: 8,
                marginLeft: '10px', // Add margin to separate button and text
              }}
            >
              Search User
            </Text>
          </div>
        </Tooltip>

        {/* Text - Talk-A-Tive */}
        <Text
          style={{
            fontSize: '30px',
            fontFamily: 'Work sans',
            marginRight: '50px', // Add space between the two texts
          }}
        >
          Talk-A-Tive Chat App
        </Text>

        {/* Notification Badge and Bell Icon */}
        <Menu>
          <Badge > {/* Example notification count */}
            <BellOutlined style={{ fontSize: '24px', color: '#1890ff', marginRight: '10px' }} />
          </Badge>
        </Menu>
      
          {/* Dropdown Button with Menu */}
          {user && user.pic && user.name && (
          <Dropdown overlay={dropdownMenu} trigger={['click']}>
            <Button style={{ backgroundColor: 'white' }} icon={<DownOutlined />}>
              <Avatar
                size="small"
                src={user.pic} // Avatar pic
                name={user.name} // Avatar name
                style={{ marginRight: 8 }}
              />
              {user.name} {/* Display the user's name */}
            </Button>
          </Dropdown>
        )}
       
      </div>
    </>
  );
};

export default SideDrawer;
