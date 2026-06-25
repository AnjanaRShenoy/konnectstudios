import React, { useState } from 'react';

export default function BookingForm({ onAddBooking }) {
  const [clientName, setClientName] = useState('');
  const [sessionType, setSessionType] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Field completion validation
    if (!clientName.trim() || !sessionType || !date) {
      setError('Please ensure all fields are completed and the date is in the future.');
      return;
    }

    // Past date validation
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time boundaries to match full calendar days

    if (selectedDate < today) {
      setError('Please ensure all fields are completed and the date is in the future.');
      return;
    }

    // Commit payload matching backend specifications
    onAddBooking({
      clientName,
      sessionType,
      date,
    });

    // Clear local input fields on success
    setClientName('');
    setSessionType('');
    setDate('');
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-5">
      {/* Form Header Section */}
      <div className="flex items-start space-x-3">
        <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl text-lg font-bold">
          ➕
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900">Add Booking</h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Fields marked with <span className="text-red-500">*</span> are required.
          </p>
        </div>
      </div>

      {/* Form Element */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Client Name Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Client Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Enter client name"
            className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 text-slate-800 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Session Type Select Dropdown */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Session Type <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              value={sessionType}
              onChange={(e) => setSessionType(e.target.value)}
              className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 bg-white text-slate-800 appearance-none focus:outline-none focus:border-indigo-500 transition-all"
            >
              <option value="" disabled hidden>
                Select session type
              </option>
              <option value="Podcast Recording">Podcast Recording</option>
              <option value="Photography">Photography</option>
              <option value="Video Shoot">Video Shoot</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400 text-xs">
              ▼
            </div>
          </div>
        </div>

        {/* Date Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Submit Action Button */}
        <button
          type="submit"
          className="w-full bg-slate-950 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-900 transition-colors flex items-center justify-center space-x-1.5 mt-2 shadow-sm"
        >
          <span>+</span>
          <span>Add Booking</span>
        </button>
      </form>

      {/* Helper Context Subtext */}
      <div className="text-center text-[11px] text-gray-400">
        New bookings are added with status{' '}
        <span className="bg-amber-50 text-amber-600 font-medium px-1.5 py-0.5 rounded border border-amber-100 text-[10px] ml-0.5 uppercase tracking-wide">
          Pending
        </span>
      </div>

      {/* Conditional Info / Error Banner Container matches styling from design specs */}
      <div
        className={`p-3.5 rounded-xl border text-xs flex items-start space-x-2.5 leading-relaxed transition-all ${
          error
            ? 'bg-red-50 border-red-100 text-red-600'
            : 'bg-indigo-50/60 border-indigo-100/70 text-indigo-700'
        }`}
      >
        <span className="text-sm mt-0.5">{error ? '⚠️' : 'ℹ️'}</span>
        <p>
          {error
            ? error
            : 'Please ensure all fields are completed and the date is in the future.'}
        </p>
      </div>
    </div>
  );
}