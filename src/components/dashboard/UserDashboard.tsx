import { Bell, Heart, Home, MessageCircle,User, Users } from "lucide-react";
import { useState } from "react";

export const UserDashboard = () => {
  
  const [activeTab, setActiveTab] = useState('profile');
  
  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'rooms', name: 'Rooms', icon: Home },
    { id: 'favorites', name: 'Favorite Rooms', icon: Heart },
    { id: 'messages', name: 'Messages', icon: MessageCircle },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    // { id: 'users', name: 'Registered Users', icon: Users },
  ];


    const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <div><h2 className="text-2xl font-bold text-gray-900 mb-6">Profile</h2></div>;
      case 'rooms':
        return <div><h2 className="text-2xl font-bold text-gray-900 mb-6">Rooms</h2></div>;
      case 'favorites':
        return <div><h2 className="text-2xl font-bold text-gray-900 mb-6">Favorites</h2></div>;
      // case 'users':
      //   return <div><h2 className="text-2xl font-bold text-gray-900 mb-6">Users</h2></div>;
      case 'notifications':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h2>
          </div>
        );

      case 'messages':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Messages</h2>
          </div>
        );
      default:
        return <div><h2 className="text-2xl font-bold text-gray-900 mb-6">Profile</h2></div>;
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
                <h1 className="text-2xl font-bold text-gray-900">User Dashboard</h1>
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
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                      activeTab === tab.id
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

}