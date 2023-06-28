import React, { useEffect, useState } from "react";
import { Button, Input, Space, message } from "antd";
import { useCreateList } from "../../hook/list/useCreateList";
import { useUpdateList } from "../../hook/list/useUpdateList";

interface IProps {
  value?: string;
  isUpdate?: boolean;
  uuid?: string;
}

const ListForm: React.FC<IProps> = (props) => {
  const addListMutation = useCreateList();
  const updateMutation = useUpdateList();
  const [value, setValue] = useState(props.value ? props.value : "");
  useEffect(() => {
    setValue(props.value ? props.value : "");
  }, [props]);

  function addList() {
    if (value.trim().length > 0) {
      addListMutation
        .mutateAsync({
          name: value,
        })
        .then((result) => {
          message.success("Added new list: " + result.data.name);
          setValue("");
        })
        .catch((err) => {
          message.error(err);
        });
    } else {
      message.warning("Enter list name");
    }
  }

  function updateList() {
    if (value.trim().length > 0) {
      updateMutation
        .mutateAsync({
          data: {
            name: value,
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
      message.warning("Enter list name");
    }
  }
  return (
    <Space size={"middle"}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="List name"
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
            : addListMutation.isLoading
        }
      >
        {props.isUpdate && props.isUpdate == true ? "Update" : "Add"}
      </Button>
    </Space>
  );
};

export default ListForm;
