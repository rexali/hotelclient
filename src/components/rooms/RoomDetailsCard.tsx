import React from 'react';
import { Heart, Share2, MapPin, Users, Phone, CreditCard, Star } from 'lucide-react';
import { Room } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface RoomDetailsProps {
  room: Room;
  onFavorite?: (roomId: string) => void;
  onShare?: (room: Room) => void;
  onContact?: (room: Room) => void;
  onViewLocation?: (room: Room) => void;
  onPayment?: (room: Room) => void;
  isFavorite?: boolean;
}

const RoomDetails: React.FC<RoomDetailsProps> = ({
  room,
  onFavorite,
  onShare,
  onContact,
  onViewLocation,
  onPayment,
  isFavorite = false
}) => {

  const { user } = useAuth();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getAvailabilityColor = (availability: boolean) => {
    switch (availability) {
      case true:
        return 'bg-green-100 text-green-800';
      case false: // occupied
        return 'bg-red-100 text-red-800';
      // case false: // maintenance
      //   return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 max-w-2xl mx-auto my-4">
      {/* Responsive Image Gallery */}
      <div className="relative w-full">
        <div className="flex overflow-x-auto gap-2 h-56 md:h-72">
          {room.images.map((img, idx) => (
            <img
              key={img + idx}
              src={img}
              alt={room.name + ' image'}
              className="h-full min-w-[70%] md:min-w-[40%] object-cover rounded-lg border border-gray-100 shadow-sm hover:scale-105 transition-transform duration-300"
            />
          ))}
        </div>
        <div className="absolute top-4 left-4 z-10">
          <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getAvailabilityColor(room.availability)}`}>
            {room.availability === true ? "available" : "occupied"}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex space-x-2 z-10">
          {room.featured && (
            <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full">
              Featured
            </span>
          )}
          {/* {room.popular && (
            <span className="px-2 py-1 bg-purple-500 text-white text-xs rounded-full">
              Popular
            </span>
          )} */}
        </div>
        <button
          onClick={() => onFavorite?.(room.id)}
          className={`absolute bottom-4 right-4 p-2 rounded-full transition-colors duration-200 z-10 ${isFavorite
            ? 'bg-red-500 text-white'
            : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
            }`}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3 gap-2">
          <h3 className="text-lg md:text-2xl font-semibold text-gray-900 line-clamp-2">
            {room.name}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm md:text-base text-gray-600">{room?.rating}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 mb-3 gap-1">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm md:text-base">{room.location}</span>
        </div>

        <div className="flex flex-wrap gap-4 mb-4 text-sm md:text-base text-gray-600">
          <span>{room.bedrooms} bed{room.bedrooms !== 1 ? 's' : ''}</span>
          <span>•</span>
          <span>{room.bathrooms} bath{room.bathrooms !== 1 ? 's' : ''}</span>
          <span>•</span>
          <span className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {room.capacity}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {room.amenities.slice(0, 3).map((amenity) => (
            <span
              key={amenity}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
            >
              {amenity}
            </span>
          ))}
          {room.amenities.length > 3 && (
            <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md">
              +{room.amenities.length - 3} more
            </span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
          <div>
            <span className="text-2xl md:text-3xl font-bold text-blue-600">
              {formatPrice(room.price)}
            </span>
            <span className="text-gray-600 text-sm md:text-base">/semester</span>
          </div>
          <span className="text-sm md:text-base text-gray-600">
            Room #{room.id}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="flex space-x-1">
            <button
              onClick={() => onShare?.(room)}
              className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              <Share2 className="h-4 w-4" />
              <span className="text-sm">Share</span>
            </button>
            <button
              onClick={() => onViewLocation?.(room)}
              className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              <MapPin className="h-4 w-4" />
              <span className="text-sm">Map</span>
            </button>
          </div>

          <div className="flex space-x-1">
            <button
              onClick={() => onContact?.(room)}
              className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <Phone className="h-4 w-4" />
              <span className="text-sm">Contact</span>
            </button>
            {user && room.availability === true && (
              <button
                onClick={() => onPayment?.(room)}
                className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <CreditCard className="h-4 w-4" />
                <span className="text-sm">Book</span>
              </button>
            )}
          </div>
        </div>

        {/* Agent Info */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm md:text-base text-gray-600 gap-2">
            <span>Agent: {room.agentName}</span>
            <span>{room.agentPhone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;