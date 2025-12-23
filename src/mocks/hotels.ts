import { Hostel } from "../types";

export const hotels: Hostel[] = [
    {
        id: 1,
        name: "Blue Haven Hotel",
        photo: "/images/hotels/blue-haven.jpg",
        email: "info@bluehaven.example",
        phone: "+2348010000001",
        address: "12 Marina Street, Lagos Island",
        description: "Comfortable city hotel near major attractions.",
        localGovt: "Ikeja",
        state: "Lagos",
        country: "Nigeria",
        document: "",
        UserId: 101,
        featured: true,
        createdAt: new Date("2024-01-15T09:30:00Z"),
        updatedAt: new Date("2024-12-01T10:00:00Z")
    },
    {
        id: 2,
        name: "Green Valley Inn",
        photo: "/images/hotels/green-valley.jpg",
        email: "stay@greenvalley.example",
        phone: "+2348020000002",
        address: "45 Market Road, Ilorin",
        description: "Cozy budget hotel with friendly service.",
        localGovt: "Ilorin West",
        state: "Kwara",
        country: "Nigeria",
        document: "",
        UserId: 102,
        featured: false,
        createdAt: new Date("2023-06-20T11:00:00Z"),
        updatedAt: new Date("2025-02-10T08:30:00Z")
    },
    {
        id: 3,
        name: "Plateau View Hotel",
        photo: "/images/hotels/plateau-view.jpg",
        email: "contact@plateauview.example",
        phone: "+2348030000003",
        address: "1 Hilltop Drive, Jos",
        description: "Quiet hotel with scenic views.",
        localGovt: "Jos North",
        state: "Plateau",
        country: "Nigeria",
        document: "",
        UserId: 103,
        featured: false,
        createdAt: new Date("2022-11-05T12:00:00Z"),
        updatedAt: new Date("2025-07-07T09:15:00Z")
    }
];



export function getHotels() {
    return hotels;
}

export function getHotelById(id: number) {
    return hotels.find(hotel => hotel.id === id);
}

