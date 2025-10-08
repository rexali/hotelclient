import { BarChart3, Bell, Heart, Home, MessageCircle, TrendingUp, User, Users, DollarSign, Hotel } from "lucide-react";
import { useState } from "react";
import ProfileTab from "./ProfileTab";
import { UsersTab } from "./UsersTab";
import { MessagesTab } from "./MessagesTab";
import { AnalysisTab } from "./Analysis";
import { ReportTab } from "./ReportTab";
import { NotificationsTab } from "./NotificatonsTab";
import { BookingsTab } from "./BookingsTabs";
import SavedTab from "./SavedTabs";
import { RoomsTab } from "./RoomsTab";
import { HostelsTab } from "./HostelsTab";


export const AdminDashboard = () => {

  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'rooms', name: 'Rooms', icon: Home },
    { id: 'favorites', name: 'Favorites', icon: Heart },
    { id: 'messages', name: 'Messages', icon: MessageCircle },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'bookings', name: 'Bookings', icon: DollarSign },
    { id: 'hostels', name: 'Hostels', icon: Hotel },
    { id: 'reports', name: 'Reports', icon: BarChart3 },
    { id: 'analysis', name: 'Analysis', icon: TrendingUp },
  ];


  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />
      case 'hostels':
        return <HostelsTab />
      case 'rooms':
        return <RoomsTab />
      case 'bookings':
        return <BookingsTab />
      case 'favorites':
        return <SavedTab />;
      case 'notifications':
        return <NotificationsTab />;
      case 'messages':
        return <MessagesTab />;
      case 'users':
        return <UsersTab />
      case 'reports':
        return <ReportTab />
      case 'analysis':
        return <AnalysisTab />
      default:
        return <ProfileTab />
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Admin Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center mr-4">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">Welcome back, {"Aliyu"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 ${activeTab === tab.id
                      ? 'bg-red-100 text-red-700 border border-red-200'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                      }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};