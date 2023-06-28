import React from "react";
import style from "./../../theme/app.style";
import { Controls, Player } from "@lottiefiles/react-lottie-player";
import { Stack, createTheme, useMediaQuery } from "@mui/material";
import { Space, Typography } from "antd";
import { RandomAvatar } from "react-random-avatars";
import { getData } from "../../helper/storage.helper";

const Profile = () => {
  const data = getData("user");

  let username =
    data.username.split("")[0].toUpperCase() + data.username.substring(1);

  const theme = createTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Stack
      sx={{ width: "100%" }}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Space
        direction="vertical"
        style={{
          width: isMobile ? "95%" : "50%",
          padding: "20px",
          backgroundColor: "white",
          marginTop: "22px",
          borderRadius: "22px",
        }}
        size={"small"}
        align="center"
      >
        <Player
          autoplay
          loop
          src="/images/tasks.json"
          style={{ height: "200px", width: "200px" }}
        ></Player>
        <Typography
          style={
            !isMobile
              ? style.auth.title
              : { ...style.auth.title, fontSize: "20px" }
          }
        >
          {data && data !== null ? username : ""}
        </Typography>
        <RandomAvatar
          name={data && data !== null ? data.username : ""}
          size={isMobile ? 80 : 120}
        />
      </Space>
    </Stack>
  );
};

export default Profile;
