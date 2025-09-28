import { Dispatch } from "react";


export interface ResponseType {
    status: string;
    data: any
    message: string 
}

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
  availability: boolean;  //'available' | 'occupied' | 'maintenance';
  rating: number;
  featured: boolean;
  agentName: string;
  agentPhone: string;
}

export interface User {
  fullName: string;
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
  user: any | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  verifyToken: () => any;
  setUser: Dispatch<any>;
  updateProfile: (userData: any) => void;
  getCSRFToken: () => void
}