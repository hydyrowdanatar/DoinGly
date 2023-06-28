import React, { useEffect, useState } from "react";
import { Button, Input, Space, message } from "antd";
import { useCreateList } from "../../hook/list/useCreateList";
import { useUpdateList } from "../../hook/list/useUpdateList";
import { useCreateTask } from "../../hook/tasks/useCreateTask";
import { useUpdateTask } from "../../hook/tasks/useUpdateTask";

interface IProps {
  value?: string;
  completed?: boolean;
  isUpdate?: boolean;
  uuid?: string;
  listUUID: string;
}

const TaskForm: React.FC<IProps> = (props) => {
  const addTaskMutation = useCreateTask();
  const updateMutation = useUpdateTask();
  const [value, setValue] = useState(props.value ? props.value : "");
  useEffect(() => {
    setValue(props.value ? props.value : "");
  }, [props]);

  function addList() {
    if (value.trim().length > 0) {
      addTaskMutation
        .mutateAsync({
          text: value,
          completed: false,
          listUuid: props.listUUID,
        })
        .then((result) => {
          setValue("");
        })
        .catch((err) => {
          message.error(err);
        });
    } else {
      message.warning("Enter task name");
    }
  }

  function updateList() {
    if (value.trim().length > 0) {
      updateMutation
        .mutateAsync({
          data: {
            text: value,
            completed: props.completed ? props.completed : false,
            listUuid: props.listUUID,
          },
          uuid: props.uuid ? props.uuid : "",
        })
        .then((result) => {
          setValue("");
        })
        .catch((err) => {
          message.error(err);
        });
    } else {
      message.warning("Enter task name");
    }
  }
  return (
    <Space size={"middle"}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Task name"
      />
      <Button
        onClick={() => {
          if (props.isUpdate && props.isUpdate == true) {
            updateList();
          } else {
            addList();
          }
        }}
        loading={
          props.isUpdate && props.isUpdate == true
            ? updateMutation.isLoading
            : addTaskMutation.isLoading
        }
      >
        {props.isUpdate && props.isUpdate == true ? "Update" : "Add"}
      </Button>
    </Space>
  );
};

export default TaskForm;
