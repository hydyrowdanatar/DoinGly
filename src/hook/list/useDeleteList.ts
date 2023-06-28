import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { axiosInstance } from "../../common/axios.instance";

const deleteList=async(uuid: string)=>{
    const response = await axiosInstance.delete(`/api/v1/lists/${uuid}`);
    return response;
}

export const useDeleteList = () => {
    const queryClient = useQueryClient();
    return useMutation((uuid: string)=> deleteList(uuid),{
        onSuccess:()=>{
            queryClient.invalidateQueries('list');
            message.success('Successfully deleted');
        },
        onError:()=>{
            message.error('Error');
        }
    });
}