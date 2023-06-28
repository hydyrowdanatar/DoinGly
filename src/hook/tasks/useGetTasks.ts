import taskDto from "../../types/response/task";
import { useQuery } from "react-query";
import { axiosInstance } from "../../common/axios.instance";

const getTasks = async (listUUID: string)=>{
    const tasks = await axiosInstance.get<taskDto[]>(`/api/v1/lists/${listUUID}/tasks`);
    return tasks.data
}

export const useGetTasks = (listUUID: string) => {
    return useQuery(['tasks'],()=>getTasks(listUUID))
}