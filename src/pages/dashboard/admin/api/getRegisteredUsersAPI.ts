
import { config } from "../../../../config/config";
import { ResponseType } from "../../../../types";

export const getRegisteredUsersAPI = async function getRegisteredUsersAPI() {

    try {
        const response = await fetch(config.BASE_URL_LOCAL + "/api/v1/profiles", {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        });

        const result = await response.json() as ResponseType;
        if (result.status === 'success') {
             
            return result.data?.profiles;
        }

    } catch (error) {
        console.warn(error);

    }
}

// https://comprehensive-fintec-ppi9.bolt.host/