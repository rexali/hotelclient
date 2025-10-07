
import { config } from "../../config/config";
import { ResponseType } from "../../types";

export const getRoomsAPI = async function getRoomsAPI(page: number = 1) {

    try {
        const response = await fetch(config.BASE_URL_LOCAL + "/api/v1/rooms?page=" + page, {
            method: "GET",
            credentials: 'include'
        });

        const result = await response.json() as ResponseType;
        if (result.status === 'success') {

            return result.data;
        }

    } catch (error) {
        console.warn(error);

    }
}

// https://comprehensive-fintec-ppi9.bolt.host/