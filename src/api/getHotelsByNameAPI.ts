import { config } from "../config/config"

interface ResponseType {
    status: string;
    data: any
    message: string
}

export const getHotelsByState = async function getHotelsByState(state: string) {

    try {
        const response = await fetch(config.BASE_URL_LOCAL + "/api/v1/hostels/"+state+"/state", {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        });
        const result = await response.json() as ResponseType;
        if (result.status === 'success') {
            return result.data;
        }

        return;
    } catch (error) {
        console.warn(error);
    }
}