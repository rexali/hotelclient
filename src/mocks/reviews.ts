export const reviews = [
    { id: 1, UserId: 1, RoomId: 1, rating: 5, comment: "Excellent stay, very clean.", createdAt: new Date("2025-02-12T10:00:00Z") },
    { id: 2, UserId: 2, RoomId: 3, rating: 4, comment: "Good hotel, friendly staff.", createdAt: new Date("2025-03-02T15:30:00Z") }
];

export function getReviews() {
    return reviews;
}

export function getReviewById(id: number) {
    return reviews.find(review => review.id === id);
}