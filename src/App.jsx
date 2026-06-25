import React, { useState } from 'react';
import initialBookings from './data/bookings.json';
import BookingTable from './components/BookingTable';
import BookingForm from './components/BookingForm';
import StatCards from './components/StatCards';
import CalendlyEmbed from './components/CalendlyEmbed';

export default function App() {
  const [bookings, setBookings] = useState(initialBookings);
  const [filter, setFilter] = useState('All');

  // 1. Filter logic
  const filteredBookings = bookings.filter(booking => {
    if (filter === 'All') return true;
    return booking.status.toLowerCase() === filter.toLowerCase();
  });

  // 2. Add booking callback
  const handleAddBooking = (newBooking) => {
    setBookings((prev) => [
      ...prev,
      { id: prev.length + 1, ...newBooking, status: 'pending' } // Default new bookings to pending
    ]);
  };

  return (
    <div className="min-h-screen  bg-gray-50 p-8 text-gray-900">
      {/* Dashboard Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Studio Bookings Dashboard</h1>
        <p className="text-gray-500">Manage client sessions, track booking status, and schedule new appointments.</p>
      </header>

      {/* Stats Cards Row */}
      <StatCards bookings={bookings} />

      {/* Main Grid Layout matching your UI */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Left 2/3: List View & Filters */}
        <div className="lg:col-span-2 space-y-6">
          <BookingTable 
            bookings={filteredBookings} 
            activeFilter={filter} 
            onFilterChange={setFilter} 
          />
        </div>

        {/* Right 1/3: Add Booking Form */}
        <div className="lg:col-span-1">
          <BookingForm onAddBooking={handleAddBooking} />
        </div>
      </div>

      {/* Bottom Section: Bonus Calendly Embed */}
      <div className="mt-8">
        <CalendlyEmbed />
      </div>
    </div>
  );
}