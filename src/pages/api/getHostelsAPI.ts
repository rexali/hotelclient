import { config } from "../../config/config";
import { ResponseType } from "../../types";

export const getHostelsAPI = async function getHostelsAPI(page: number) {
        try {
            const response = await fetch(config.BASE_URL_LOCAL + "/api/v1/hostels?page=" + page,
                {
                    credentials: 'include'
                });

            const result = await response.json() as ResponseType;
            if (result.status === 'success') {

                return result?.data;
            }

        } catch (error) {
            console.warn(error);

        }
    }