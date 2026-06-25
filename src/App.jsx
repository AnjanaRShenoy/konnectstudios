import React, { useState } from 'react';
import initialBookings from './data/bookings.json';
import BookingTable from './components/BookingTable';
import BookingForm from './components/BookingForm';
import StatCards from './components/StatCards';
import CalendlyEmbed from './components/CalendlyEmbed';

export default function App() {
  // Set up local React state using the JSON array as the baseline data source
  const [bookings, setBookings] = useState(initialBookings);
  const [filter, setFilter] = useState('All');

  // Filter functionality
  const filteredBookings = bookings.filter((booking) => {
    if (filter === 'All') return true;
    return booking.status.toLowerCase() === filter.toLowerCase();
  });

  // Callback function to insert a new booking directly into client state
  const handleAddBooking = (newBooking) => {
    const nextId = bookings.length > 0 ? Math.max(...bookings.map((b) => b.id)) + 1 : 1;

    const bookingWithStatus = {
      id: nextId,
      clientName: newBooking.clientName,
      clientEmail: newBooking.clientEmail,
      sessionType: newBooking.sessionType,
      date: newBooking.date,
      status: 'pending', // Requirements specify new entries default to pending status
    };

    // Update state to re-render components with the newly appended list row
    setBookings([...bookings, bookingWithStatus]);
  };

  const handleStatusChange = (bookingId, newStatus) => {
  setBookings((prevBookings) =>
    prevBookings.map((booking) =>
      booking.id === bookingId ? { ...booking, status: newStatus.toLowerCase() } : booking
    )
  );
};

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 text-slate-900">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Dashboard Title & Meta Text */}
        <header>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Studio Bookings Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Manage client sessions, track booking status, and schedule new appointments.</p>
        </header>

        {/* Dynamic Statistic Top Cards */}
        <StatCards bookings={bookings} />

        {/* Main Interface Columns Split Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Bookings List & Filter View */}
          <div className="lg:col-span-2">
            <BookingTable 
              bookings={filteredBookings} 
              activeFilter={filter} 
              onFilterChange={setFilter} 
              onStatusChange={handleStatusChange}
            />
          </div>

          {/* Form Action Component */}
          <div className="lg:col-span-1">
            <BookingForm onAddBooking={handleAddBooking} />
          </div>
          
        </div>

        {/* Isolated Calendly Segment (Bonus Section) */}
        <div className="pt-4">
          <CalendlyEmbed />
        </div>

      </div>
    </div>
  );
}