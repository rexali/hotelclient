export const carts = [
    { id: 1, UserId: 1, RoomId: 1, nights: 2, addedAt: new Date("2025-04-01T08:00:00Z") },
    { id: 2, UserId: 1, RoomId: 3, nights: 3, addedAt: new Date("2025-05-10T14:20:00Z") }
];


export function getCarts() {
    return carts;
}

export function getCartById(id: number) {
    return carts.find(cart => cart.id === id);
}



