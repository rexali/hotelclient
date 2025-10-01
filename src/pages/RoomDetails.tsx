import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { mockRooms } from '../data/mockData';
import RoomDetailsCard from '../components/rooms/RoomDetailsCard';
import { Room } from '../types';
import { getRoomAPI } from './api/getRoomAPI';

const RoomDetails: React.FC = () => {
  // If using react-router-dom v6+
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<Room>();
  const room = data;   //.find(r => r.id === id);

   useEffect(()=>{
     (async ()=>{
      setData(await getRoomAPI(id as unknown as number));
     })
   },[])

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
    </div>
  );
};

export default RoomDetails;