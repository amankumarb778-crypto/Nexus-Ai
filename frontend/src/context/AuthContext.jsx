import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // On app load, restore session from localStorage
    useEffect(() => {
        const savedToken = localStorage.getItem('nexus_token');
        const savedUser = localStorage.getItem('nexus_user');
        if (savedToken && savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                setUser({ ...parsedUser, token: savedToken });
            } catch {
                localStorage.removeItem('nexus_token');
                localStorage.removeItem('nexus_user');
            }
        }
        setLoading(false);
    }, []);

    const signup = async (name, email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${API_URL}/auth/signup`, { name, email, password });
            const { token, user: userData } = response.data;

            localStorage.setItem('nexus_token', token);
            localStorage.setItem('nexus_user', JSON.stringify(userData));
            setUser({ ...userData, token });
            return userData;
        } catch (err) {
            const msg = err.response?.data?.error || 'Signup failed. Please try again.';
            setError(msg);
            throw new Error(msg);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${API_URL}/auth/login`, { email, password });
            const { token, user: userData } = response.data;

            localStorage.setItem('nexus_token', token);
            localStorage.setItem('nexus_user', JSON.stringify(userData));
            setUser({ ...userData, token });
            return userData;
        } catch (err) {
            const msg = err.response?.data?.error || 'Login failed. Please check your credentials.';
            setError(msg);
            throw new Error(msg);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('nexus_token');
        localStorage.removeItem('nexus_user');
        setUser(null);
    };

    const value = { user, loading, error, signup, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
