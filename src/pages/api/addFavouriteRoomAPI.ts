
import { config } from "../../config/config";
import { ResponseType } from "../../types";


export const addFavouriteRoomAPI = async function addFavouriteRoomAPI(data: { roomId: string, userId: string }) {

    const _csrf = window.localStorage.getItem('csrf') as string;

    const roomResponse = await fetch(config.BASE_URL_LOCAL + "/api/v1/favourites", {
        method: 'post',
        body: data as any,
        credentials: 'include',
        headers: {
            "X-CSRF-Token": _csrf
        },
    });

    let result = await roomResponse.json() as ResponseType;


    if (result.status === 'success') {

        return result.message;
    }

    return result.message;
}