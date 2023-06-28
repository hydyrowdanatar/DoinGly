import AddListDTO from "../../types/request/list";
import listDto from "../../types/response/list";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { axiosInstance } from "../../common/axios.instance";

const create=async(data: AddListDTO)=>{
    const response = await axiosInstance.post<listDto>('/api/v1/lists', data);
    return response;
}

export const useCreateList=()=>{
    const queryClient = useQueryClient();
    return useMutation((data: AddListDTO)=> create(data),{
        onSuccess: ()=>{
            queryClient.invalidateQueries("list");
            message.success('Successfully added')
        },
        onError: ()=>{
            message.error('Something went wrong')
        }
    })
}