import axios from "axios";

// Create axios instance with default config
const axiosParam = {
    baseURL: process.env.REACT_APP_VATOBANK_SERVER_API_URL || "http://localhost:8000/api",
    // timeout: 5000,
    headers: {
        'Accept': 'application/json',
        withCredentials: false,
    }
};

// Create the axios instance
const axiosInstance = axios.create(axiosParam);

// Function to get token from sessionStorage
const getAuthToken = () => {
    const token = sessionStorage.getItem('access_token');
    return token ? `Bearer ${token}` : ''; // Ensure token is prefixed with 'Bearer '
};

// Extend axios instance to include the token automatically
axiosInstance.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token) {
        // Attach token to the request header
        config.headers.Authorization = token;
    }

    // if (config.headers['Content-Type'] === 'multipart/form-data') {
    //     delete config.headers['Content-Type'];
    // }
     // Automatically handle FormData content type
     if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Wrap axiosInstance in an API function
const api = (instance) => {
    return {
        get: (url, headers = {}) => instance.get(url, { headers }),
        // post: (url, body, headers = {}) => instance.post(url, body, { headers }),
        post: (url, body, headers = {}) => {
            // Special handling for FormData
            if (body instanceof FormData) {
                return instance.post(url, body, {
                    ...headers,
                    'Content-Type': 'multipart/form-data'
                });
            }
            return instance.post(url, body, { headers });
        },
        put: (url, body, headers = {}) => instance.put(url, body, { headers }),
        delete: (url, headers = {}) => instance.delete(url, { headers }),
        patch: (url, body, headers = {}) => instance.patch(url, body, { headers })
    };
};

export default api(axiosInstance);


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