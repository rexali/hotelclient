import { User } from "../types";

export const users: User[] = [
    {
        fullName: "John Doe",
        id: 1,
        name: "johndoe",
        email: "john@example.com",
        phone: "+2347010000001",
        address: "14 Sample Street, Lagos",
        localGovernment: "Ikeja",
        state: "Lagos",
        country: "Nigeria",
        avatar: "/images/users/john.jpg",
        role: "user",
        favorites: ["r1"],
        createdAt: new Date("2024-03-10T10:00:00Z")
    },
    {
        fullName: "Mary Okonkwo",
        id: 2,
        name: "maryo",
        email: "mary@example.com",
        phone: "+2347010000002",
        address: "7 Market Lane, Ilorin",
        localGovernment: "Ilorin West",
        state: "Kwara",
        country: "Nigeria",
        avatar: "/images/users/mary.jpg",
        role: "user",
        favorites: ["r2", "r3"],
        createdAt: new Date("2023-09-01T09:00:00Z")
    }
];

export function getUsers() {
    return users;
}

export function getUserById(id: number) {
    return users.find(user => user.id === id);
}