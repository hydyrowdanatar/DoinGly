import allTasksDto from "../../types/response/all.tasks";
import taskDto from "../../types/response/task";
import { useQuery } from "react-query";
import { axiosInstance } from "../../common/axios.instance";

const getTasks = async ()=>{
    const tasks = await axiosInstance.get<allTasksDto[]>(`/api/v1/tasks`);
    return tasks.data
}

export const useGetAllTasks = () => {
    return useQuery(['alltasks'],()=>getTasks())
}