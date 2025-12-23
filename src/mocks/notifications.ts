import { Notification } from "../types";

export const notifications: Notification[] = [
    { id: 1, UserId: 1, title: "Booking Confirmed", message: "Your booking b1 has been confirmed.", read: false, createdAt: new Date("2025-05-01T11:00:00Z") },
    { id: 2, UserId: 2, title: "New Message", message: "You have a new message from Blue Haven Hotel.", read: false, createdAt: new Date("2025-05-02T10:20:00Z") }
];

export default notifications;


export function getNotifications() {
    return notifications;
}

export function getNotificationById(id: number) {
    return notifications.find(notification => notification.id === id);
}