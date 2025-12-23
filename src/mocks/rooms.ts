import { Room } from "../types";

export const rooms: Room[] = [
    {
        id: 1,
        name: "Deluxe Suite",
        type: "double",
        price: 25000,
        location: "Blue Haven Hotel, Lagos",
        bedrooms: 1,
        bathrooms: 1,
        capacity: 2,
        amenities: ["WiFi", "Air Conditioning", "Breakfast"],
        // photos: ["/images/rooms/deluxe-1.jpg"],
        photos: [
            'https://photos.pexels.com/photos/164595/pexels-photo-164595.jpeg',
            'https://photos.pexels.com/photos/271618/pexels-photo-271618.jpeg'
        ],
        description: "Spacious suite with city view.",
        availability: true,
        rating: 4.6,
        featured: true,
        agentName: "Tunde Ajayi",
        agentPhone: "+2348010001111"
    },
    {
        id: 2,
        name: "Standard Room",
        type: "single",
        price: 8000,
        location: "Green Valley Inn, Ilorin",
        bedrooms: 1,
        bathrooms: 1,
        capacity: 1,
        amenities: ["WiFi", "Fan"],
        // photos: ["/images/rooms/standard-1.jpg"],
        photos: [
            'https://photos.pexels.com/photos/271618/pexels-photo-271618.jpeg',
            'https://photos.pexels.com/photos/164595/pexels-photo-164595.jpeg'
        ],
        description: "Affordable single room for short stays.",
        availability: true,
        rating: 4.0,
        featured: false,
        agentName: "Aisha Bello",
        agentPhone: "+2348020002222"
    },
    {
        id: 3,
        name: "Family Room",
        type: "triple",
        price: 18000,
        location: "Plateau View Hotel, Jos",
        bedrooms: 2,
        bathrooms: 1,
        capacity: 4,
        amenities: ["WiFi", "TV", "Parking"],
        // photos: ["/images/rooms/family-1.jpg"],
        photos: [
            'https://photos.pexels.com/photos/271618/pexels-photo-271618.jpeg',
            'https://photos.pexels.com/photos/164595/pexels-photo-164595.jpeg'
        ],
        description: "Good for families and small groups.",
        availability: false,
        rating: 4.2,
        featured: false,
        agentName: "Joseph Dabo",
        agentPhone: "+2348030003333"
    }
];

export function getRooms() {
    return rooms;
}

export function getRoomById(id: number) {
    return rooms.find(room => room.id === Number(id));
}