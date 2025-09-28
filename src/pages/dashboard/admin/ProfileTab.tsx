import { Edit, Save, X, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

const ProfileTab = () => {

    const { user, logout }: { user: any, logout: any } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [editedAdmin, setEditedAdmin] = useState<any>(user || {});

    const handleSaveProfile = () => {
        setIsEditing(false);
    };

    return (<div className="max-w-2xl">
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
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
}

export default ProfileTab