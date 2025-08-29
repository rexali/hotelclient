import { Room, User, Booking, Message, Notification } from '../types';

export const mockRooms: Room[] = [
  {
    id: '1',
    name: 'Premium Single Room A1',
    type: 'single',
    price: 45000,
    location: 'University of Lagos Campus',
    bedrooms: 1,
    bathrooms: 1,
    capacity: 1,
    amenities: ['WiFi', 'AC', 'Study Desk', 'Wardrobe', 'Private Bathroom'],
    images: [
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg'
    ],
    description: 'A comfortable single room perfect for focused studying with all modern amenities.',
    availability: 'available',
    rating: 4.8,
    featured: true,
    popular: true,
    newlyAdded: false,
    recentlySold: false,
    recommended: true,
    agentName: 'John Doe',
    agentPhone: '+234 803 123 4567'
  },
  {
    id: '2',
    name: 'Shared Double Room B2',
    type: 'double',
    price: 35000,
    location: 'Covenant University Area',
    bedrooms: 1,
    bathrooms: 1,
    capacity: 2,
    amenities: ['WiFi', 'AC', 'Study Desk', 'Shared Kitchen', 'Laundry'],
    images: [
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg'
    ],
    description: 'A well-designed double room for students who prefer shared accommodation.',
    availability: 'available',
    rating: 4.5,
    featured: false,
    popular: true,
    newlyAdded: true,
    recentlySold: false,
    recommended: false,
    agentName: 'Jane Smith',
    agentPhone: '+234 805 987 6543'
  },
  {
    id: '3',
    name: 'Executive Triple Suite C3',
    type: 'triple',
    price: 28000,
    location: 'Babcock University Vicinity',
    bedrooms: 1,
    bathrooms: 2,
    capacity: 3,
    amenities: ['WiFi', 'AC', 'Study Area', 'Kitchen', 'Parking', 'Security'],
    images: [
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg'
    ],
    description: 'Spacious triple suite with executive amenities for comfortable group living.',
    availability: 'occupied',
    rating: 4.7,
    featured: true,
    popular: false,
    newlyAdded: false,
    recentlySold: true,
    recommended: true,
    agentName: 'Mike Johnson',
    agentPhone: '+234 807 456 7890'
  },
  {
    id: '4',
    name: 'Budget Dormitory D1',
    type: 'dormitory',
    price: 18000,
    location: 'Lagos State University Area',
    bedrooms: 1,
    bathrooms: 2,
    capacity: 8,
    amenities: ['WiFi', 'Shared Kitchen', 'Study Hall', 'Common Area'],
    images: [
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg'
    ],
    description: 'Affordable dormitory option for budget-conscious students.',
    availability: 'available',
    rating: 4.2,
    featured: false,
    popular: false,
    newlyAdded: true,
    recentlySold: false,
    recommended: false,
    agentName: 'Sarah Wilson',
    agentPhone: '+234 809 234 5678'
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@student.edu',
    phone: '+234 803 123 4567',
    address: '123 Student Street',
    localGovernment: 'Yaba',
    state: 'Lagos',
    country: 'Nigeria',
    role: 'user',
    favorites: ['1', '3'],
    createdAt: new Date('2024-01-15'),
    fullName: ''
  },
  {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@hostel.com',
    phone: '+234 805 987 6543',
    address: '456 Admin Avenue',
    localGovernment: 'Victoria Island',
    state: 'Lagos',
    country: 'Nigeria',
    role: 'admin',
    favorites: [],
    createdAt: new Date('2023-12-01'),
    fullName: ''
  }
];

export const mockBookings: Booking[] = [
  {
    id: '1',
    userId: '1',
    roomId: '1',
    checkIn: new Date('2024-02-01'),
    checkOut: new Date('2024-06-30'),
    totalPrice: 225000,
    status: 'confirmed',
    paymentStatus: 'paid',
    createdAt: new Date('2024-01-20')
  }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '1',
    receiverId: 'admin1',
    subject: 'Room Inquiry',
    content: 'I would like to inquire about the availability of Premium Single Room A1.',
    read: false,
    createdAt: new Date('2024-01-25')
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    title: 'Booking Confirmed',
    message: 'Your booking for Premium Single Room A1 has been confirmed.',
    read: false,
    createdAt: new Date('2024-01-20')
  }
];