import React from 'react';
import { Layout, Tabs, Typography, Card } from "antd";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

const { Title } = Typography;
const { TabPane } = Tabs;
const { Content } = Layout;

function Homepage() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px 0",
        }}
      >
        <Card
          style={{ width: "100%", maxWidth: 400 }}
          title={
            <Title level={2} style={{ textAlign: "center" }}>
              Talk-A-Tive
            </Title>
          }
          bordered={false}
        >
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Login" key="1">
              <Login />
            </TabPane>
            <TabPane tab="Sign Up" key="2">
              <Signup />
            </TabPane>
          </Tabs>
        </Card>
      </Content>
    </Layout>
  )
}

export default Homepage
