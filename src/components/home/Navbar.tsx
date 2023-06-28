import React, { useState } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { Stack, createTheme, useMediaQuery } from "@mui/material";
import { AutoComplete, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { getData, saveData } from "../../helper/storage.helper";
import { useGetAllTasks } from "../../hook/tasks/useGetAllTasks";

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});

const Navbar = () => {
  const { data } = useGetAllTasks();
  const navigate = useNavigate();
  const onSelect = (d: string) => {
    const find = data?.filter((it) => it.text === d);
    if (find && find.length > 0) {
      navigate(`/${find[0].List.uuid}/${find[0].List.name}`);
    } else {
      message.warning("Search failed");
    }
  };

  function logout() {
    saveData(null, "user");
    window.localStorage.removeItem("token");
    navigate("/auth");
  }

  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Stack
      direction={"row"}
      sx={{ width: "100%", p: 2 }}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <AutoComplete
        options={
          data
            ? data?.map((it) => {
                return { value: it.text };
              })
            : []
        }
        style={{ width: isMobile ? 100 : 200 }}
        onSelect={onSelect}
        filterOption={(inputValue, option) =>
          option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        placeholder="Search tasks..."
      />
      <Button
        onClick={logout}
        type="primary"
        shape="circle"
      >
        <LogoutOutlined />
      </Button>
    </Stack>
  );
};

export default Navbar;
