import { useEffect, useState } from "react"
import { config } from "../config/config";
import { ResponseType } from "../types";

export const useRoom = (id: number) => {
    const [data, setData] = useState();

    const getRoomAPI = async function getRoomAPI(id: number) {
        try {
            const response = await fetch(config.BASE_URL_LOCAL + "/api/v1/rooms/" + id, {
                credentials: 'include'
            });

            const result = await response.json() as ResponseType;

            setData(result?.data?.room);

        } catch (error) {
            console.warn(error);

        }
    }

    useEffect(() => {
        getRoomAPI(id);

    }, [id]);

    return { data }

}