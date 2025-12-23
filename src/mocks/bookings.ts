import { Booking } from "../types";

export const bookings: Booking[] = [
    {
        id: 1,
        UserId: "u1",
        RoomId: "r1",
        checkIn: new Date("2025-06-01T14:00:00Z"),
        checkOut: new Date("2025-06-03T11:00:00Z"),
        totalPrice: 50000,
        status: "confirmed",
        paymentStatus: "paid",
        createdAt: new Date("2025-05-01T10:00:00Z")
    },
    {
        id: 2,
        UserId: "u2",
        RoomId: "r3",
        checkIn: new Date("2025-07-15T15:00:00Z"),
        checkOut: new Date("2025-07-18T10:00:00Z"),
        totalPrice: 54000,
        status: "pending",
        paymentStatus: "pending",
        createdAt: new Date("2025-05-20T12:25:00Z")
    }
];

export function getBookings() {
    return bookings;
}


export function getBookingById(id:number) {
    return bookings.find(booking=>booking.id===id);
}


// export default bookings;
