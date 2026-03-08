import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000/api',
    timeout: 30000,
});

export const analyzeResume = async (file, jobRole) => {
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobRole', jobRole);
    const { data } = await api.post('/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
};

export const improveBullet = async (bullet, jobRole) => {
    const { data } = await api.post('/improve-bullet', { bullet, jobRole });
    return data;
};

export const getHistory = async () => {
    const { data } = await api.get('/history');
    return data;
};
