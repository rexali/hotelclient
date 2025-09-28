import { BarChart3 } from "lucide-react";
import { mockRooms } from "../../../data/mockData";

export const ReportTab = ()=>{
        // Room stats
        const totalRooms = mockRooms.length;
        const availableRooms = mockRooms.filter(r => r.availability === true).length;
        const occupiedRooms = mockRooms.filter(r => r.availability === true).length;
        const avgPrice = totalRooms > 0 ? Math.round(mockRooms.reduce((sum, r) => sum + r.price, 0) / totalRooms) : 0;
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Room Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-3xl font-bold text-red-600">{totalRooms}</div>
                <div className="text-gray-700 mt-2">Total Rooms</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-3xl font-bold text-green-600">{availableRooms}</div>
                <div className="text-gray-700 mt-2">Available</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-3xl font-bold text-yellow-600">{occupiedRooms}</div>
                <div className="text-gray-700 mt-2">Occupied</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-3xl font-bold text-blue-600">₦{avgPrice.toLocaleString()}</div>
                <div className="text-gray-700 mt-2">Avg. Price</div>
              </div>
            </div>
            <div className="text-center py-12">
              <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Reports and analytics dashboard coming soon...</p>
            </div>
          </div>
        );
      }