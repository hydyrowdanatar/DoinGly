import { useMutation } from "react-query";
import { loginDto } from "../../../types/request/login";
import { axiosInstance } from "../../../common/axios.instance";
import { loginResponse } from "../../../types/response/login";
import { message } from "antd";
import { AxiosError } from "axios";

const login = async (data: loginDto) => {
  const response = await axiosInstance.post<loginResponse>(
    "/api/v1/users/login",
    data
  );
  return response;
};

export const useLogin = () => {
  return useMutation((data: loginDto) => login(data), {
    onSuccess: () => {
      message.success("Success");
    },
    onError: (err: AxiosError) => {
      message.error(`Username or password is incorrect!`);
    },
  });
};
