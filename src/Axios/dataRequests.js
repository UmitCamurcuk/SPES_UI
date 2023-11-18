import axios from "axios";
import { loadStateFromLocalStorage } from "../Storage/Localstorage";
const BASE_URL = "http://localhost:5000/";
const token = loadStateFromLocalStorage('token');

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
    },
});

// GET isteği için
export const getDataRequest = async (url) => {
    try {
        const response = await api.get(url);
        console.log('test')
        return response.data;
    } catch (error) {
        if(error.response.status === 401){
            window.location.href = '/Logout'
        }
        console.error('GET isteği sırasında hata:', error);
        throw error;
    }
};

// POST isteği için
export const postDataRequest = async (url, data) => {
    try {
        const response = await api.post(url, data);
        console.log('test')
        return response.data;
    } catch (error) {
        console.error('POST isteği sırasında hata:', error);
        throw error;
    }
};

// PUT isteği için
export const putDataRequest = async (url, data) => {
    try {
        const response = await api.put(url, data);
        return response.data;
    } catch (error) {
        console.error('PUT isteği sırasında hata:', error);
        throw error;
    }
};

// DELETE isteği için
export const deleteDataRequest = async (url) => {
    try {
        const response = await api.delete(url);
        return response.data;
    } catch (error) {
        console.error('DELETE isteği sırasında hata:', error);
        throw error;
    }
};
