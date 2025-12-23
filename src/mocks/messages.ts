import { Message } from "../types";

export const messages: Message[] = [
    {
        id: 1,
        senderId: "u1",
        receiverId: "101",
        subject: "Inquiry about room availability",
        content: "Hi, is the Deluxe Suite available on June 1st?",
        read: false,
        createdAt: new Date("2025-05-02T09:00:00Z")
    },
    {
        id: 2,
        senderId: "101",
        receiverId: "u1",
        subject: "Re: Inquiry about room availability",
        content: "Yes, it's available. We can reserve it for you.",
        read: false,
        createdAt: new Date("2025-05-02T10:15:00Z")
    }
];

export function getMessages() {
    return messages;
}

export function getMessageById(id: number) {
    return messages.find(message => message.id === id);
}