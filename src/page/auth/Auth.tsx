import { Button, Space } from "antd";
import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Stack
      sx={{ width: "100%", height: "100vh" }}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={2}
    >
      <Outlet />
      <Stack direction={"row"} spacing={2}>
        <Button
          onClick={() => navigate("/auth")}
          type={location.pathname === "/auth" ? "primary" : "default"}
        >
          Login
        </Button>
        <Button
          onClick={() => navigate("/auth/register")}
          type={location.pathname === "/auth/register" ? "primary" : "default"}
        >
          Register
        </Button>
      </Stack>
    </Stack>
  );
};

export default Auth;
