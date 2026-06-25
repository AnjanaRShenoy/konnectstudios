import React from 'react';

export default function StatCards({ bookings }) {
  // Compute metrics dynamically from state
  const total = bookings.length;
  const confirmed = bookings.filter(b => b.status === 'confirmed').length;
  const pending = bookings.filter(b => b.status === 'pending').length;
  const cancelled = bookings.filter(b => b.status === 'cancelled').length;

  const stats = [
    { label: 'Total Bookings', value: total, icon: '📅', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
    { label: 'Confirmed', value: confirmed, icon: '✅', bgColor: 'bg-green-50', textColor: 'text-green-600' },
    { label: 'Pending', value: pending, icon: '🕒', bgColor: 'bg-amber-50', textColor: 'text-amber-600' },
    { label: 'Cancelled', value: cancelled, icon: '❌', bgColor: 'bg-red-50', textColor: 'text-red-600' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className={`p-3 rounded-xl ${stat.bgColor} ${stat.textColor} text-xl font-semibold`}>
            {stat.icon}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-0.5">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}