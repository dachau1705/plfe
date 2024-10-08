import axios from 'axios';
import Cookies from 'js-cookie';

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Địa chỉ API cơ bản
    timeout: 1000000, // Thời gian chờ mặc định là 10 giây
    headers: {
        'Content-Type': 'application/json',
    },
});

// Cấu hình interceptor để thêm token vào các yêu cầu (nếu có)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        const user_id = Cookies.get('user_id');
        const c = {
            userId: user_id
        }
        config.headers['info'] = JSON.stringify({
            userId: c.userId,
            deivce_name: 'win10amddmddm',
            bundle_id: 'webadminbdc',
        })
        // config.data = { ...config.data, userId: user_id };
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Cấu hình interceptor để xử lý lỗi từ phản hồi
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Hàm GET
export const get = async (url, config = {}) => {
    try {
        const response = await api.get(url, config);
        return response.data.data;
    } catch (error) {
        console.error('GET request error:', error);
        throw error;
    }
};

// Hàm POST
export const post = async (url, data, isFormData = false, config = {}) => {
    try {
        if (isFormData) {
            const formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key]);
            }
            config.headers = {
                ...config.headers,
                'Content-Type': 'multipart/form-data',
            };
            data = formData;
        }

        const response = await api.post(url, data, config);
        return response.data;
    } catch (error) {
        console.error('POST request error:', error);
        throw error;
    }
};
