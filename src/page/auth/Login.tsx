import React from "react";
import style from "../../theme/app.style";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Stack } from "@mui/material";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { saveData } from "../../helper/storage.helper";
import { useLogin } from "../../hook/auth/login/useLogin";
import { loginDto } from "../../types/request/login";

const Login = () => {
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const onFinish = (values: loginDto) => {
    loginMutation.mutateAsync(values).then((response) => {
      window.localStorage.setItem("token", response.data.token);
      saveData(values, "user");
      navigate("/");
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Stack
      sx={{ width: "100%" }}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={3}
    >
      <Typography style={style.auth.title}>Login</Typography>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{
          width: "600px",
        }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          wrapperCol={{ span: 24 }}
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          wrapperCol={{ span: 24 }}
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button
            loading={loginMutation.isLoading}
            type="primary"
            style={{ width: "100%" }}
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Stack>
  );
};

export default Login;
