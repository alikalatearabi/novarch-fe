'use client'

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!auth.isAuthenticated()) {
            router.push('/login');
        }
    }, [auth, router]);

    return auth ? children : null;
};

export default ProtectedRoute;