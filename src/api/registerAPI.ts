import { config } from "../config/config"

interface ResponseType {
    status: string;
    data: { result: boolean, user: any }
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
}

export const registerAPI = async function registerAPI(data: RegisterationType) {
    const _csrf = window.localStorage.getItem('csrf') as string;
    
    const response = await fetch(config.BASE_URL_LOCAL + "/api/v1/auth/register", {
        method: "post",
        body: JSON.stringify({ ...data, _csrf:_csrf }),
        headers:{
            "Content-Type":"application/json",
            "X-CSRF-Token":_csrf
        },
        credentials:'include'
    });
    const result = await response.json() as ResponseType;
    
    if (result.data) {
        window.localStorage.setItem('token', result.data.user.token);
        return true;
    }

    return false
}