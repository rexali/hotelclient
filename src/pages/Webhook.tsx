'use client'

import React from "react";
import { verifyPayment } from "../payment/verifyPaymentAPI";
import { useSearchParams } from "react-router-dom";
import { postPaymentInfoAPI } from "../payment/postPaymentInfoAPI";

export default function Webhook() {

    const [result, setResult] = React.useState();
    const [searchParams, _] = useSearchParams()
    const reference = window.localStorage.getItem("reference") || searchParams.get("reference");

    React.useEffect(() => {
        (async () => {
            try {
                // TO DO 1: use reference to query paystack
                let result = await verifyPayment(reference);
                console.log(result);
                let data = JSON.parse(window.localStorage.getItem('data') as string);
                if (result) {
                    // TO DO 2: send  result or support data to database transaction table
                    await postPaymentInfoAPI(data || result);
                    setResult(result);
                }
            } catch (error) {
                console.warn(error);
            }
        })();

    }, [reference])

    if (!result) {

        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 400 }}>
                <p style={{ color: "orange" }}>Transaction failed {result}</p>
            </div>
        )
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 400, }}>
            <p>Transaction successful: {result}</p>
        </div>
    )
}
