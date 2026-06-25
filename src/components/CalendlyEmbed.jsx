import React, { useEffect, useState } from 'react';

export default function CalendlyEmbed() {
  const [widgetKey, setWidgetKey] = useState(0);
  // Local state to store meetings booked during this session
  const [localCalendlyMeetings, setLocalCalendlyMeetings] = useState([]);

  useEffect(() => {
    // 1. Inject the Calendly widget script
    const script = document.createElement('script');
    script.src = "https://assets.calendly.com/assets/external/widget.js"; 
    script.async = true;
    document.body.appendChild(script);

    // 2. Setup standard window event listener for Calendly broadcasts
    const handleCalendlyEvents = (e) => {
      // Check if the event is a successful profile/booking confirmation
      if (e.data.event && e.data.event === 'calendly.event_scheduled') {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const todayDate = new Date().toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' });

        const newMeeting = {
          id: Date.now(),
          title: "30 Minute Meeting",
          timeSlot: `Scheduled today at ${timestamp}`,
          date: todayDate,
          status: "Confirmed"
        };

        // Append to our right-side preview table state
        setLocalCalendlyMeetings(prev => [newMeeting, ...prev]);
      }
    };

    window.addEventListener('message', handleCalendlyEvents);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      window.removeEventListener('message', handleCalendlyEvents);
    };
  }, [widgetKey]);

  const handleResetWidget = () => {
    setWidgetKey(prev => prev + 1);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      {/* Header Container */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Schedule with Calendly</h3>
          <p className="text-sm text-gray-500">Book time directly with our team using Calendly.</p>
        </div>
        
        <button
          onClick={handleResetWidget}
          className="self-start px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors border border-slate-200 flex items-center space-x-1.5 shadow-sm"
        >
          🔄 <span>Book Another Session</span>
        </button>
      </div>

      {/* Two-Column Grid: Left Side Widget, Right Side Preview Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2/3: The Active Calendly Embed Widget */}
        <div className="lg:col-span-2 border border-gray-100 rounded-xl overflow-hidden bg-gray-50/30">
          <div 
            key={widgetKey}
            className="calendly-inline-widget w-full" 
            data-url="https://calendly.com/shenoyanjana96"
            style={{ minWidth: '320px', height: '580px' }} 
          />
        </div>

        {/* Right 1/3: Real-time Upcoming Meetings Session List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="border-b border-gray-100 pb-2">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Session Activity Log ({localCalendlyMeetings.length})
            </h4>
            <p className="text-[11px] text-gray-400 mt-0.5">Bookings completed during this active session</p>
          </div>

          {localCalendlyMeetings.length === 0 ? (
            /* Empty State for the Side Table */
            <div className="p-8 text-center border border-dashed border-gray-200 rounded-xl bg-gray-50/50 mt-2">
              <span className="text-xl">⏳</span>
              <p className="text-xs font-medium text-gray-500 mt-2">No slots confirmed yet.</p>
              {/* <p className="text-[10px] text-gray-400 mt-0.5">Complete the scheduling form on the left to watch it sync here live.</p> */}
            </div>
          ) : (
            /* Mini-Table Rows displaying the captured Calendly Events */
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {localCalendlyMeetings.map((meeting) => (
                <div 
                  key={meeting.id} 
                  className="p-3.5 bg-green-50/40 border border-green-100/70 rounded-xl transition-all animate-fadeIn flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-slate-800">{meeting.title}</span>
                    <span className="bg-green-100 text-green-700 font-extrabold text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded border border-green-200">
                      {meeting.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-2 flex justify-between items-center">
                    <span>📅 {meeting.date}</span>
                    <span className="text-gray-400 font-normal">{meeting.timeSlot}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}