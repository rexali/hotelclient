import { useState } from 'react';
import { Room } from '../../../types';
import { Delete, Edit, View } from 'lucide-react';
import RoomEdit from './RoomEdit';
import { useNavigate } from 'react-router-dom';
import { removeRoomAPI } from '../../../api/rooms/removeRoomAPI';



type RoomsTabProps = {
    initialRooms: Room[];
};

export function RoomsList({ initialRooms = [] }: RoomsTabProps) {

    const [rooms, setRooms] = useState<Room[]>(initialRooms);
    const [edit, setEdit] = useState(false);
    const [roomId, setRoomId] = useState<any>();
    const navigate = useNavigate();


    const handleRoomAdd = (room: Room) => {
        setRooms(prev => [...prev, room]);
        setEdit(false);
    };

    const handleEditRoom = (roomId: string, edit: boolean) => {
        setRoomId(roomId);
        setEdit(edit)
    }

    const handleRemoveRoom = async (id: string) => {
        if (window.confirm("Want to delete this room?")) {
            await removeRoomAPI(id)
        }
    }

    if (edit) {
        return <RoomEdit handleRoomAdd={handleRoomAdd} roomId={roomId} />
    }


    return (
        <div className="overflow-x-auto">
            <table className="w-full table-auto">
                <thead>
                    <tr>
                        <th className="text-left">Nome</th>
                        <th className="text-left">Bedrooms</th>
                        <th className="text-left">Price</th>
                        <th className="text-left">Location</th>
                        <th className="text-center" colSpan={3}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        rooms.map((room) => (
                            <tr key={room.id}>
                                <td className="border px-4 py-2"><strong>{room.name}</strong></td>
                                <td className="border px-4 py-2">{room.type}</td>
                                <td className="border px-4 py-2">{room.price}</td>
                                <td className="border px-4 py-2">{room.location}</td>
                                <td className="border px-4 py-2"><View onClick={() => navigate("/rooms/" + room.id)} /></td>
                                <td className="border px-4 py-2"><Edit onClick={() => handleEditRoom(room.id, true)} /></td>
                                <td className="border px-4 py-2"><Delete onClick={() => handleRemoveRoom(room.id)} /></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}