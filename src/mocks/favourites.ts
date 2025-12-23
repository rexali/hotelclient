export const favourites = [
    { id: 1, UserId: 1, RoomId: 1, addedAt: new Date("2025-01-05T12:00:00Z") },
    { id: 2, UserId: 2, RoomId: 2, addedAt: new Date("2025-03-15T09:30:00Z") }
];


export function getFavourites() {
    return favourites;
}

export function getFavouriteById(id: number) {
    return favourites.find(favourite => favourite.id === id);
}

