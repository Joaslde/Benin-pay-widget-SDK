import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {'Content-Type': 'application/json'}
});

export const catching = async (payload) => {
    try {
        const reponse = await apiClient.post('/init-payment' , payload)
        return reponse.data
        
    } catch (error) {
        return {
            message : 'Erreur coté recuperation de données',
            status: 'FAILED', 
            errorCode: 'NETWORK_ERROR'
        }
    }
}