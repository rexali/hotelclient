import { Eye, Phone } from "lucide-react"
import { BASE_URL_LOCAL } from "../../../constants/constants"
import { Link } from "react-router-dom"

export const FavouriteRooms = ({ favourites = [] }: { favourites: any }) => {

  
    return (<div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Room
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        availability
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {favourites?.map((item: any) => item.Room)?.map((room: any,i:any) => (
                    <tr key={i}>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <img
                                    className="h-10 w-10 rounded-full"
                                    src={room?.photo?.length ? BASE_URL_LOCAL + "/uploads/" + room?.photo[0] : 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'}
                                    alt={room?.name}
                                    width={10}
                                    height={10}
                                    style={{ margin: 2, display: "inline-block" }}
                                    crossOrigin=""
                                />
                                <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{room?.name}</div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {room?.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {room?.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {room?.availability ? "Available" : "Occupied"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex space-x-2">
                                <button className="text-blue-600 hover:text-blue-900">
                                    <Link to={"/rooms/" + room?.id} >
                                        <Eye className="h-4 w-4" />
                                    </Link>
                                </button>
                                <button className="text-red-600 hover:text-red-900">
                                    <Link to={"tel:" + room?.phone} >
                                        <Phone className="h-4 w-4" />
                                    </Link>
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {favourites?.length === 0 && <div className="text-gray-500 p-6 text-center">No favourite rooms found.</div>}
    </div>)
}