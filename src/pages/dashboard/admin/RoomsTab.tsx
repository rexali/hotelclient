import { useEffect, useState } from 'react';
import { Room } from '../../../types';
import RoomAdd from './RoomAdd';
import { RoomsList } from './RoomsList';
import { PlusCircle } from 'lucide-react';
import { useRooms } from '../../../hooks/useRooms';
import Pagination from '../../../components/common/Pagination';


type RoomsTabProps = {
    initialRooms?: Room[];
};

export function RoomsTab({ initialRooms = [] }: RoomsTabProps) {

    const [rooms, setRooms] = useState<Room[]>(initialRooms);
    const [open, setOpen] = useState<Boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    const handleAddRoom = (room: Room) => {
        setRooms(prev => [...prev, room]);
        setOpen(false);
    };

    const data = useRooms(currentPage) as any;

    useEffect(() => {
        setTotalPages(data?.roomCount);
        setRooms(data?.rooms)
    })

    if (open) {
        return (
            <div>
                <h3>Add New Room</h3>
                <RoomAdd handleRoomAdd={handleAddRoom} />
            </div>
        )
    }

    return (
        <div>
            <h2 className='flex justify-between'>Rooms <span onClick={() => setOpen(true)}>Add a room<PlusCircle /> </span></h2>
            {rooms?.length > 0 && <RoomsList initialRooms={[...rooms]} />}
            <div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /><br />
            </div>
        </div>
    );
}