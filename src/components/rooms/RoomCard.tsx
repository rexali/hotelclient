import React from 'react';
import { Heart, Share2, MapPin, Users, Phone, CreditCard, Star } from 'lucide-react';
import { Room } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { BASE_URL_LOCAL } from '../../constants/constants';
import { Link } from 'react-router-dom';

interface RoomCardProps {
  room: Room;
  onFavorite?: (roomId: string) => Promise<any>;
  onShare?: (room: Room) => void;
  onContact?: (phone: string) => string;
  onViewLocation?: (location: string) => string;
  onPayment?: (roomId: string, roomPrice: number) => Promise<void>;
  isFavorite?: boolean;
}

const RoomCard: React.FC<RoomCardProps> = ({
  room,
  onFavorite,
  onShare,
  onContact,
  onViewLocation,
  onPayment,
  isFavorite = false
}) => {

  const { user } = useAuth();

  const photos = [
    'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
    'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg'
  ];

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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image Gallery */}
      <div className="relative h-48 overflow-hidden">
        {room?.photos?.length ? (
          <Link to={'/rooms/' + room.id}>
            <img
              src={BASE_URL_LOCAL + "/uploads/" + room?.photos[0]}
              alt={room?.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              crossOrigin='use-credentials'
            />
          </Link>
        ) : (
          <Link to={'/rooms/' + room.id}>
            <img
              src={photos[0]}
              alt={room?.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            // crossOrigin='anonymous'
            />
          </Link>
        )
        }
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getAvailabilityColor(room?.availability)}`}>
            {room?.availability === true ? "available" : "occupied"}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex space-x-2">
          {room?.featured && (
            <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full">
              Featured
            </span>
          )}
          {/* {room?.popular && (
            <span className="px-2 py-1 bg-purple-500 text-white text-xs rounded-full">
              Popular
            </span>
          )} */}
        </div>
        <button
          onClick={() => onFavorite?.(room?.id)}
          className={`absolute bottom-4 right-4 p-2 rounded-full transition-colors duration-200 ${isFavorite
            ? 'bg-red-500 text-white'
            : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
            }`}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {room?.name}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">{room?.rating}</span>
          </div>
        </div>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{room?.location}</span>
        </div>

        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
          <span>{room?.bedrooms} bed{room?.bedrooms !== 1 ? 's' : ''}</span>
          <span>•</span>
          <span>{room?.bathrooms} bath{room?.bathrooms !== 1 ? 's' : ''}</span>
          <span>•</span>
          <span className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {room?.capacity}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {room?.amenities.slice(0, 3).map((amenity, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
            >
              {amenity}
            </span>
          ))}
          {room?.amenities.length > 3 && (
            <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md">
              +{room?.amenities.length - 3} more
            </span>
          )}
        </div>

        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(room?.price)}
            </span>
            <span className="text-gray-600 text-sm">/semester</span>
          </div>
          <span className="text-sm text-gray-600">
            Room #{room?.id}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex space-x-1">
            <button
              onClick={() => onShare?.(room)}
              className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              <Share2 className="h-4 w-4" />
              {/* <span className="text-sm">Share</span> */}
            </button>
            <button
              // onClick={() => onViewLocation?.(room.location)}
              className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              <Link to={onViewLocation?.(room.location) as string} target={"_blank"}>
                <MapPin className="h-4 w-4" />
              </Link>
              {/* <span className="text-sm">Map</span> */}
            </button>
          </div>

          <div className="flex space-x-1">
            <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
              <Link to={"tel:" + onContact?.(room.agentPhone)}>
                <Phone className="h-4 w-4" />
                {/* <span className="text-sm">Contact</span> */}
              </Link>
            </button>
            {user?.userId && room?.availability !== true && (
              <button
                onClick={() => onPayment?.(room.id, room.price)}
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
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Agent: {room?.agentName}</span>
            <span>{room?.agentPhone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;