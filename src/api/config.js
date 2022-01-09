import axios from "axios";

export const baseUrl = 'http://127.0.0.1:3000';

const axiosInstance = axios.create({
    baseURL:baseUrl
});

axiosInstance.interceptors.response.use(
    res => res.data,
    err => {
        console.log(err, "网络错误")
    }
);

export {
    axiosInstance
};
