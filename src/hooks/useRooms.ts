import { useEffect, useRef, useState } from "react"
import { config } from "../config/config";
import { ResponseType } from "../types";

export const useRooms = () => {
    const [rooms, setRooms] = useState([]);
    const mountRef = useRef(true);

    const getRoomsAPI = async function getRoomsAPI() {
        try {
            const response = await fetch(config.BASE_URL_LOCAL + "/api/v1/rooms", { credentials: 'include' });

            const result = await response.json() as ResponseType;
            if (result.status === 'success') {

                setRooms(result.data.rooms);
            }

        } catch (error) {
            console.warn(error);

        }
    }

    useEffect(() => {
        if (mountRef.current) {
            getRoomsAPI();
        }

        return () => {
            mountRef.current = false;
        }
    });

    return { rooms }

}