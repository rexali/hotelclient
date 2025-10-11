// src/pages/dashboard/admin/api/getMessagesAPI.ts

import { config } from "../../../../config/config";
import { ResponseType } from "../../../../types";

export async function getRoomAPI(id: number) {
    try {
        const response = await fetch(config.BASE_URL_LOCAL + '/api/v1/rooms/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to fetch messages');
        }
        const result = await response.json() as ResponseType;

        return {
            success: result.status === 'success' ? true : false,
            room: result.data?.room,
        };
    } catch (error: any) {

        return {
            success: false,
            error: error.message || 'Unknown error',
        };
    }
}
