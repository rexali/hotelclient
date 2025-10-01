
import { config } from "../../config/config";
import { ResponseType } from "../../types";

export const getRoomAPI = async function getRoomAPI(id: number) {

    try {
        const response = await fetch(config.BASE_URL_LOCAL + "/api/v1/rooms/" + id, {
            headers: {
                "Content-Type": "application/json",
            },
            method:"GET",
            credentials: 'include'
        });

        const result = await response.json() as ResponseType;
        if (result.status === 'success') {

            return result.data.room;
        }

    } catch (error) {
        console.warn(error);

    }
}

// https://comprehensive-fintec-ppi9.bolt.host/