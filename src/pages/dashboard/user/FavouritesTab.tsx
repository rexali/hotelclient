import { useState, useEffect } from "react";
import { FavouriteRooms } from "../admin/FavouriteRooms";
import { getUserFavouriteRoomsAPI } from "./api/getUserFavouritesAPI";
import { useAuth } from "../../../context/AuthContext";
import Pagination from "../../../components/common/Pagination";

// List of all favorite rooms for all users (no duplicates)
const FavouritesTab = () => {
  // Get all favorite room IDs from all users
  const [data, setData] = useState<any>([]);
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    (async () => {
      let data = await getUserFavouriteRoomsAPI(user?.userId, currentPage);
      setTotalPages(data?.roomCount)
      setData(data?.favourites)
    })();
  }, [user?.userId,currentPage])

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Favourite Rooms</h2>
      {data?.length === 0 && <div className="text-gray-500 p-6 text-center">No favourite rooms found.</div>}
      <FavouriteRooms favourites={data} />
      <div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /><br />
      </div>
    </div>
  );
}

export default FavouritesTab

