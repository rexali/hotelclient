// import { config } from "../../config/config";
// import { ResponseType } from "../../types";

import { config } from "../config/config";
import { ResponseType } from "../types";

export async function postPaymentInfoAPI(data: {
    roomId: string,
    userId: string,
    totalPrice: number,
    status: string,
    paymentStatus: string
}) {

    const _csrf = window.localStorage.getItem('csrf') as string;

    const roomResponse = await fetch(config.BASE_URL_LOCAL + "/api/v1/bookings", {
        method: 'post',
        body: data as any,
        credentials: 'include',
        headers: {
            "X-CSRF-Token": _csrf
        },
    });

    let result = await roomResponse.json() as ResponseType;


    if (result.status === 'success') {

        return true;
    }

    return false;
}