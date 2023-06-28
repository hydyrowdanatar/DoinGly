import Navbar from "../../components/home/Navbar";
import React, { useState } from "react";
import Sidebar from "../../components/home/Sidebar";
import { Stack, createTheme, useMediaQuery } from "@mui/material";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Input } from "antd";
import { Outlet } from "react-router-dom";
import style from "../../theme/app.style";

const { Search } = Input;

const { Header, Content, Footer, Sider } = Layout;

const Home: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const apptheme = createTheme();
  const isMobile = useMediaQuery(apptheme.breakpoints.down("md"));

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          textAlign: "center",
        }}
      >
        <Sidebar />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Navbar />
        </Header>
        <Content style={{ margin: "0" }}>
          <Outlet />
        </Content>
        <Footer
          style={
            !isMobile
              ? { ...style.auth.title, textAlign: "center" }
              : { ...style.auth.title, fontSize: "16px" }
          }
        >
          Developed by Danatar Hydyrow
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
