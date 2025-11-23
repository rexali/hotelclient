
import { toast } from "sonner";
import { config } from "../config/config";
import { postPaymentInfoAPI } from "./postPaymentInfoAPI";
import PaystackPop from "@paystack/inline-js";

export async function makePaymentWithPopupAPI(data: { amount: any, roomId: any, userId: any, email: any }) {

    try {
        const _csrf = window.localStorage.getItem('csrf') as string;
        let response = await fetch(`${config.BASE_URL_LOCAL}/api/v1/get_transaction_url`, {
            body: JSON.stringify({ ...data, amount: Number(data.amount) * 100 }),
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                "X-XSRF-TOKEN": _csrf
            }
        });

        let result = await response.json();
        // console.log(result);
        if (result.status === 'success') {
            if (typeof window !== "undefined") {
                // save refrence
                window.localStorage.setItem('access_code', result.data.access_code);
                const popup = new PaystackPop();
                popup.resumeTransaction(result.data.access_code, {
                    onSuccess: async (transaction) => {
                        console.log(transaction);
                        // get saved checkout data
                        let checkoutData = JSON.parse(window.localStorage.getItem('checkoutData') || '') as {
                            checkIn: string;
                            checkOut: string;
                            roomId: string;
                            roomPrice: number;
                            userId: string;
                        }
                        // send payment info db and confirm later
                        let res = await postPaymentInfoAPI({
                            totalPrice: data.amount || checkoutData.roomPrice,
                            UserId: data.userId,
                            RoomId: data.roomId || checkoutData.roomId,
                            checkIn: checkoutData.checkIn,
                            checkOut: checkoutData.checkOut,
                            status: "confirmed", // pending, confirmed, canceled
                            paymentStatus: "paid", //paid
                        });
                        
                        window.localStorage.removeItem('checkoutData');
                        window.localStorage.setItem('checkoutData', JSON.stringify({
                            ...checkoutData,
                            BookingId: res.data.booking.id
                        }))

                        if (res.status) {
                            console.log("Payment info sent. Wait for confirmation")
                            toast("Payment info sent. Wait for confirmation")
                        } else {
                            console.log('Sending payment info failed')
                            toast('Sending payment info failed')
                        }
                    },
                    onCancel: () => {
                        console.log('Transaction canceled');
                    },
                    onError: (error) => {
                        console.log(error.message);
                    },
                    onLoad: (response) => {
                        console.log(response);
                    }

                });

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
//     access_code: 'wh53fg5m4it39vd',  // for popup
//     reference: 'mf5ud0bu7t'    // for redirect and verification
//   }
// }