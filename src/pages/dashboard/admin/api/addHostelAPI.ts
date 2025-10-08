import { config } from "../../../../config/config";
import { ResponseType } from "../../../../types";


export const addHostelAPI = async function addHostelAPI(data: any) {

    const _csrf = window.localStorage.getItem('csrf') as string;

    const hostelResponse = await fetch(config.BASE_URL_LOCAL + "/api/v1/hostels", {
        method: 'post',
        body: data as any,
        credentials: 'include',
        headers: {
            "X-CSRF-Token": _csrf
        },
    });

    let result = await hostelResponse.json() as ResponseType;


    if (result.status === 'success') {

        return result.data.hostel;
    }

    return;
}