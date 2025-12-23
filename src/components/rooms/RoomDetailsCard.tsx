import React, { ChangeEvent, useState } from 'react';
import { Heart, Share2, MapPin, Users, Phone, CreditCard, Star } from 'lucide-react';
import { Room } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { BASE_URL_LOCAL } from '../../constants/constants';
import { Link } from 'react-router-dom';

interface RoomDetailsProps {
  room: any;
  onFavorite?: (roomId: string) => Promise<any>;
  onShare?: (room: Room) => void;
  onContact?: (phone: string) => string;
  onViewLocation?: (location: string) => string;
  onPayment?: (roomId: string, roomPrice: number) => Promise<void>;
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
  const [checkInCheckOutForm, setCheckInCheckOutForm] = useState(false);
  const [checkInCheckOutData, setCheckInCheckOutData] = useState({
    checkIn: '',
    checkOut: '',
    roomId: '',
    roomPrice: 0,
    userId: user?.userId
  });

  async function handleSend(): Promise<void> {
    window.localStorage.setItem('checkoutData', JSON.stringify(checkInCheckOutData));
    setCheckInCheckOutForm(false);
    await handleContineCheckOut(checkInCheckOutData.roomId, checkInCheckOutData.roomPrice);
    setTimeout(() => {
      setCheckInCheckOutData(prev => ({
        ...prev,
        roomPrice: 0,
        checkIn: '',
        checkOut: '',
        roomId: '',
      }))
    }, 3000);

  }

  async function handleContineCheckOut(roomId: string, roomPrice: number): Promise<void> {
    console.log(JSON.parse(window.localStorage.getItem('checkoutData') || '{}'));

    await onPayment?.(roomId, roomPrice);
  }

  function handleChangeCheckInCheckOut(event: ChangeEvent<HTMLInputElement>, roomId: string, roomPrice: number): void {
    const { name, value } = event.target;
    setCheckInCheckOutData(prev => ({
      ...prev,
      roomId,
      roomPrice,
      [name]: value
    }))

  }

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
          {room?.photos?.map((img: any, idx: any) => (
            <img
              key={img + idx}
              src={BASE_URL_LOCAL + "/uploads/" + img}
              alt={room?.name + ' image'}
              className="h-full min-w-[70%] md:min-w-[40%] object-cover rounded-lg border border-gray-100 shadow-sm hover:scale-105 transition-transform duration-300"
              crossOrigin='anonymous'
            />
          ))}
        </div>
        <div className="absolute top-4 left-4 z-10">
          <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getAvailabilityColor(room?.availability)}`}>
            {room?.availability === true ? "available" : "occupied"}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex space-x-2 z-10">
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
          className={`absolute bottom-4 right-4 p-2 rounded-full transition-colors duration-200 z-10 ${isFavorite}
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
            {room?.name}
          </h3>
          <div className="flex items-center space-x-1">
            {/* <Star className="h-4 w-4 text-yellow-400 fill-current" /> */}
            {[...Array(Math.ceil(room?.rating??1))].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < room.rating ? "text-yellow-400" : "text-gray-300"}`}
                fill={i < room?.rating ? "#facc15" : "none"}
              />
            ))}
            <span className="text-sm md:text-base text-gray-600">{room?.rating}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 mb-3 gap-1">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm md:text-base">{room?.location}</span>
        </div>

        <div className="flex flex-wrap gap-4 mb-4 text-sm md:text-base text-gray-600">
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
          {room?.amenities?.slice(0, 3)?.map((amenity: any, i: any) => (
            <span
              key={amenity + i}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
            >
              {amenity}
            </span>
          ))}
          {room?.amenities?.length > 3 && (
            <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md">
              +{room?.amenities.length - 3} more
            </span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
          <div>
            <span className="text-2xl md:text-3xl font-bold text-blue-600">
              {formatPrice(room?.price)}
            </span>
            <span className="text-gray-600 text-sm md:text-base">/night</span>
          </div>
          <span className="text-sm md:text-base text-gray-600">
            Room #{room?.id}
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
              className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              <Link to={onViewLocation?.(room?.location) || ""} target={"_blank"}>
                <MapPin className="h-4 w-4" />
              </Link>
            </button>
          </div>

          <div className="flex space-x-1">
            <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
              <Link to={"tel:" + onContact?.(room?.agentPhone) || ""}>
                <Phone className="h-4 w-4" />
                {/* <span className="text-sm">Contact</span> */}
              </Link>
            </button>
            {room?.availability === true && (
              <button
                // onClick={() => onPayment?.(room.id, room.price)}
                onClick={() => {
                  setCheckInCheckOutForm(true);
                }}
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
            <span>Agent: {room?.agentName}</span>
            {/* <span>{room?.agentPhone}</span> */}
            <Link to={'sms://' + room?.agentPhone}>SMS: {room?.agentPhone?.substr(1, room?.agentPhone?.length - 3)}..</Link>
          </div>
        </div>
      </div>
      {/* Contact Form Modal */}
      {checkInCheckOutForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Enter Check in and Check date?</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check in</label>
              <input
                type="date"
                name="checkIn"
                onChange={(e) => handleChangeCheckInCheckOut(e, room.id, room.price)}
                value={checkInCheckOutData.checkIn}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check out</label>
              <input
                type="date"
                name="checkOut"
                onChange={(e) => handleChangeCheckInCheckOut(e, room.id, room.price)}
                value={checkInCheckOutData.checkOut}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setCheckInCheckOutForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Continue to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomDetails;