
import { config } from "../../config/config";
import { ResponseType } from "../../types";

type Query = {
    page: number;
    location: string;
    minPrice: number;
    maxPrice: number;
    type: string;
    roomType: string;
    bedrooms: number;
    bathrooms: number;
    amenities: Array<string>;
    availability: boolean;
}
export const getSearchedRoomAPI = async function getSearchedRoomAPI(query: any) {
    let params = new URLSearchParams(query).toString();
    try {
        const response = await fetch(config.BASE_URL_LOCAL + "/search?" + params, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET",
            credentials: 'include'
        });

        const result = await response.json() as ResponseType;
        if (result.status === 'success') {

            return result.data?.rooms;
        }

    } catch (error) {
        console.warn(error);

    }
}
