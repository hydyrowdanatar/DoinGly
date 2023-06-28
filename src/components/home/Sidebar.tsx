import AddList from "./ListForm";
import React, { useState } from "react";
import type { MenuProps, MenuTheme } from "antd/es/menu";
import { useNavigate } from "react-router-dom";
import { useGetLists } from "../../hook/list/useGetlist";

import {
  Button,
  Divider,
  Menu,
  Popover,
  Space,
  Switch,
  Typography,
} from "antd";

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  FileAddOutlined,
} from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const Sidebar: React.FC = () => {
  const [mode, setMode] = useState<"vertical" | "inline">("inline");
  const { data, error, isLoading } = useGetLists();
  const navigate = useNavigate();

  function getLists() {
    try {
      if (data && data.length > 0 && !isLoading) {
        return data;
      } else {
        return [];
      }
    } catch (e) {
      return [];
    }
  }

  const items: MenuItem[] = [
    getItem(
      <Button
        type="text"
        style={{ color: "white", width: "100%" }}
        onClick={() => navigate(`/`)}
      >
        Profile
      </Button>,
      "sub1",
      <UserOutlined />,
    ),
    getItem("Lists", "sub2", <TeamOutlined />, [
      ...getLists().map((it, i) =>
        getItem(
          <Button
            key={i}
            type="text"
            style={{ color: "white", width: "100%" }}
            onClick={() => navigate(`/${it.uuid}/${it.name}`)}
          >
            {it.name}
          </Button>,
          it.uuid,
        ),
      ),
      getItem(
        <Popover
          content={<AddList />}
          title="Add list"
          trigger="click"
        >
          <Button
            type="text"
            style={{ color: "white" }}
            icon={<FileAddOutlined />}
          >
            New list
          </Button>
        </Popover>,
        "new_list",
      ),
    ]),
  ];

  return (
    <>
      <img
        src="/images/white_logo.png"
        style={{
          width: "100%",
          height: "100px",
          objectFit: "contain",
        }}
      />
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
      />
    </>
  );
};

export default Sidebar;
