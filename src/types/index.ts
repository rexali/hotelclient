import { Dispatch } from "react";


export interface ResponseType {
  status: string;
  data: any
  message: string
}

export interface Hostel {
  id?: number,
  name: string,
  photo: string,
  email: string,
  phone: string,
  address: string,
  description: string,
  localGovt: string,
  state: string,
  country: string,
  document: string,
  UserId: number,
  featured: boolean
  createdAt?: Date,
  updatedAt?: Date
}

export interface Room {
  id: number;
  name: string;
  type: 'single' | 'double' | 'triple' | 'dormitory';
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  capacity: number;
  amenities: string[];
  photos: string[];
  description: string;
  availability: boolean;  //'available' | 'occupied' | 'maintenance';
  rating: number;
  featured: boolean;
  agentName: string;
  agentPhone: string;
}

export interface User {
  fullName: string;
  id: number;
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
  id: number;
  UserId?: string;
  RoomId?: string;
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: Date;
}

export interface Message {
  id: number;
  senderId: string;
  receiverId: string;
  UserId?: string;
  subject: string;
  content: string;
  read: boolean;
  createdAt: Date;
}

export interface Notification {
  id: number;
  UserId?: number;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

export interface AuthContextType {
  user: any | null;
  login: (username: string, password: string) => Promise<any>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  verifyToken: (token: string) => Promise<any>;
  setUser: Dispatch<any>;
  updateProfile: (userData: any) => void;
  getCSRFToken: () => Promise<any>
}