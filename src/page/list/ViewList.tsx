import ListForm from "../../components/home/ListForm";
import React, { useState } from "react";
import TaskForm from "../../components/tasks/TaskForm";
import Tasks from "../../components/list/Tasks";
import style from "./../../theme/app.style";
import { PlusOutlined } from "@ant-design/icons";
import { Stack, createTheme, useMediaQuery } from "@mui/material";
import { Button, Popconfirm, Popover, Space, Typography } from "antd";
import { FloatButton } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteList } from "../../hook/list/useDeleteList";
import appTheme from "../../theme/app.theme";

const ViewList = () => {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const deleteMutation = useDeleteList();
  const handleOk = () => {
    deleteMutation.mutateAsync(`${params.uuid}`).then(() => {
      navigate("/");
    });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Space
      direction="vertical"
      size={"small"}
      style={{ padding: "12px", width: "100%" }}
    >
      <Stack
        sx={{
          width: "100%",
          p: 2,
        }}
        spacing={2}
        direction={isMobile ? "column" : "row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography
          style={
            !isMobile
              ? style.auth.title
              : { ...style.auth.title, fontSize: "28px" }
          }
        >
          {params.name}
        </Typography>
        <Stack
          direction={"row"}
          spacing={2}
        >
          <Popover
            content={
              <ListForm
                value={params.name}
                uuid={params.uuid}
                isUpdate={true}
              />
            }
            title="Update list"
            trigger="click"
          >
            <Button>Edit</Button>
          </Popover>
          <Popconfirm
            title="Delete the list"
            description="Are you sure to delete this list?"
            okText="Yes"
            cancelText="No"
            open={open}
            onConfirm={handleOk}
            okButtonProps={{ loading: deleteMutation.isLoading }}
            onCancel={handleCancel}
          >
            <Button
              danger
              onClick={() => setOpen(!open)}
            >
              Delete
            </Button>
          </Popconfirm>
        </Stack>
      </Stack>
      <Tasks listUUID={params.uuid ? params.uuid : ""} />
      <Popover
        content={<TaskForm listUUID={params.uuid ? params.uuid : ""} />}
        title={`Add task to ${params.name} list`}
        trigger="click"
      >
        <FloatButton
          icon={<PlusOutlined />}
          type="primary"
          style={{ right: 50 }}
        />
      </Popover>
    </Space>
  );
};

export default ViewList;
