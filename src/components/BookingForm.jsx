import React, { useState } from 'react';

export default function BookingForm({ onAddBooking }) {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState(''); // New state for email
  const [sessionType, setSessionType] = useState('');
  const [date, setDate] = useState('');

  // Track individual inline errors
  const [errors, setErrors] = useState({
    clientName: '',
    clientEmail: '',
    sessionType: '',
    date: ''
  });

  // Handle real-time inline validation updates
  const validateField = (name, value) => {
    let errorMsg = '';

    if (name === 'clientName') {
      if (!value.trim()) errorMsg = 'Client name is required.';
    }

    if (name === 'clientEmail') {
      if (!value.trim()) {
        errorMsg = 'Email address is required.';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        errorMsg = 'Please enter a valid email address.';
      }
    }

    if (name === 'sessionType') {
      if (!value) errorMsg = 'Please select a session type.';
    }

    if (name === 'date') {
      if (!value) {
        errorMsg = 'Date is required.';
      } else {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
          errorMsg = 'Booking date cannot be in the past.';
        }
      }
    }

    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'clientName') setClientName(value);
    if (name === 'clientEmail') setClientEmail(value);
    if (name === 'sessionType') setSessionType(value);
    if (name === 'date') setDate(value);

    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Final comprehensive validity check on submit
    const currentErrors = {
      clientName: !clientName.trim() ? 'Client name is required.' : '',
      clientEmail: !clientEmail.trim() 
        ? 'Email address is required.' 
        : (!/\S+@\S+\.\S+/.test(clientEmail) ? 'Please enter a valid email address.' : ''),
      sessionType: !sessionType ? 'Please select a session type.' : '',
      date: !date ? 'Date is required.' : ''
    };

    if (date) {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        currentErrors.date = 'Booking date cannot be in the past.';
      }
    }

    setErrors(currentErrors);

    // Block submission if any error strings exist
    if (currentErrors.clientName || currentErrors.clientEmail || currentErrors.sessionType || currentErrors.date) {
      return;
    }

    // Trigger state addition to list
    onAddBooking({ clientName, clientEmail, sessionType, date });

    // Reset fields cleanly
    setClientName('');
    setClientEmail('');
    setSessionType('');
    setDate('');
    setErrors({ clientName: '', clientEmail: '', sessionType: '', date: '' });
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-5">
      {/* Form Header */}
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

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Client Name Field */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Client Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="clientName"
            value={clientName}
            onChange={handleInputChange}
            placeholder="Enter client name"
            className={`w-full text-sm border rounded-xl px-3 py-2.5 text-slate-800 placeholder-gray-400 focus:outline-none transition-all ${
              errors.clientName ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-200 focus:border-indigo-500'
            }`}
          />
          {errors.clientName && (
            <p className="text-[11px] text-red-500 font-medium mt-1 pl-1">⚠️ {errors.clientName}</p>
          )}
        </div>

        {/* Client Email Field */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="clientEmail"
            value={clientEmail}
            onChange={handleInputChange}
            placeholder="Enter client email"
            className={`w-full text-sm border rounded-xl px-3 py-2.5 text-slate-800 placeholder-gray-400 focus:outline-none transition-all ${
              errors.clientEmail ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-200 focus:border-indigo-500'
            }`}
          />
          {errors.clientEmail && (
            <p className="text-[11px] text-red-500 font-medium mt-1 pl-1">⚠️ {errors.clientEmail}</p>
          )}
        </div>

        {/* Session Type Field */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Session Type <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              name="sessionType"
              value={sessionType}
              onChange={handleInputChange}
              className={`w-full text-sm border rounded-xl px-3 py-2.5 bg-white text-slate-800 appearance-none focus:outline-none transition-all ${
                errors.sessionType ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-indigo-500'
              }`}
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
          {errors.sessionType && (
            <p className="text-[11px] text-red-500 font-medium mt-1 pl-1">⚠️ {errors.sessionType}</p>
          )}
        </div>

        {/* Date Field */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={handleInputChange}
            className={`w-full text-sm border rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none transition-all ${
              errors.date ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-indigo-500'
            }`}
          />
          {errors.date && (
            <p className="text-[11px] text-red-500 font-medium mt-1 pl-1">⚠️ {errors.date}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-slate-950 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-900 transition-colors flex items-center justify-center space-x-1.5 mt-2 shadow-sm"
        >
          <span>+</span>
          <span>Add Booking</span>
        </button>
      </form>

      {/* Footer Meta Context */}
      {/* <div className="text-center text-[11px] text-gray-400">
        New bookings are added with status{' '}
        <span className="bg-amber-50 text-amber-600 font-medium px-1.5 py-0.5 rounded border border-amber-100 text-[10px] ml-0.5 uppercase tracking-wide">
          Pending
        </span>
      </div> */}

      {/* Info Warning Container */}
      {/* <div className="bg-indigo-50/60 border border-indigo-100/70 p-3.5 rounded-xl text-xs flex items-start space-x-2.5 leading-relaxed text-indigo-700">
        <span className="text-sm mt-0.5">ℹ️</span>
        <p>Please ensure all fields are completed and the date is in the future.</p>
      </div> */}
    </div>
  );
}