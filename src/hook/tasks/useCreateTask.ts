import formTaskDto from "../../types/request/task";
import listDto from "../../types/response/list";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { axiosInstance } from "../../common/axios.instance";

const create=async(data: formTaskDto)=>{
    const response = await axiosInstance.post<listDto>('/api/v1/tasks', data);
    return response;
}

export const useCreateTask=()=>{
    const queryClient = useQueryClient();
    return useMutation((data: formTaskDto)=> create(data),{
        onSuccess: ()=>{
            queryClient.invalidateQueries("tasks");
            message.success('Successfully added')
        },
        onError: ()=>{
            message.error('Something went wrong')
        }
    })
}