import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Share2, MapPin, Users, Bed, Bath, Star, Phone, Check } from 'lucide-react';
import { Room } from '../types';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { handleShare } from '../utils/handleShare';
import { handleContact } from '../utils/handlePhoneCall';
import { addFavouriteRoomAPI } from './api/addFavouriteRoomAPI';
import { getRoomAPI } from './api/getRoomAPI';
import { makePaymentWithPopupAPI } from '../payment/makePaymentWithPopupAPI';
import { getRoomById } from '../mocks';

const RoomDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [room, setRoom] = useState<Room | null>(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [nights, setNights] = useState(1);

    // Fetch room data
    useEffect(() => {
        const fetchRoom = async () => {
            try {
                setLoading(true);
                const data = await getRoomAPI(parseInt(id || '0'));
                const _room = Object.keys(data ?? {}).length ? data : getRoomById(id as unknown as number);
                setRoom(_room);
            } catch (error) {
                console.error('Error fetching room:', error);
                toast.error('Failed to load room details');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchRoom();
        }
    }, [id]);

    // Handle favorite toggle
    const handleToggleFavorite = async () => {
        if (!user?.userId) {
            navigate('/auth');
            return;
        }

        try {
            const roomId = room?.id?.toString() || '';
            await addFavouriteRoomAPI({ roomId, userId: user.userId });
            setIsFavorite(!isFavorite);
            toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
        } catch (error) {
            console.error('Error updating favorite:', error);
            toast.error('Failed to update favorite');
        }
    };

    // Calculate total price
    const calculateTotalPrice = () => {
        return room ? room.price * nights : 0;
    };

    // Handle booking
    const handleBooking = async () => {
        if (!user?.userId) {
            navigate('/auth');
            return;
        }

        if (!checkInDate || !checkOutDate) {
            toast.error('Please select check-in and check-out dates');
            return;
        }

        try {
            const totalPrice = calculateTotalPrice();
            const roomId = room?.id?.toString() || '';
            await makePaymentWithPopupAPI({
                roomId,
                userId: user.userId,
                amount: totalPrice,
                email: user.email || ''
            });
        } catch (error) {
            console.error('Error processing booking:', error);
            toast.error('Failed to process booking');
        }
    };

    // Handle dates change
    const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCheckInDate(e.target.value);
        calculateNights(e.target.value, checkOutDate);
    };

    const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCheckOutDate(e.target.value);
        calculateNights(checkInDate, e.target.value);
    };

    const calculateNights = (checkIn: string, checkOut: string) => {
        if (checkIn && checkOut) {
            const checkInTime = new Date(checkIn).getTime();
            const checkOutTime = new Date(checkOut).getTime();
            const diff = checkOutTime - checkInTime;
            const calculatedNights = Math.ceil(diff / (1000 * 60 * 60 * 24));
            if (calculatedNights > 0) {
                setNights(calculatedNights);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!room) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
                <div className="text-3xl font-bold text-red-600 mb-4">Room Not Found</div>
                <p className="text-gray-600 mb-6 text-center">The room you're looking for doesn't exist or has been removed.</p>
                <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 transition-colors"
                >
                    ← Back
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Image Gallery Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            {/* Main Image */}
                            <div className="relative h-96 sm:h-[500px] bg-gray-200 overflow-hidden">
                                {room.photos && room.photos.length > 0 ? (
                                    <img
                                        crossOrigin='anonymous'
                                        src={room.photos[selectedImage]}
                                        alt={room.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full bg-gray-300">
                                        <span className="text-gray-600 text-lg">No image available</span>
                                    </div>
                                )}

                                {/* Favorite Button */}
                                <button
                                    onClick={handleToggleFavorite}
                                    className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110"
                                    title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                                >
                                    <Heart
                                        size={24}
                                        className={isFavorite ? 'text-red-600 fill-red-600' : 'text-gray-600'}
                                    />
                                </button>

                                {/* Availability Badge */}
                                <div className="absolute top-4 left-4">
                                    <span
                                        className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${room.availability
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                            }`}
                                    >
                                        {room.availability ? (
                                            <>
                                                <Check size={16} /> Available
                                            </>
                                        ) : (
                                            <>
                                                <span className="text-lg">✕</span> Unavailable
                                            </>
                                        )}
                                    </span>
                                </div>
                            </div>

                            {/* Thumbnail Gallery */}
                            {room.photos && room.photos.length > 1 && (
                                <div className="flex gap-2 p-4 overflow-x-auto bg-gray-100">
                                    {room.photos.map((photo, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedImage(idx)}
                                            className={`h-20 w-20 object-cover rounded transition-all flex-shrink-0 ${selectedImage === idx
                                                ? 'ring-2 ring-blue-600 opacity-100'
                                                : 'opacity-60 hover:opacity-80'
                                                }`}
                                        >
                                            <img src={photo} alt={`Room view ${idx + 1}`} className="w-full h-full object-cover rounded" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Room Details Info */}
                        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{room.name}</h1>

                            {/* Location */}
                            <div className="flex items-center gap-2 text-gray-600 mb-4">
                                <MapPin size={20} className="text-blue-600" />
                                <span className="text-lg">{room.location}</span>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-6 pb-6 border-b">
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={20}
                                            className={i < Math.floor(room.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                                        />
                                    ))}
                                </div>
                                <span className="ml-2 text-gray-700 font-medium">({room.rating.toFixed(1)} rating)</span>
                            </div>

                            {/* Room Features Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 pb-6 border-b">
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                    <span className="text-lg font-semibold text-blue-600 block capitalize">{room.type}</span>
                                    <p className="text-xs text-gray-600 mt-1">Room Type</p>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center justify-center gap-1">
                                        <Users size={20} className="text-blue-600" />
                                        <span className="text-lg font-semibold text-blue-600">{room.capacity}</span>
                                    </div>
                                    <p className="text-xs text-gray-600 mt-1">Guests</p>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center justify-center gap-1">
                                        <Bed size={20} className="text-blue-600" />
                                        <span className="text-lg font-semibold text-blue-600">{room.bedrooms}</span>
                                    </div>
                                    <p className="text-xs text-gray-600 mt-1">Bedrooms</p>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center justify-center gap-1">
                                        <Bath size={20} className="text-blue-600" />
                                        <span className="text-lg font-semibold text-blue-600">{room.bathrooms}</span>
                                    </div>
                                    <p className="text-xs text-gray-600 mt-1">Bathrooms</p>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-3">About this room</h2>
                                <p className="text-gray-600 leading-relaxed text-base">{room.description}</p>
                            </div>

                            {/* Amenities */}
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Amenities</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {room.amenities && room.amenities.map((amenity, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-lg">
                                            <Check size={20} className="text-green-600 flex-shrink-0" />
                                            <span className="text-sm sm:text-base">{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Agent Info Card */}
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                                <h3 className="font-bold text-gray-900 mb-2">Contact Agent</h3>
                                <p className="text-gray-700 font-semibold text-lg mb-3">{room.agentName}</p>
                                <button
                                    onClick={() => handleContact(room.agentPhone)}
                                    className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 transition-colors"
                                >
                                    <Phone size={18} />
                                    {room.agentPhone}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Booking Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
                            {/* Price Section */}
                            <div className="mb-6">
                                <p className="text-gray-600 text-sm font-medium">Price per night</p>
                                <p className="text-4xl font-bold text-blue-600 mt-1">
                                    ₦{room.price?.toLocaleString()}
                                </p>
                            </div>

                            {/* Date Selection */}
                            <div className="mb-6 pb-6 border-b">
                                <h3 className="font-bold text-gray-900 mb-4">Select Dates</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Check-in
                                        </label>
                                        <input
                                            type="date"
                                            value={checkInDate}
                                            onChange={handleCheckInChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Check-out
                                        </label>
                                        <input
                                            type="date"
                                            value={checkOutDate}
                                            onChange={handleCheckOutChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        />
                                    </div>
                                    {nights > 0 && (
                                        <div className="bg-blue-50 rounded-lg p-3">
                                            <p className="text-sm font-medium text-blue-900">
                                                {nights} night{nights > 1 ? 's' : ''}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Booking Summary */}
                            {nights > 0 && (
                                <div className="mb-6 pb-6 border-b space-y-3">
                                    <div className="flex justify-between text-gray-700">
                                        <span className="text-sm">₦{room.price?.toLocaleString()} × {nights} night{nights > 1 ? 's' : ''}</span>
                                        <span className="font-semibold">₦{calculateTotalPrice().toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-3 border-t">
                                        <span className="font-bold text-gray-900">Total</span>
                                        <span className="text-2xl font-bold text-blue-600">₦{calculateTotalPrice().toLocaleString()}</span>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <button
                                    onClick={handleBooking}
                                    disabled={!room.availability}
                                    className={`w-full py-3 rounded-lg font-bold text-white transition-all transform hover:scale-105 disabled:scale-100 ${room.availability
                                        ? 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
                                        : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                        }`}
                                >
                                    {room.availability ? 'Book Now' : 'Not Available'}
                                </button>
                                <button
                                    onClick={() => handleShare(room)}
                                    className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Share2 size={20} />
                                    Share
                                </button>
                            </div>

                            {/* Info Text */}
                            <p className="text-center text-xs text-gray-500 mt-4">
                                You won't be charged until your booking is confirmed
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetailPage;
