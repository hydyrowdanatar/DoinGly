import axios from "axios";
import { server_url } from "./constant";

export const axiosInstance = axios.create({
    baseURL: server_url,
    headers: {
        'Authorization':`Bearer ${window.localStorage.getItem('token')}`
    }
});