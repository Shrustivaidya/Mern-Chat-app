import React from 'react';
import { Skeleton, Space } from 'antd';

const ChatLoading = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Skeleton.Input active size="large" style={{ width: '100%', height: 45 }} />
      <Skeleton.Input active size="large" style={{ width: '100%', height: 45 }} />
      <Skeleton.Input active size="large" style={{ width: '100%', height: 45 }} />
      <Skeleton.Input active size="large" style={{ width: '100%', height: 45 }} />
      <Skeleton.Input active size="large" style={{ width: '100%', height: 45 }} />
      <Skeleton.Input active size="large" style={{ width: '100%', height: 45 }} />
      <Skeleton.Input active size="large" style={{ width: '100%', height: 45 }} />
      <Skeleton.Input active size="large" style={{ width: '100%', height: 45 }} />
      <Skeleton.Input active size="large" style={{ width: '100%', height: 45 }} />
      <Skeleton.Input active size="large" style={{ width: '100%', height: 45 }} />
      <Skeleton.Input active size="large" style={{ width: '100%', height: 45 }} />
      <Skeleton.Input active size="large" style={{ width: '100%', height: 45 }} />
    </Space>
  );
};

export default ChatLoading;
