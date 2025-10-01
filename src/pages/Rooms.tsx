import React, { useState, useEffect, useRef } from 'react';
import { Grid, List } from 'lucide-react';
import SearchFilters, { SearchFilters as SearchFiltersType } from '../components/common/SearchFilters';
import { Room } from '../types';
import { useAuth } from '../context/AuthContext';
import { handleShare } from '../utils/handleShare';
import RoomCard from '../components/rooms/RoomCard';
import { useSearchParams } from 'react-router-dom';
import { getRoomsAPI } from './api/getRoomsAPI';


const Rooms: React.FC = () => {
  const { user } = useAuth();
  const [searchParams, _] = useSearchParams();
  const featured = Boolean(searchParams.get('featured'));
  const popular = Boolean(searchParams.get('popular'));
  const recommended = Boolean(searchParams.get('recommended'));
  const recent = Boolean(searchParams.get('recent'));
  const booked = Boolean(searchParams.get('booked'));


  const [rooms, setRooms] = useState<Array<Room>>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const moutRef = useRef(true);

  const [filters, setFilters] = useState<SearchFiltersType>({
    location: '',
    minPrice: 0,
    maxPrice: 100000,
    roomType: '',
    type: '',
    bedrooms: '',
    bathrooms: '',
    amenities: [],
    availability: true,    //'available'
  });

  useEffect(() => {
    if (moutRef.current) {
      (async () => {
        let data = await getRoomsAPI();
        setRooms(data?.rooms);
      })();
    }
    return () => {
      moutRef.current = false
    }
  })


  const handleFavorite = (roomId: string) => {
    if (!user) {
      // Redirect to login or show login modal
      return;
    }
    // Handle favorite logic
    console.log('Toggle favorite for room:', roomId);
  };

  const handleContact = (room: Room) => {
    // Open contact modal or redirect to contact form
    alert(`Contact ${room.agentName} at ${room.agentPhone}`);
  };

  const handleViewLocation = (room: Room) => {
    // Open map modal or redirect to maps
    alert(`View location: ${room.location}`);
  };

  const handlePayment = (room: Room) => {
    // Redirect to payment page or open payment modal
    alert(`Booking ${room.name} for ${room.price}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Browse Rooms
          </h1>
          <p className="text-lg text-gray-600">
            Find the perfect accommodation for your student life
          </p>
        </div>

        {/* Search Filters */}
        <SearchFilters showAdvanced={false} />

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
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
              : 'space-y-6'
          }>
            {
              featured ? rooms.filter(room => room.featured === true).map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onFavorite={handleFavorite}
                  onShare={handleShare}
                  onContact={handleContact}
                  onViewLocation={handleViewLocation}
                  onPayment={handlePayment}
                  isFavorite={user?.favorites?.includes(room.id)}
                />
              ))
                : popular ? rooms.map((room) => (
                  <RoomCard
                    key={room.name}
                    room={room}
                    onFavorite={handleFavorite}
                    onShare={handleShare}
                    onContact={handleContact}
                    onViewLocation={handleViewLocation}
                    onPayment={handlePayment}
                    isFavorite={user?.favorites?.includes(room.id)}
                  />
                ))
                  : recommended ? rooms.map((room) => (
                    <RoomCard
                      key={room.name}
                      room={room}
                      onFavorite={handleFavorite}
                      onShare={handleShare}
                      onContact={handleContact}
                      onViewLocation={handleViewLocation}
                      onPayment={handlePayment}
                      isFavorite={user?.favorites?.includes(room.id)}
                    />
                  ))
                    : recent ? rooms.map((room) => (
                      <RoomCard
                        key={room.name}
                        room={room}
                        onFavorite={handleFavorite}
                        onShare={handleShare}
                        onContact={handleContact}
                        onViewLocation={handleViewLocation}
                        onPayment={handlePayment}
                        isFavorite={user?.favorites?.includes(room.id)}
                      />
                    ))
                      : booked ? rooms.map((room) => (
                        <RoomCard
                          key={room.name}
                          room={room}
                          onFavorite={handleFavorite}
                          onShare={handleShare}
                          onContact={handleContact}
                          onViewLocation={handleViewLocation}
                          onPayment={handlePayment}
                          isFavorite={user?.favorites?.includes(room.id)}
                        />
                      ))
                        : rooms.map((room) => (
                          <RoomCard
                            key={room.name}
                            room={room}
                            onFavorite={handleFavorite}
                            onShare={handleShare}
                            onContact={handleContact}
                            onViewLocation={handleViewLocation}
                            onPayment={handlePayment}
                            isFavorite={user?.favorites?.includes(room.id)}
                          />
                        ))
            }
          </div>
        )
          : (
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
                onClick={() => setFilters({
                  location: '',
                  minPrice: 0,
                  maxPrice: 100000,
                  roomType: '',
                  type: '',
                  bedrooms: '',
                  bathrooms: '',
                  amenities: [],
                  availability: true
                })}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default Rooms;