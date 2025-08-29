import { Bell } from "lucide-react";
import { mockNotifications } from "../../../data/mockData";

export const NotificationsTab = () => (
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