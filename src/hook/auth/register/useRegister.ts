import registerDto from "../../../types/request/register";
import registerResponse from "../../../types/response/register";
import { message } from "antd";
import { useMutation } from "react-query";
import { axiosInstance } from "../../../common/axios.instance";

const register = async (data: registerDto) => {
  const response = await axiosInstance.post<registerResponse>('/api/v1/users/register', data);
  return response.data;
}

export const useRegister = () => {
  return useMutation((data: registerDto)=> register(data), {
    onSuccess: ()=>{
      message.success('Successfully registered')
    },
    onError: ()=>{
      message.error('Error registering')
    }
  })
}