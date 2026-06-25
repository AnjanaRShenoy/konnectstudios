import React, { useEffect } from 'react';

export default function CalendlyEmbed() {
  useEffect(() => {
    // Dynamically load the Calendly third-party widget script safely on mount
    const script = document.createElement('script');
    script.src = "https://assets.assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Clean up on unmount
    };
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold">Schedule with Calendly</h3>
          <p className="text-sm text-gray-500">Book time directly with our team using Calendly.</p>
        </div>
      </div>
      
      {/* Calendly Inline Embed */}
      <div 
        className="calendly-inline-widget w-full" 
        data-url="https://calendly.com/YOUR_CALENDLY_USERNAME" // Replace with your real link or a mockup public link
        style={{ minWidth: '320px', height: '600px' }} 
      />
    </div>
  );
}