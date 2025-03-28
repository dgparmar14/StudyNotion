import axios from "axios"

export const axiosInstance = axios.create({});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response && error.response.status == 403){
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)
export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers: headers,
        params: params ? params : null,
    });
}