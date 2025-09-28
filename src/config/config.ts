import { BASE_URL_LOCAL, BASE_URL_SERVER } from "../constants/constants"

const config = {
    BASE_URL_LOCAL: BASE_URL_LOCAL,
    BASE_URL_SERVER: BASE_URL_SERVER, 
    rooms: "/api/v1/rooms",
    messages: "/api/v1/messages",
    notifications: "/api/v1/notifications",
    hostels: "/api/v1/hostels",
    auth: "/api/v1/auth",

}

export { config }