import React from 'react';

export default function BookingTable({ bookings, activeFilter, onFilterChange, onStatusChange }) {
  const categories = ['All', 'Confirmed', 'Pending', 'Cancelled'];

  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-50 text-green-700 border-green-200 focus:ring-green-400';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200 focus:ring-amber-400';
      case 'cancelled':
        return 'bg-gray-100 text-gray-600 border-gray-200 focus:ring-gray-400';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Filter Badges */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onFilterChange(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
              activeFilter === cat
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Bookings Table Block */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Bookings</h2>
        </div>

        {bookings.length === 0 ? (
          <div className="p-12 text-center border-2 border-dashed border-gray-100 m-4 rounded-xl">
            <span className="text-3xl">🔍</span>
            <h3 className="mt-3 text-sm font-semibold text-gray-900">No bookings found</h3>
            <p className="mt-1 text-xs text-gray-500">
              No results match this view. Try altering your active category filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                  <th className="py-3 px-6">Client</th>
                  <th className="py-3 px-6">Session Type</th>
                  <th className="py-3 px-6">Date</th>
                  <th className="py-3 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                    
                    {/* Client Info Cell with Real Email State */}
                    <td className="py-4 px-6 font-medium text-gray-900">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center">
                          {booking.clientName ? booking.clientName.split(' ').map(n => n[0]).join('') : '??'}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{booking.clientName}</p>
                          <p className="text-xs text-gray-400 font-normal">
                            {/* Renders the saved email, or runs a lowercase generator for baseline records */}
                            {booking.clientEmail || `${booking.clientName.toLowerCase().replace(' ', '.')}@example.com`}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Session Type */}
                    <td className="py-4 px-6 text-gray-600">
                      {booking.sessionType}
                    </td>

                    {/* Formatted Date Cell (DD-MM-YYYY) */}
                    <td className="py-4 px-6 text-gray-500 font-mono">
                      {(() => {
                        if (!booking.date) return '';
                        const [year, month, day] = booking.date.split('-');
                        return `${day}-${month}-${year}`;
                      })()}
                    </td>

                    {/* Interactive Dropdown Badge with Chevron indicator */}
                    <td className="py-4 px-6">
                      <div className="relative inline-block">
                        <select
                          value={booking.status.toLowerCase()}
                          onChange={(e) => onStatusChange(booking.id, e.target.value)}
                          className={`pl-3 pr-7 py-1 rounded-md text-xs font-bold border uppercase tracking-wider cursor-pointer focus:outline-none focus:ring-1 transition-all appearance-none ${getStatusStyles(
                            booking.status
                          )}`}
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="pending">Pending</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-[10px] opacity-70">
                          ▼
                        </div>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}