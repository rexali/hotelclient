import { config } from "../config/config";


export async function verifyPayment(reference: any) {

    try {
        const _csrf = window.localStorage.getItem('csrf') as string;
        let response = await fetch(`${config.BASE_URL_LOCAL}/api/v1/verify_transaction`, {
            body: JSON.stringify({ reference }),
            headers: {
                'Content-Type': 'application/json',
                "X-CSRF-Token": _csrf
            },
            method: "POST",
            credentials: 'include',
        });
        let result = await response.json();

        return result.data;

    } catch (error) {
        console.warn(error);
    }
};