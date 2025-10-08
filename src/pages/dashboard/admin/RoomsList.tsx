import { useState } from 'react';
import { Room } from '../../../types';
import { Delete, Edit, View } from 'lucide-react';
import RoomEdit from './RoomEdit';
import { Link } from 'react-router-dom';
import { removeRoomAPI } from '../../../api/rooms/removeRoomAPI';
import { toast } from 'sonner';



type RoomsTabProps = {
    initialRooms: Room[];
};

export function RoomsList({ initialRooms = [] }: RoomsTabProps) {

    const [rooms,] = useState<Room[]>(initialRooms);
    const [edit, setEdit] = useState(false);
    const [roomId, setRoomId] = useState<any>();

    const handleEditRoom = (roomId: string, edit: boolean) => {
        setRoomId(roomId);
        setEdit(edit)
    }

    const handleRemoveRoom = async (id: string) => {
        if (window.confirm("Want to delete this room?")) {
            let result = await removeRoomAPI(id as unknown as number);
            if (result) {
                toast("Room removal success");
            } else {
                toast("Room removal failed");
            }
        }
    }

    if (edit) {
        return <RoomEdit roomId={roomId} setEdit={setEdit} />
    }


    return (
        <div className="overflow-x-auto">
            <table className="w-full table-auto">
                <thead>
                    <tr>
                        <th className="text-left">Name</th>
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
                                <td className="border px-4 py-2"><Link to={"/rooms/" + room.id} target='parent'><View /></Link></td>
                                <td className="border px-4 py-2"><button onClick={() => handleEditRoom(room.id, true)}><Edit /></button></td>
                                <td className="border px-4 py-2"><button onClick={() => handleRemoveRoom(room.id)}><Delete /></button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}