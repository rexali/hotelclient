import React, { useState } from "react";
import Pagination from "../../../components/common/Pagination";
import { getAllBookingsAPI } from "./api/getAllBookingsAPI";

export const BookingsTab = () => {
  const [bookings, setBookings] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  React.useEffect(() => {
    (async () => {
      let data = await getAllBookingsAPI(currentPage);
      setTotalPages(data?.bookings?.bookingCount + 1)
      setBookings(data?.bookings?.bookings);
    })();
  }, [currentPage])

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Room Transactions</h2>
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Room</th>
              {/* <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Check-In</th> */}
              {/*<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Check-Out</th> */}
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total Price</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Booked On</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings?.slice().sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((booking: any) => {
              return (
                <tr key={booking.id}>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-8 w-8 rounded-full mr-2"
                        src={booking.User?.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'}
                        alt={booking.User?.name || booking?.User?.role}
                        crossOrigin="anonymous"
                      />
                      {/* <span className="text-sm font-medium text-gray-900">{booking.User?.username || booking.User?.role}</span> */}
                    </div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{booking?.Room?.name}</td>
                  {/* <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{booking.checkIn instanceof Date ? booking.checkIn.toLocaleDateString() : new Date(booking.checkIn).toLocaleDateString()}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{booking.checkOut instanceof Date ? booking.checkOut.toLocaleDateString() : new Date(booking.checkOut).toLocaleDateString()}</td> */}
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-green-700">₦{booking?.totalPrice.toLocaleString()}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm capitalize">{booking?.status}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm capitalize">{booking?.paymentStatus}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{booking?.createdAt instanceof Date ? booking.createdAt.toLocaleDateString() : new Date(booking.createdAt).toLocaleDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {bookings?.length === 0 && (
          <div className="p-6 text-center text-gray-500">No booking transactions found.</div>
        )}
      </div>
      <div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /><br />
      </div>
    </div>
  );
}