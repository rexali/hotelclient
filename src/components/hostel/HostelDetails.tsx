import React, { useEffect, useState } from "react";
import { getHostelAPI } from "../../pages/dashboard/admin/api/getHostelAPI";
import { useParams } from "react-router-dom";
import RoomCard from "../rooms/RoomCard";
import { Grid, List } from "lucide-react";
import { toast } from "sonner";
import { addFavouriteRoomAPI } from "../../pages/api/addFavouriteRoomAPI";
import { makePaymentAPI } from "../../payment/makePaymentAPI";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { handleViewLocation } from "../../utils/handleViewLocation";
import { handleShare } from "../../utils/handleShare";
import { handleContact } from "../../utils/handlePhoneCall";

const HostelDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [hostel, setHostel] = useState<any>({});
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const { user } = useAuth();
    const navigate = useNavigate();

    const handlePayment = async (roomId: any, roomPrice: any) => {
        await makePaymentAPI({ roomId, userId: user.id, amount: roomPrice, email: user?.email });
    };

    const handleAddFavourite = async (roomId: any) => {
        if (user?.userId) {
            let result = await addFavouriteRoomAPI({ roomId, userId: user.id });
            if (result) {
                toast(result)
            }
        } else {
            navigate("/auth")
        }
    };

    useEffect(() => {
        (async () => {
            let { hostel } = await getHostelAPI(id as unknown as number);
            console.log(hostel);
            setHostel(hostel);
        })();
    }, [id]);

    // Hero Section
    const Hero = () => (
        <section className="relative bg-blue-700 text-white py-16 px-4 rounded-b-3xl shadow-lg mb-8">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
                {hostel?.photo && (
                    <img src={hostel?.photo} alt={hostel?.name} className="w-56 h-56 object-cover rounded-2xl shadow-lg border-4 border-white" />
                )}
                <div className="flex-1">
                    <h1 className="text-4xl font-extrabold mb-2">{hostel?.name}</h1>
                    <p className="text-lg mb-4">{hostel?.description}</p>
                    <div className="flex flex-wrap gap-4 text-base">
                        <span><strong>Address:</strong> {hostel?.address}, {hostel?.localGovt}, {hostel?.state}, {hostel?.country}</span>
                        <span><strong>Email:</strong> {hostel?.email}</span>
                        <span><strong>Phone:</strong> {hostel?.phone}</span>
                        <span><strong>Featured:</strong> {hostel?.featured ? 'Yes' : 'No'}</span>
                    </div>
                </div>
            </div>
        </section>
    );

    return (
        <div>
            <main className="bg-gray-50">
                {Hero()}
                <div className="flex justify-end items-center space-x-2">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-colors duration-200 ${viewMode === 'grid'
                            ? 'bg-blue-100 text-blue-600'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <Grid className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-colors duration-200 ${viewMode === 'list'
                            ? 'bg-blue-100 text-blue-600'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <List className="h-5 w-5" />
                    </button>
                </div>
            </main >

            {/* Results */}

            {hostel.Rooms?.length > 0 ? (
                <div>
                    <div className={
                        viewMode === 'grid'
                            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                            : 'space-y-6'
                    }>
                        {hostel?.Rooms.map((room: any) => (
                            <RoomCard
                                key={room.id}
                                room={room}
                                onPayment={handlePayment}
                                onFavorite={handleAddFavourite}
                                onViewLocation={handleViewLocation}
                                onShare={handleShare}
                                onContact={handleContact}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="mb-4">
                        <Grid className="h-16 w-16 text-gray-300 mx-auto" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        No rooms found
                    </h3>
                </div>
            )
            }
        </div>)
}
export default HostelDetails;
