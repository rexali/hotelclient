import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RoomDetailsCard from '../components/rooms/RoomDetailsCard';
// import { Room } from '../types';
import { getRoomAPI } from './api/getRoomAPI';
import { ReviewList } from './components/ReviewList';
import ReviewAdd from './components/ReviewAdd';

const RoomDetails: React.FC = () => {
  // If using react-router-dom v6+
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<any>({});
  const room = data;

  useEffect(() => {
    (async () => {
      let room = await getRoomAPI(id as unknown as number);
      console.log(room);

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
    <div className="max-w-3xl mx-auto py-8 px-4">
      <RoomDetailsCard room={room} />
      {room?.Reviews && <ReviewList reviews={[...room?.Reviews]} />}<br /><br />
      {/* TO Do: Check if user signin and booked it */}
      <ReviewAdd RoomId={room.id} />
    </div>
  );
};

export default RoomDetails;