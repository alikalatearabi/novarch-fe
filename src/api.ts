'use client'
import Axios, { AxiosResponse } from 'axios';

interface GeneralResponse<T> {
    success: number;
    message: string;
    responseObject: T;
    statusCode: number;
}

interface ExtendedAxiosResponse<T = any> extends AxiosResponse<T> {
    ok: boolean;
}

// Axios.defaults.withCredentials = true;
const baseURL = process.env.NEXT_PUBLIC_API_ADDRESS;
const axios = Axios.create({ baseURL: baseURL });

interface IPagination {
    page?: number;
    limit?: number;
}

interface IToken {
    accessToken: string;
    refreshToken: string;
}

export function token(): IToken {
    return JSON.parse(localStorage.getItem('token') || '{}');
}

export function setToken(token: IToken) {
    localStorage.setItem('token', JSON.stringify(token));
}

const refreshAccessToken = async () => {
    try {
        const response = await Axios.get(new URL('/api/auth/refresh', baseURL).href, {
            headers: { Authorization: `Bearer ${token().refreshToken}` },
        });
        if (response.status === 200 && response.data && response.data.data) {
            return response.data.data;
        }
    } catch (error) {
        console.error('Failed to refresh access token:', error);
        localStorage.clear();
        throw new Error('Session expired. Please log in again.');
    }
};


axios.interceptors.response.use(
    (response) => {
        let r = response as ExtendedAxiosResponse;
        if (response.status >= 200 && response.status < 300) {
            r.ok = true;
        }
        return r;
    },
    async function (error) {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const { accessToken, refreshToken } = await refreshAccessToken();
                setToken({ accessToken, refreshToken });
                if (accessToken) {
                    originalRequest.headers['Authorization'] = 'Bearer ' + accessToken;
                    return axios(originalRequest);
                }
            } catch (refreshError) {
                localStorage.clear();
                // Notify the user instead of refreshing or redirecting
                console.error('Session expired. Please log in again.');
            }
        }

        return Promise.reject(error);
    },
);


axios.interceptors.request.use(async function (request) {
    try {
        const { accessToken } = token();
        if (accessToken) {
            request.headers['Authorization'] = `Bearer ${accessToken}`;
        }
    } catch (error) { }
    return request;
});

export const api = {
    csrf: () => axios.get('csrf'),
    auth: {
        login: (username: string, password: string) => {
            return axios.post<any, ExtendedAxiosResponse<GeneralResponse<{ accessToken: string; refreshToken: string }>>>('/api/auth/login', {
                email: username,
                password,
            });
        },
    },
    user: {
        getMe: () => {
            return axios.get<any, ExtendedAxiosResponse<GeneralResponse<{ email: string }>>>('/api/users/me');
        }
    },
    sheets: {
        get: (projectId: number) => {
            return axios.get<any, ExtendedAxiosResponse<GeneralResponse<any>>>('/api/sheets', { params: { projectId } });
        },
        post: (data: any) => {
            return axios.post<any, ExtendedAxiosResponse<GeneralResponse<any>>>('/api/sheets', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
        }
    },
    project: {
        create: (data: any) => {
            return axios.post<any, ExtendedAxiosResponse<GeneralResponse<any>>>('/api/project', data);
        },
        getAll: () => {
            return axios.get<any, ExtendedAxiosResponse<GeneralResponse<any>>>('/api/project');
        }
    }
};