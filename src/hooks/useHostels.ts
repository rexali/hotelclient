import { useEffect, useState } from "react"
import { config } from "../config/config";
import { ResponseType } from "../types";

export const useHostels = (page: number) => {
    const [data, setData] = useState({});

    const getHostelsAPI = async function getHostelsAPI(page: number) {
        try {
            const response = await fetch(config.BASE_URL_LOCAL + "/api/v1/hostels?page=" + page,
                {
                    credentials: 'include'

                });

            const result = await response.json() as ResponseType;
            if (result.status === 'success') {

                setData(result?.data);
            }

        } catch (error) {
            console.warn(error);

        }
    }

    useEffect(() => {
        getHostelsAPI(page);
    }, [page]);

    return data

}