import listDto from "../../types/response/list";
import { message } from "antd";
import { useMutation, useQuery } from "react-query";
import { axiosInstance } from "../../common/axios.instance";

const getList = async () => {
 const response = await axiosInstance.get<listDto[]>('/api/v1/lists')
 return response.data
}

export const useGetLists = () => {
    return useQuery(["list"],()=> getList(),{
        onSuccess: ()=>{
        },
        onError: ()=>{
            message.error('Error getting lists')
        }
    })
}