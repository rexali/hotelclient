import { MessageCircle } from "lucide-react";
import { mockMessages, mockUsers } from "../../../data/mockData";

export const MessagesTab = () => (
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