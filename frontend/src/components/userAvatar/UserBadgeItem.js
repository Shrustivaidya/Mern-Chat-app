import React from 'react';
import { Tag } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Tag
      closable
      onClose={handleFunction}
      color="purple"
      style={{
        margin: '4px',
        fontSize: '12px',
        borderRadius: '16px',
        padding: '4px 8px',
        cursor: 'pointer',
      }}
    >
      {user.name}
      {admin === user._id && <span> (Admin)</span>}
      <CloseCircleOutlined style={{ marginLeft: '4px' }} />
    </Tag>
  );
};

export default UserBadgeItem;
