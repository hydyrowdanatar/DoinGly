import formTaskDto from "../../types/request/task";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { axiosInstance } from "../../common/axios.instance";

interface IProps {
    data: formTaskDto;
    uuid: string;
}

const update=async(data: IProps)=>{
    const response = await axiosInstance.put('/api/v1/tasks/'+data.uuid, data.data);
    return response;
}

export const useUpdateTask=()=>{
    const queryClient = useQueryClient();
    return useMutation((data: IProps)=> update(data),{
        onSuccess: ()=>{
            queryClient.invalidateQueries("tasks");
            message.success('Successfully updated')
        },
        onError: ()=>{
            message.error('Something went wrong')
        }
    })
}