import axios from "axios";

const axiosParam = {
    baseURL: process.env.REACT_APP_VATOBANK_SERVER_API_URL || "http://localhost:8000/api/auth",
    timeout: 5000,
    headers: {
        'Content-Type': 'multipart/form-data',
         withCredentials: true
    }
}

const axiosInstance = axios.create(axiosParam);
// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = sessionStorage.getItem('token');  // Get the Bearer token from sessionStorage
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;  // Attach the Bearer token to the Authorization header
//         }
//         return config;  // Continue with the request
//     },
//     (error) => {
//         return Promise.reject(error);  // Handle any request errors
//     }
// );

const api = (instance) => {
    return {
        get: (url, headers = {}) => instance.get(url, { headers }),
        post: (url, body, headers = {}) => instance.post(url, body, { headers }),
        put: (url, body, headers = {}) => instance.put(url, body, { headers }),
        delete: (url, headers = {}) => instance.delete(url, { headers }),
        patch: (url, body, headers = {}) => instance.patch(url, body, { headers })
    };
}


export default api(axiosInstance);