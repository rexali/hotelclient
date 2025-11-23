import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RoomDetailsCard from '../components/rooms/RoomDetailsCard';
import { getRoomAPI } from './api/getRoomAPI';
import { ReviewList } from './components/ReviewList';
import ReviewAdd from './components/ReviewAdd';
import { addFavouriteRoomAPI } from './api/addFavouriteRoomAPI';
import { toast } from 'sonner';
import { makePaymentAPI } from '../payment/makePaymentAPI';
import { useAuth } from '../context/AuthContext';
import { handleShare } from '../utils/handleShare';
import { handleViewLocation } from '../utils/handleViewLocation';
import { handleContact } from '../utils/handlePhoneCall';
import { makePaymentWithPopupAPI } from '../payment/makePaymentWithPopupAPI';

const RoomDetails: React.FC = () => {
  // If using react-router-dom v6+
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<any>({});
  const room = data;
  const {user} = useAuth()
  
const handleAddFavourite = async (roomId: any) => {
    if (user.userId) {
      let result = await addFavouriteRoomAPI({ roomId, userId: user?.userId });
      if (result) {
        toast(result)
      }
      // Redirect to login or show login modal
    } else {
      navigate("/auth")
    }

  };

  const handlePayment = async (roomId: any, roomPrice: any) => {
    // Redirect to payment page or open payment modal
    // await makePaymentAPI({ roomId, userId: user.userId, amount: roomPrice, email: user.email });
    await makePaymentWithPopupAPI({ roomId, userId: user.userId, amount: roomPrice, email: user.email });
  };


  useEffect(() => {
    (async () => {
      let room = await getRoomAPI(id as unknown as number);      
      setData(room);
    })();
  }, [id])

  if (!room) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-2xl font-bold text-red-600 mb-2">Room Not Found</div>
        <button
          onClick={() => navigate(-1)}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <RoomDetailsCard
        room={room}
        onFavorite={handleAddFavourite }
        onPayment={handlePayment}
        onShare={handleShare}
        onViewLocation={handleViewLocation }
        onContact={handleContact}
        isFavorite={room?.likes?.includes(user?.userId)}
      /><br />
      {room?.Reviews && <ReviewList reviews={[...room?.Reviews]} />}<br />
      {/* TO Do: Check if user signin and booked it */}
      <ReviewAdd RoomId={room.id} />
    </div>
  );
};

export default RoomDetails;