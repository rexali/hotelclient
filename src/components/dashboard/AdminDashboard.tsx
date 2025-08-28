import { BarChart3, Bell, Heart, Home, MessageCircle, TrendingUp, User, Users, DollarSign, Edit, Save, X, Eye, Trash2, CreditCard } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { mockRooms, mockUsers, mockBookings, mockNotifications, mockMessages } from "../../data/mockData";
const MessagesList = () => (
  <div>
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Messages</h2>
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {mockMessages.length === 0 && (
          <li className="p-6 text-center text-gray-500">No messages found.</li>
        )}
        {mockMessages.slice().sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).map((msg) => {
          const sender = mockUsers.find(u => u.id === msg.senderId);
          const receiver = mockUsers.find(u => u.id === msg.receiverId);
          return (
            <li key={msg.id} className={`flex items-start px-6 py-4 ${msg.read ? 'bg-gray-50' : 'bg-blue-50'}`}>
              <div className="flex-shrink-0 mt-1">
                <MessageCircle className="h-6 w-6 text-blue-500" />
              </div>
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">{msg.subject}</span>
                  <span className="text-xs text-gray-400">{msg.createdAt instanceof Date ? msg.createdAt.toLocaleDateString() : new Date(msg.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-700 mt-1 text-sm">{msg.content}</p>
                <div className="mt-2 text-xs text-gray-500">From: {sender?.name || sender?.fullName || msg.senderId} | To: {receiver?.name || receiver?.fullName || msg.receiverId}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  </div>
);
const NotificationsList = () => (
  <div>
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h2>
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {mockNotifications.length === 0 && (
          <li className="p-6 text-center text-gray-500">No notifications found.</li>
        )}
        {mockNotifications.slice().sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).map((notification) => (
          <li key={notification.id} className={`flex items-start px-6 py-4 ${notification.read ? 'bg-gray-50' : 'bg-yellow-50'}`}>
            <div className="flex-shrink-0 mt-1">
              <Bell className="h-6 w-6 text-red-500" />
            </div>
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">{notification.title}</span>
                <span className="text-xs text-gray-400">{notification.createdAt instanceof Date ? notification.createdAt.toLocaleDateString() : new Date(notification.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-700 mt-1 text-sm">{notification.message}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
// Helper to get user and room info for a booking
const getUserById = (id: string) => mockUsers.find(u => u.id === id);
const getRoomById = (id: string) => mockRooms.find(r => r.id === id);

const BookingHistoryList = () => (
  <div>
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Room Transactions</h2>
    <div className="bg-white rounded-lg shadow-md overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">User</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Room</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Check-In</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Check-Out</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total Price</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Booked On</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {mockBookings.slice().sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).map((booking) => {
            const user = getUserById(booking.userId);
            const room = getRoomById(booking.roomId);
            return (
              <tr key={booking.id}>
                <td className="px-4 py-2 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      className="h-8 w-8 rounded-full mr-2"
                      src={user?.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'}
                      alt={user?.fullName || user?.name}
                    />
                    <span className="text-sm font-medium text-gray-900">{user?.fullName || user?.name}</span>
                  </div>
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{room?.name}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{booking.checkIn instanceof Date ? booking.checkIn.toLocaleDateString() : new Date(booking.checkIn).toLocaleDateString()}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{booking.checkOut instanceof Date ? booking.checkOut.toLocaleDateString() : new Date(booking.checkOut).toLocaleDateString()}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-green-700">₦{booking.totalPrice.toLocaleString()}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm capitalize">{booking.status}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm capitalize">{booking.paymentStatus}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{booking.createdAt instanceof Date ? booking.createdAt.toLocaleDateString() : new Date(booking.createdAt).toLocaleDateString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {mockBookings.length === 0 && (
        <div className="p-6 text-center text-gray-500">No booking transactions found.</div>
      )}
    </div>
  </div>
);
import RoomCard from "../UI/RoomCard";
import Rooms from "../../pages/Rooms";

export const AdminDashboard = () => {
  const { user, logout }: { user: any, logout: any } = useAuth();

  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editedAdmin, setEditedAdmin] = useState<any>(user || {});

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'rooms', name: 'Rooms', icon: Home },
    { id: 'reports', name: 'Reports', icon: BarChart3 },
    { id: 'analysis', name: 'Analysis', icon: TrendingUp },
    { id: 'favorites', name: 'Favorites', icon: Heart },
    { id: 'messages', name: 'Messages', icon: MessageCircle },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'bookings', name: 'Bookings', icon: DollarSign },
  ];


  // List of all favorite rooms for all users (no duplicates)
  const FavouritesTab = () => {
    // Get all favorite room IDs from all users
    const favRoomIds = Array.from(new Set(mockUsers.flatMap(u => u.favorites)));
    const favRooms = favRoomIds.map(id => mockRooms.find(r => r.id === id)).filter(Boolean);
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Favourite Rooms</h2>
        {favRooms.length === 0 && <div className="text-gray-500 p-6 text-center">No favourite rooms found.</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favRooms.map(room => room && <RoomCard key={room.id} room={room} />)}
        </div>
      </div>
    );
  }


  const UsersTab = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Registered Users</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Favorites
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'}
                      alt={user.fullName}
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                      <div className="text-sm text-gray-500">{user.phone}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.favorites.length}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );


  const ProfileTab = () => (
    <div className="max-w-2xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Admin Profile</h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleSaveProfile}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditedAdmin(user || {});
                }}
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center mr-6">
            <User className="h-10 w-10 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{user?.fullName}</h3>
            <p className="text-gray-600 capitalize">{user?.role?.replace('-', ' ')}</p>
            <p className="text-sm text-gray-500">User since {new Date(user?.createdAt || '').toLocaleDateString()}</p>
          </div>
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedAdmin.fullName || ''}
                  onChange={(e) => setEditedAdmin({ ...editedAdmin, fullName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="py-2 text-gray-900">{user?.fullName || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <p className="py-2 text-gray-900">{user?.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editedAdmin.phone || ''}
                  onChange={(e) => setEditedAdmin({ ...editedAdmin, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="py-2 text-gray-900">{user?.phone || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <p className="py-2 text-gray-900 capitalize">{user?.role?.replace('-', ' ')}</p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedAdmin?.address || ''}
                  onChange={(e) => setEditedAdmin({ ...editedAdmin, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="py-2 text-gray-900">{user?.address || 'Not provided'}</p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );


  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div>
            {/* <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile</h2> */}
            <ProfileTab />
          </div>
        );
      case 'rooms':
        return (<div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Rooms</h2>
          <Rooms />
        </div>
        );
      case 'bookings':
        return (
          <div>
            <BookingHistoryList />
          </div>
        );
      case 'favorites':
        return (
          <div>
            <FavouritesTab />
          </div>
        );
      case 'notifications':
        return <NotificationsList />;

      case 'messages':
        return <MessagesList />;
      case 'users':
        return (
          <div>
            {/* <h2 className="text-2xl font-bold text-gray-900 mb-6">Users</h2> */}
            <UsersTab />
          </div>
        );
      case 'reports': {
        // Room stats
        const totalRooms = mockRooms.length;
        const availableRooms = mockRooms.filter(r => r.availability === 'available').length;
        const occupiedRooms = mockRooms.filter(r => r.availability === 'occupied').length;
        const avgPrice = totalRooms > 0 ? Math.round(mockRooms.reduce((sum, r) => sum + r.price, 0) / totalRooms) : 0;
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Room Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-3xl font-bold text-red-600">{totalRooms}</div>
                <div className="text-gray-700 mt-2">Total Rooms</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-3xl font-bold text-green-600">{availableRooms}</div>
                <div className="text-gray-700 mt-2">Available</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-3xl font-bold text-yellow-600">{occupiedRooms}</div>
                <div className="text-gray-700 mt-2">Occupied</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-3xl font-bold text-blue-600">₦{avgPrice.toLocaleString()}</div>
                <div className="text-gray-700 mt-2">Avg. Price</div>
              </div>
            </div>
            <div className="text-center py-12">
              <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Reports and analytics dashboard coming soon...</p>
            </div>
          </div>
        );
      }
      case 'analysis': {
        // Room type distribution
        const typeCounts = mockRooms.reduce((acc, r) => {
          acc[r.type] = (acc[r.type] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        // Amenities frequency
        const amenityCounts = mockRooms.flatMap(r => r.amenities).reduce((acc, a) => {
          acc[a] = (acc[a] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        const topAmenities = Object.entries(amenityCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Room Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Room Type Distribution</h3>
                <ul>
                  {Object.entries(typeCounts).map(([type, count]) => (
                    <li key={type} className="flex justify-between py-1">
                      <span className="capitalize">{type}</span>
                      <span className="font-bold">{count}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Top Amenities</h3>
                <ul>
                  {topAmenities.map(([amenity, count]) => (
                    <li key={amenity} className="flex justify-between py-1">
                      <span>{amenity}</span>
                      <span className="font-bold">{count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="text-center py-12">
              <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Market analysis tools coming soon...</p>
            </div>
          </div>
        );
      }
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