import AddListDTO from "../../types/request/list";
import listDto from "../../types/response/list";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { axiosInstance } from "../../common/axios.instance";

interface IProps {
    data: AddListDTO;
    uuid: string;
}

const update=async(data: IProps)=>{
    const response = await axiosInstance.put<listDto>('/api/v1/lists/'+data.uuid, data.data);
    return response;
}

export const useUpdateList=()=>{
    const queryClient = useQueryClient();
    return useMutation((data: IProps)=> update(data),{
        onSuccess: ()=>{
            queryClient.invalidateQueries("list");
            message.success('Successfully updated')
        },
        onError: ()=>{
            message.error('Something went wrong')
        }
    })
}