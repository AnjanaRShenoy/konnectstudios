# Studio Bookings Dashboard

A lightweight, responsive studio booking management dashboard built using **React**, **Vite**, and **Tailwind CSS**. This interface allows administrators to view, filter, update, and schedule client sessions smoothly in real time.

---

## 🚀 Getting Started

Follow these steps to get the application up and running locally on your machine.

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher recommended) and **npm** installed on your system.

### 2. Clone and Setup
Navigate into the project root directory and install the necessary dependencies:
```bash
npm install

3. Environment Configuration
The application utilizes a client-side scheduling link stored in an environment variable. Create a .env file in the root directory and append your variable:
VITE_CALENDLY_URL=[https://calendly.com/shenoyanjana96](https://calendly.com/shenoyanjana96)

4. Run the Local Development Server
Boot up the Vite build engine locally:
npm run dev

🏗️ Architectural Decisions & Component StructureThe interface has been intentionally modularized into single-responsibility functional components to establish clear boundaries, facilitate simple debugging, and maintain low cognitive load for reviewers.  Plaintextsrc/
├── data/
│   └── bookings.json      # Hardcoded base data array matching assignment brief
├── components/
│   ├── StatCards.jsx      # Top row metric indicators showing counter sums dynamically
│   ├── BookingTable.jsx   # Tabular layout rendering client lists, status updates, & empty states
│   ├── BookingForm.jsx    # Client-facing intake form equipped with strict real-time validation
│   └── CalendlyEmbed.jsx  # Third-party client-side scheduling interface with live tracking
└── App.jsx                # Global state orchestrator and main structural layout grid

Component Boundaries & Purpose
1) App.jsx (State Hub): Acts as the centralized ground-truth source of state for the application. It manages the core bookings array state and the active category filter selection. It passes setter actions and filtered data arrays down to child modules, ensuring instant reactive rendering when items are added or shifted.

2)StatCards.jsx: A pure presentation component that reads the current reactive data length array and filters counts in real-time. It displays total, confirmed, pending, and cancelled statistics instantly inside custom layout cards.

3)BookingTable.jsx: Handles data rendering and filtering views. It converts standard database YYYY-MM-DD strings into a readable DD-MM-YYYY format layout. To make the interface deeply practical, the static status badge was replaced with an interactive <select> dropdown with an accordion arrow icon, enabling administrators to swap booking states directly from the rows. It also implements an analytical dashed empty state view if filters yield zero elements.

4)BookingForm.jsx: A robust input submission form that defaults new client submissions to a Pending status banner. Rather than relying on rigid browser validation on submit, it implements strict, real-time inline error boundaries for empty fields, improper email regex formatting, and past-date entries.

5)CalendlyEmbed.jsx: Implements the stretch-goal integration using a clean, client-side dynamic script injection workflow. It contains a "Book Another Session" key-state refresher feature to reset the internal iframe seamlessly, alongside an isolated Session Activity Log side-table that tracks successfully scheduled events during the visitor's session using native browser window message loops (calendly.event_scheduled).