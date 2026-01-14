// src/api/axios.js
import axios from "axios";

// Create an Axios instance
const api = axios.create({
    baseURL: "https://perfume-backend-4.onrender.com/api",  // ← CHANGED THIS LINE
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        // Don't add auth header for signup and login endpoints
        const publicEndpoints = ['/users/signup/', '/users/login/'];
        const isPublicEndpoint = publicEndpoints.some(endpoint => 
            config.url.includes(endpoint)
        );

        if (!isPublicEndpoint) {
            const token = localStorage.getItem("access");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;