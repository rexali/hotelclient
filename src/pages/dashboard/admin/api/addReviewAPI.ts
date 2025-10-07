// src/pages/dashboard/admin/api/addReviewAPI.ts

import { config } from "../../../../config/config";
import { ResponseType } from "../../../../types";

export interface AddReviewPayload {
    roomId: number;
    content: string;
    rating: number;
}

export async function addReviewAPI(payload: AddReviewPayload) {
    try {
        const response = await fetch(config.BASE_URL_LOCAL+'/api/v1/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to add review');
        }
        let result = await response.json() as ResponseType;

        if (result.status === 'success') {
            return true
        }

        return false


    } catch (error: any) {
        console.warn(error);
    }
}
