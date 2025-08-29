import { mockUsers, mockRooms } from "../../../data/mockData";
import RoomCard from "../../UI/RoomCard";

// List of all favorite rooms for all users (no duplicates)
  const FavouritesTab = () => {
    // Get all favorite room IDs from all users
    const favRoomIds = Array.from(new Set(mockUsers.flatMap(u => u.favorites)));
    const favRooms = favRoomIds.map(id => mockRooms.find(r => r.id === id)).filter(Boolean);
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Favourite Rooms</h2>
        {favRooms.length === 0 && <div className="text-gray-500 p-6 text-center">No favourite rooms found.</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favRooms.map(room => room && <RoomCard key={room.id} room={room} />)}
        </div>
      </div>
    );
  }
