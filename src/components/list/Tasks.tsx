import React, { useEffect, useState } from "react";
import TaskForm from "../tasks/TaskForm";
import moment from "moment";
import taskDto from "../../types/response/task";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Popover, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useQueryClient } from "react-query";
import { useDeleteTask } from "../../hook/tasks/useDeleteTask";
import { useGetTasks } from "../../hook/tasks/useGetTasks";
import { useUpdateTask } from "../../hook/tasks/useUpdateTask";

interface IProps {
  listUUID: string;
}

const Tasks: React.FC<IProps> = (props) => {
  const deleteMutation = useDeleteTask();
  const updateMutation = useUpdateTask();
  const [update, setUpdate] = useState("");

  const [open, setOpen] = useState(false);

  const handleOk = (uuid: string) => {
    deleteMutation.mutate(uuid);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const columns: ColumnsType<taskDto> = [
    {
      title: "Task name",
      dataIndex: "text",
      width: 100,
      key: "text",
    },
    {
      title: "Completed",
      dataIndex: "completed",
      width: 100,
      key: "completed",
      render: (it: boolean) => (
        <label
          style={{
            color: it ? "green" : "red",
          }}
        >
          {it ? (
            <Space size={"small"}>
              <CheckCircleOutlined />
              Done
            </Space>
          ) : (
            <Space size={"small"}>
              <CloseCircleOutlined />
              Not completed
            </Space>
          )}
        </label>
      ),
    },
    {
      title: "Created at",
      width: 100,
      dataIndex: "createdAt",
      key: "createdAt",
      render: (it: Date) => <label>{moment(it).format("DD-MM-yyyy")}</label>,
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      dataIndex: "uuid",
      width: 100,
      render: (it, data) => (
        <Space size={"middle"}>
          <Button
            loading={updateMutation.isLoading && update === it}
            onClick={() => {
              setUpdate(it);
              updateMutation.mutate({
                data: {
                  text: data.text,
                  completed: !data.completed,
                  listUuid: props.listUUID,
                },
                uuid: it,
              });
            }}
          >
            {data.completed ? "Undo" : "Done"}
          </Button>
          <Popover
            content={
              <TaskForm
                listUUID={props.listUUID}
                value={data.text}
                isUpdate={true}
                uuid={data.uuid}
                completed={data.completed}
              />
            }
            title={`Update task`}
            trigger="click"
          >
            <Button>Edit</Button>
          </Popover>

          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            okText="Yes"
            cancelText="No"
            open={open}
            onConfirm={() => handleOk(it)}
            okButtonProps={{ loading: deleteMutation.isLoading }}
            onCancel={handleCancel}
          >
            <Button danger onClick={() => setOpen(!open)}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const { data, isLoading, refetch } = useGetTasks(props.listUUID);
  useEffect(() => {
    refetch();
  }, [props.listUUID]);
  return (
    <Table
      columns={columns}
      loading={isLoading}
      dataSource={data}
      scroll={{ x: 1300 }}
      pagination={false}
    />
  );
};

export default Tasks;
