import { useEffect, useState } from 'react';
import { Hostel } from '../../../types';
import { HostelsList } from './HostelsList';
import { PlusCircle } from 'lucide-react';
import Pagination from '../../../components/common/Pagination';
import HostelAdd from './HostelAdd';
import { getHostelsAPI } from '../../api/getHostelsAPI';

export function HostelsTab() {
    const [hostels, setHostels] = useState<any>([]);
    const [open, setOpen] = useState<Boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [key, setKey] = useState(0);

    const handleSetKey = () => {
        setKey(prev => prev + 1);
    }

    const handleSetOpen=(val:boolean)=>{
          setOpen(val);
          handleSetKey();
    }

    useEffect(() => {
        (async () => {
            let data = await getHostelsAPI(currentPage);
            setTotalPages(data?.roomCount ?? 2);
            setHostels(data?.hostels)
        })()
    }, [currentPage,key])

    if (open) {
        return (
            <div>
                <h3>New Hostel</h3>
                <HostelAdd setOpenHostel={handleSetOpen} />
            </div>
        )
    }

    return (
        <div key={key}>
            <h2 className='flex justify-between'>Hostels<span onClick={() => setOpen(true)}><PlusCircle /></span></h2>
            {hostels?.length > 0 && <HostelsList  initialHostels={[...hostels]} />}
            <div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /><br />
            </div>
        </div>
    );
}