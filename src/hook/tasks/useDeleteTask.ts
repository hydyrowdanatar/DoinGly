import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { axiosInstance } from "../../common/axios.instance";

const deleteTask = async (uuid: string) => {
    const response = await axiosInstance.delete(`/api/v1/tasks/${uuid}`);
    return response;
}

export const useDeleteTask = () => {
    const qc = useQueryClient();
    return useMutation((uuid: string)=> deleteTask(uuid),{
        onSuccess: ()=>{
            message.success('Successfully deleted')
            qc.invalidateQueries('tasks');
        },
        onError: ()=>{
            message.error('Error deleting task')
        }
    });
}