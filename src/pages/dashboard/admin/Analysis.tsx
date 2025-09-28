import { TrendingUp } from "lucide-react";
import { mockRooms } from "../../../data/mockData";

export const AnalysisTab = ()=>{
        // Room type distribution
        const typeCounts = mockRooms.reduce((acc, r) => {
          acc[r.type] = (acc[r.type] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        // Amenities frequency
        const amenityCounts = mockRooms.flatMap(r => r.amenities).reduce((acc, a) => {
          acc[a] = (acc[a] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        const topAmenities = Object.entries(amenityCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Room Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Room Type Distribution</h3>
                <ul>
                  {Object.entries(typeCounts).map(([type, count]) => (
                    <li key={type} className="flex justify-between py-1">
                      <span className="capitalize">{type}</span>
                      <span className="font-bold">{count}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Top Amenities</h3>
                <ul>
                  {topAmenities.map(([amenity, count]) => (
                    <li key={amenity} className="flex justify-between py-1">
                      <span>{amenity}</span>
                      <span className="font-bold">{count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="text-center py-12">
              <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Market analysis tools coming soon...</p>
            </div>
          </div>
        );
      }