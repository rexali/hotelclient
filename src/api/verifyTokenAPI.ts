import { config } from "../config/config"

interface ResponseType {
    status: string;
    data: any
    message: string
}

export const verifyTokenAPI = async function verifyToken() {

    try {
        const token = window.localStorage.getItem('token');
        if (token) {
            const response = await fetch(config.BASE_URL_LOCAL + "/api/v1/auth/verify-token", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                credentials: 'include'
            });
            const result = await response.json() as ResponseType;
            if (result.status === 'success') {

                return result.data;
            }
        }
    } catch (error) {
        console.warn(error);

    }
}

// https://comprehensive-fintec-ppi9.bolt.host/