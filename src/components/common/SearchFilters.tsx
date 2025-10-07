import React, { useState } from 'react';
import { Filter, MapPin, DollarSign, SearchIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchFiltersProps {
  showAdvanced?: boolean;
  newFilter?: any
}

export interface SearchFilters {
  location: string;
  minPrice: number;
  maxPrice: number;
  roomType: string;
  type: string;
  bedrooms: string;
  bathrooms: string;
  amenities: string[];
  availability: boolean;
}

const initialFilter = {
  location: '',
  minPrice: 0,
  maxPrice: 100000,
  type: '',
  roomType: '',
  bedrooms: '',
  bathrooms: '',
  amenities: [],
  availability: true
}
const SearchFilters: React.FC<SearchFiltersProps> = ({ showAdvanced = false, newFilter = { ...initialFilter } }) => {
  const navigate = useNavigate()
  const [filters, setFilters] = useState<SearchFilters>(newFilter);

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const roomTypes = [
    { value: '', label: 'All Types' },
    { value: 'single', label: 'Single Room' },
    { value: 'double', label: 'Double Room' },
    { value: 'triple', label: 'Triple Suite' },
    { value: 'dormitory', label: 'Dormitory' }
  ];

  const amenitiesList = [
    'WiFi', 'AC', 'Study Desk', 'Wardrobe', 'Private Bathroom',
    'Shared Kitchen', 'Laundry', 'Parking', 'Security', 'Gym'
  ];

  const handleFilterChange = async (key: keyof SearchFilters, value: any) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
  };

  const handleAmenityToggle = (amenity: string) => {
    const updatedAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];

    handleFilterChange('amenities', updatedAmenities);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      {/* Main Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Enter location..."
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-4">
          <div className="relative min-w-[120px]">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="number"
              placeholder="Min price"
              value={filters.minPrice || ''}
              onChange={(e) => handleFilterChange('minPrice', parseInt(e.target.value) || 0)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="relative min-w-[120px]">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="number"
              placeholder="Max price"
              value={filters.maxPrice || ''}
              onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value) || 100000)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Filter className="h-5 w-5" />
          <span>Filters</span>
        </button>

        <button
          onClick={() => navigate("/search?" + new URLSearchParams({ ...filters as any }).toString())}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <SearchIcon className="h-5 w-5" />
          <span>Search</span>
        </button>
      </div>

      {/* Advanced Filters */}
      {(showAdvanced || showAdvancedFilters) && (
        <div className="border-t border-gray-200 pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Room Type
              </label>
              <select
                value={filters.roomType}
                onChange={(e) => handleFilterChange('roomType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {roomTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bedrooms
              </label>
              <select
                value={filters.bedrooms}
                onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2+ Bedrooms</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bathrooms
              </label>
              <select
                value={filters.bathrooms}
                onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any</option>
                <option value="1">1 Bathroom</option>
                <option value="2">2+ Bathrooms</option>
              </select>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Amenities
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {amenitiesList.map(amenity => (
                <label
                  key={amenity}
                  className={`flex items-center space-x-2 px-3 py-2 border rounded-lg cursor-pointer transition-colors duration-200 ${filters.amenities.includes(amenity)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                    }`}
                >
                  <input
                    type="checkbox"
                    checked={filters.amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="hidden"
                  />
                  <span className="text-sm">{amenity}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;

export { SearchFilters }