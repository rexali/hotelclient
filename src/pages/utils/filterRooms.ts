import { Room } from "../../types";
import { SearchFilters} from '../../components/common/SearchFilters';

export function filterRooms(rooms:Array<Room>, filters: SearchFilters ) {

       return rooms?.filter(room => {
      return (
        (!filters.location || room.location.toLowerCase().includes(filters.location.toLowerCase())) &&
        room.price >= filters.minPrice &&
        room.price <= filters.maxPrice &&
        (!filters.roomType || room.type === filters.roomType) &&
        (!filters.bedrooms || room.bedrooms.toString() === filters.bedrooms) &&
        (!filters.bathrooms || room.bathrooms.toString() === filters.bathrooms) &&
        (filters.amenities.length === 0 || filters.amenities.some(amenity => room.amenities.includes(amenity))) &&
        (!filters.availability || filters.availability === true || room.availability === filters.availability)
      );
    });
    
}