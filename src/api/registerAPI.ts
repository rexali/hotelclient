import { config } from "../config/config"

interface ResponseType {
    status: string;
    data: { user: any }
    message: string
}

interface RegisterationType {
    name: string,
    username: string,
    password: string,
    phone: string,
    address: string,
    localGovt: string,
    state: string,
    role: string,
    status: string,
    _csrf?: string
}

export const registerAPI = async function registerAPI(data: RegisterationType) {
    const _csrf = window.localStorage.getItem('csrf') as string;    
    const response = await fetch(config.BASE_URL_LOCAL + "/api/v1/auth/register", {
        method: "POST",
        body: JSON.stringify({ ...data, _csrf }),
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
            "CSRF-Token": _csrf
        },
    });
    const result = await response.json() as ResponseType;

    if (result.status ==="success") {

        return true;
    }

    return false
}