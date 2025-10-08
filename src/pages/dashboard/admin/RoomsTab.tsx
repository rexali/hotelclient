import { useEffect, useState } from 'react';
import { Room } from '../../../types';
import RoomAdd from './RoomAdd';
import { RoomsList } from './RoomsList';
import { PlusCircle } from 'lucide-react';
import { useRooms } from '../../../hooks/useRooms';
import Pagination from '../../../components/common/Pagination';
import { getRoomsAPI } from '../../api/getRoomsAPI';


type RoomsTabProps = {
    initialRooms?: Room[];
};

export function RoomsTab({ initialRooms = [] }: RoomsTabProps) {

    const [rooms, setRooms] = useState<Room[]>(initialRooms);
    const [open, setOpen] = useState<Boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [key, setKey] = useState(0);

    const handleSetKey = () => {
        setKey(prev => prev + 1);
    }

    const handleSetOpen = (val: boolean) => {
        setOpen(val);
        handleSetKey();
    }

    // const handleAddRoom = (room: Room) => {
    //     setRooms(prev => [...prev, {...room}]);
    //     setOpen(false);
    // };
    
    useEffect(() => {
        (async () => {
            let data = await getRoomsAPI(currentPage);
            setTotalPages(data?.roomCount);
            setRooms(data?.rooms)
        })();
    }, [key])


    if (open) {
        return (
            <div>
                <h3>New Room</h3>
                <RoomAdd setAdd={handleSetOpen} />
            </div>
        )
    }

    return (
        <div>
            <h2 className='flex justify-between'>Rooms <span onClick={() => setOpen(true)}><PlusCircle /> </span></h2>
            {rooms?.length > 0 && <RoomsList initialRooms={[...rooms]} />}
            <div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /><br />
            </div>
        </div>
    );
}