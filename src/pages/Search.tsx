import React, { useState, useEffect } from 'react';
import { Grid, List } from 'lucide-react';
import SearchFilters from '../components/common/SearchFilters';
import { Room } from '../types';
import { useAuth } from '../context/AuthContext';
import { handleShare } from '../utils/handleShare';
import RoomCard from '../components/rooms/RoomCard';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getSearchedRoomAPI } from './api/getSearchedRoomsAPI';
import { makePaymentAPI } from '../payment/makePaymentAPI';
import { addFavouriteRoomAPI } from './api/addFavouriteRoomAPI';
import { toast } from 'sonner';
import { handleViewLocation } from '../utils/handleViewLocation';
import Pagination from '../components/common/Pagination';
import { getRoomsAPI } from './api/getRoomsAPI';


const Searchs: React.FC = () => {

  const initialFilter = {
    checkIn: '',
    checkOut: '',
    name: '',
    location: '',
    roomType: '',
    type: '',
    bedrooms: 0,
    bathrooms: 0,
    amenities: [],
    availability: true,
    hostelId: ''
  };

  const { user } = useAuth();
  const [searchParams, _] = useSearchParams();
  const [rooms, setRooms] = useState<Array<Room>>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<Boolean>(false);


  let _filters = {
    location: searchParams.get("location") as string,
    checkIn: searchParams.get("checkIn") as string,
    checkOut: searchParams.get("checkOut") as string,
    name: searchParams.get("name") as string,
    roomType: searchParams.get("roomType") as string,
    type: searchParams.get("type") as string,
    bedrooms: Number(searchParams.get("bedrooms") ?? 0),
    bathrooms: Number(searchParams.get("bathrooms") ?? 0),
    amenities: searchParams.get("amenities") as unknown as Array<string>,
    availability: Boolean(searchParams.get("availability")) ?? true,
    hostelId: searchParams.get("hostelId") as string
  };

  const [filters, setFilters] = useState({ ..._filters });
  const itemsPerPage = 10;

  useEffect(() => {
    (async () => {
      if (filters?.hostelId) {
        try {

          setLoading(true)
          let data = await getSearchedRoomAPI({ page: currentPage, ...filters });
          setRooms(data?.rooms);
          setTotalPages(Math.ceil(data?.roomCount ?? 1) / itemsPerPage);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false)
        }

      } else {

        try {
          setLoading(true);
          let data = await getRoomsAPI(currentPage)
          setRooms(data?.rooms)
          setTotalPages(Math.ceil(data?.roomCount ?? 1) / itemsPerPage);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false)
        }

      }
    })();

  }, [
    currentPage,
    filters.name,
    filters.location,
    filters.hostelId,
    filters.checkIn,
    filters.checkOut,
    filters.roomType,
    filters.bathrooms,
    filters.bathrooms,
    filters.amenities
  ]);


  const handleAddFavourite = async (roomId: any) => {
    if (user?.userId) {
      let result = await addFavouriteRoomAPI({ roomId, userId: user.id });
      if (result) {
        toast(result)
      }
      // Redirect to login or show login modal
    } else {
      navigate("/auth")
    }

  };

  const handleContact = (phone: string) => {
    // Open contact modal or redirect to contact form
    return phone;
  };

  const handlePayment = async (roomId: any, roomPrice: any) => {
    // Redirect to payment page or open payment modal
    await makePaymentAPI({ roomId, userId: user.id, amount: roomPrice, email: user.email });
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Browse Searchs
          </h1>
          <p className="text-lg text-gray-600">
            Find the perfect accommodation for your lifestyle
          </p>
        </div>

        {/* Search Filters */}
        <SearchFilters showAdvanced={false} getNewFilter={setFilters} newFilter={filters} />

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {rooms?.length} rooms found
            </h2>
            <p className="text-sm text-gray-600">
              Showing results based on your search criteria
            </p>
          </div>

          <div className="flex items-center space-x-2">
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
        </div>

        {/* Results */}
        {rooms?.length > 0 ? (
          <div>
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'space-y-6'
            }>
              {rooms?.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onFavorite={handleAddFavourite}
                  onShare={handleShare}
                  onContact={handleContact}
                  onViewLocation={handleViewLocation}
                  onPayment={handlePayment}
                  isFavorite={user?.favorites?.includes(room.id)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center py-12">
              <div className="mb-4">
                <Grid className="h-16 w-16 text-gray-300 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No rooms found
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Try adjusting your search filters or browse all available rooms.
              </p>
              <button
                onClick={() => setFilters({ ...initialFilter })}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>

          </div>
        )}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /><br />
    </div>
  );
};

export default Searchs;