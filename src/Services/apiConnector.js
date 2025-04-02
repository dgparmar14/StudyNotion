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
    // console.log("API URL: ", url);
    // console.log("API Method: ", method);
    // console.log("API Body Data: ", bodyData);
    // console.log("API Headers: ", headers);

    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData,
        headers: headers,
        params: params ? params : null,
    });
}
