'use client';

import React from 'react';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import jwt from 'jsonwebtoken';
import { useLocalStorage } from 'usehooks-ts';
import { api } from '@/api';
import { AxiosError } from 'axios';

interface IJwtPayload {
    role?: string;
    email?: string;
}

interface IAuthContext {
    role: () => string | undefined;
    user: any | undefined;
    signin: (
        username: string,
        password: string,
    ) => Promise<{ status: boolean; message: string }>;
    signout: () => void;
    isAuthenticated: () => boolean;
    getUsername: () => string | undefined;
}

const AuthContext = createContext<IAuthContext>({
    role: () => '',
    isAuthenticated: () => false,
    signin: async () => ({ status: false, message: 'Not implemented' }),
    signout: () => { },
    user: {},
    getUsername: () => undefined,
});


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useLocalStorage('token', { accessToken: '', refreshToken: '' });

    const role = useCallback(() => getJwtPayload().role, [token]);
    const getUsername = useCallback(() => getJwtPayload().email, [token]);

    const getJwtPayload = useCallback<() => IJwtPayload>(() => {
        try {
            if (!token.accessToken) throw new Error();
            return jwt.decode(token.accessToken) as IJwtPayload;
        } catch (error) {
            return {};
        }
    }, [token]);

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const isAuthenticated = useCallback(() => {
        const jwt = getJwtPayload();
        return !!jwt.email;
    }, [getJwtPayload]);

    const fetchUserInfo = () => {
        if (isAuthenticated()) {
            api.user.getMe().then((res) => {
                if (res.ok && res.data && res.data.success) {
                    const { responseObject } = res.data;
                    setUser(responseObject);
                }
            });
        }
    };

    const signin = async (username: string, password: string) => {
        try {
            const { ok, data } = await api.auth.login(username, password);
            if (ok && data.success) {
                if (data.responseObject.accessToken) {
                    setToken({
                        ...data.responseObject,
                    });
                    await fetchUserInfo();
                    return { status: true, message: data.message };
                } else {
                    return { status: true, message: data.message };
                }
            }
            return { status: false, message: data?.message };
        } catch (error) {
            let message = error.message;
            if (error instanceof AxiosError && error.response?.data) {
                message = error.response?.data.message;
            }
            return { status: false, message };
        }
    };

    const signout = () => {
        window.localStorage.clear();
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                role,
                signin,
                signout,
                isAuthenticated,
                getUsername,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);