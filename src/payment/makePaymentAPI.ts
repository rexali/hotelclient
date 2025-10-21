
import { config } from "../config/config";

export async function makePaymentAPI(data: { amount: any, roomId: any, userId: any, email: any }) {

    try {

        const _csrf = window.localStorage.getItem('csrf') as string;
        let response = await fetch(`${config.BASE_URL_LOCAL}/api/v1/get_transaction_url`, {
            body: JSON.stringify({ ...data, amount: Number(data.amount) * 100 }),
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                "X-CSRF-Token": _csrf
            }
        });

        let result = await response.json();
        console.log(result);
        if (result.status === 'success') {
            if (typeof window !== "undefined") {
                window.localStorage.setItem('reference', result.data.reference);
                window.localStorage.setItem('data', JSON.stringify(data));
                window.location.assign(result.data.authorization_url);
            }
        }

    } catch (error) {
        console.warn(error);
    }
};

//         {
//   status: true,
//   message: 'Authorization URL created',
//   data: {
//     authorization_url: 'https://checkout.paystack.com/wh53fg5m4it39vd',
//     access_code: 'wh53fg5m4it39vd',
//     reference: 'mf5ud0bu7t'
//   }
// }