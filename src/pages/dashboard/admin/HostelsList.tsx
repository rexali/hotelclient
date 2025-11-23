import { useState } from 'react';
import { Hostel } from '../../../types';
import { Delete, Eye, Pencil, Plus } from 'lucide-react';
import HostelEdit from './HostelEdit';
import { Link } from 'react-router-dom';
import RoomAdd from './RoomAdd';
import { removeHostelAPI } from './api/removeHostelAPI';
import HostelAdd from './HostelAdd';
import { toast } from 'sonner';

type HostelsTabProps = {
    initialHostels: Hostel[];
};

export function HostelsList({ initialHostels = [] }: HostelsTabProps) {

    const [hostels, setHostels] = useState<Hostel[]>(initialHostels);
    const [edit, setEdit] = useState(false);
    const [openRoom, setOpenRoom] = useState(false);
    const [hostelId, setHostelId] = useState<any>();
    const [add, setAdd] = useState<Boolean>(false);


    const handleEditHostel = (hostelId: number | undefined, edit: boolean) => {
        setHostelId(hostelId);
        setEdit(edit)
    }

    function addHostelRoom(id: number | undefined): void {
        setHostelId(id)
        setOpenRoom(true)
    }

    const handleRemoveHostel = async (id: number | undefined) => {
        if (window.confirm("Want to delete this hostel?")) {
           let result =  await removeHostelAPI(id as number);
           if (result) {
            toast("Hostel removed successfully");
           }else{
            toast("Hostel removal failed");
           }
        }
    }

    if (edit) {
        return <HostelEdit hostelId={hostelId} setEdit={setEdit} />
    }

    if (openRoom) {
        return <RoomAdd hostelId={hostelId} setAdd={setOpenRoom} />
    }

     if (add) {
        return <HostelAdd setOpenHostel={setAdd} />
    }


    return (
        <div className="overflow-x-auto">
            <table className="w-full table-auto">
                <thead>
                    <tr>
                        <th className="text-left">Name</th>
                        <th className="text-left">phone</th>
                        <th className="text-left">email</th>
                        <th className="text-left">state</th>
                        <th className="text-center" colSpan={4}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        hostels.map((hostel:any,i:any) => (
                            <tr key={i}>
                                <td className="border px-4 py-2"><strong>{hostel.name}</strong></td>
                                <td className="border px-4 py-2">{hostel.phone}</td>
                                <td className="border px-4 py-2">{hostel.email}</td>
                                <td className="border px-4 py-2">{hostel.state}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex space-x-3">
                                        <button className="text-blue-600 hover:text-blue-900">
                                            <Link to={"/hotels/" + hostel?.id}  target='_blank'>
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                        </button>
                                        <button className="text-red-600 hover:text-red-900">
                                            <Pencil className="h-4 w-4" onClick={() => handleEditHostel(hostel.id, true)} />
                                        </button>
                                        <button className="text-red-600 hover:text-red-900">
                                            <Delete className="h-4 w-4" onClick={() => handleRemoveHostel(hostel.id)} />
                                        </button>
                                        <button className="text-red-600 hover:text-red-900">
                                            <Plus className="h-4 w-4" onClick={() => addHostelRoom(hostel.id)} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}