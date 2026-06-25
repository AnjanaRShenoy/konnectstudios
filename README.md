# Studio Bookings Dashboard

A lightweight, responsive studio booking management dashboard built with **React**, **Vite**, and **Tailwind CSS**.

The application allows studio administrators to:

- View all bookings
- Filter bookings by status
- Add new bookings with validation
- Display booking statistics
- Handle empty states gracefully
- (Bonus) Schedule sessions using an embedded Calendly widget

---

# Features

- 📊 Dynamic dashboard statistics
- 🔍 Status filtering (All / Confirmed / Pending / Cancelled)
- ➕ Add Booking form
- ✅ Real-time form validation
- 📅 Date validation (future dates only)
- 🎨 Responsive Tailwind UI
- 📭 Empty state when filters return no results
- 📆 Calendly scheduling integration (Bonus)

---

# Tech Stack

- React
- Vite
- Tailwind CSS
- JavaScript (ES6+)

---

# Getting Started

## 1. Prerequisites

Make sure you have:

- Node.js v18+
- npm

---

## 2. Clone the Repository

```bash
git clone <your-repository-url>
cd <project-folder>
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Environment Configuration

Create a `.env` file in the project root.

```env
VITE_CALENDLY_URL=https://calendly.com/shenoyanjana96
```

Replace the URL with your own Calendly scheduling link if needed.

---

## 5. Start the Development Server

```bash
npm run dev
```

The application will be available at:

```
http://localhost:3000
```

---

# Project Structure

```text
src/
├── components/
│   ├── BookingForm.jsx
│   ├── BookingTable.jsx
│   ├── CalendlyEmbed.jsx
│   └── StatCards.jsx
│
├── data/
│   └── bookings.json
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# Component Responsibilities

## App.jsx

Acts as the application's state container.

Responsibilities:

- Stores the bookings array
- Stores the active filter
- Calculates dashboard statistics
- Passes data and callbacks to child components

---

## StatCards.jsx

Displays summary metrics including:

- Total Bookings
- Confirmed
- Pending
- Cancelled

Values update automatically whenever bookings change.

---

## BookingTable.jsx

Responsible for displaying bookings.

Features:

- Status filtering
- Responsive table layout
- Status badges/dropdown
- Empty state when no bookings match
- Date formatting

---

## BookingForm.jsx

Handles creation of new bookings.

Validation includes:

- Required fields
- Valid email format (if applicable)
- Future booking dates only

New bookings are added with a default **Pending** status.

---

## CalendlyEmbed.jsx

Implements the optional scheduling integration.

Features:

- Embedded Calendly widget
- Uses the `VITE_CALENDLY_URL` environment variable
- Tracks `calendly.event_scheduled` events
- Displays a simple in-session activity log
- Includes a "Book Another Session" refresh action

> This integration is implemented as a separate scheduling section, following the assignment's bonus requirements.

---

# Design Decisions

The application follows a simple component-based architecture.

- Single source of truth using React state
- Components follow single-responsibility principles
- Derived statistics are calculated from state rather than stored
- Responsive two-column layout
- Tailwind utility classes for consistent styling

---

# Validation Rules

The booking form rejects:

- Empty fields
- Invalid input (if applicable)
- Dates earlier than today

Errors are displayed inline without requiring a page refresh.

---

# Bonus Features

In addition to the core assignment requirements, the project includes:

- Embedded Calendly scheduling
- Session activity tracking
- Responsive dashboard statistics
- Interactive booking status updates

---

# Future Improvements

Potential enhancements include:

- Backend persistence
- Authentication
- Search functionality
- Pagination
- Calendar view
- Drag-and-drop scheduling
- Email notifications
- Webhook synchronization with Calendly

---

# Notes

For the purposes of this assignment:

- Booking data is stored in client-side state only.
- No backend or database is used.
- Calendly integration is implemented as a separate scheduling section and does not synchronize bookings back into the dashboard.

---

# Author

Anjana R