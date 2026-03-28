import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
    timeout: 30000,
});

export const analyzeResume = async (file, jobRole, token) => {
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobRole', jobRole);
    const { data } = await api.post('/analyze', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            ...(token && { 'Authorization': `Bearer ${token}` })
        },
    });
    return data;
};

export const improveBullet = async (bullet, jobRole, token) => {
    const { data } = await api.post('/improve-bullet', { bullet, jobRole }, {
        headers: {
            ...(token && { 'Authorization': `Bearer ${token}` })
        }
    });
    return data;
};

export const getHistory = async (token) => {
    const { data } = await api.get('/history', {
        headers: {
            ...(token && { 'Authorization': `Bearer ${token}` })
        }
    });
    return data;
};

export const deleteHistoryItem = async (id, token) => {
    const { data } = await api.delete(`/history/${id}`, {
        headers: {
            ...(token && { 'Authorization': `Bearer ${token}` })
        }
    });
    return data;
};
