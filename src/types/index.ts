export interface Room {
  id: string;
  name: string;
  type: 'single' | 'double' | 'triple' | 'dormitory';
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  capacity: number;
  amenities: string[];
  images: string[];
  description: string;
  availability: 'available' | 'occupied' | 'maintenance';
  rating: number;
  featured: boolean;
  popular: boolean;
  newlyAdded: boolean;
  recentlySold: boolean;
  recommended: boolean;
  agentName: string;
  agentPhone: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  localGovernment: string;
  state: string;
  country: string;
  avatar?: string;
  role: 'user' | 'admin';
  favorites: string[];
  createdAt: Date;
}

export interface Booking {
  id: string;
  userId: string;
  roomId: string;
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  subject: string;
  content: string;
  read: boolean;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id' | 'favorites' | 'createdAt'>) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
}