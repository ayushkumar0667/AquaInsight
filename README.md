# AquaInsight

AquaInsight is a modern web application and landing page designed for tracking water quality, usage, and harvesting data. It features a beautiful, fluid user interface with dynamic "water ripple" backgrounds and data visualizations built with responsive React components and Tailwind CSS.

## Features

- **Water Quality Monitoring:** Get insights and track the quality of water in different zones and areas.
- **Usage Tracking:** View average daily water consumption with visual charts by month or spanning the past 7 years.
- **Harvesting Data:** Monitor metrics related to rainwater harvesting and conservation.
- **Interactive UI:** Smooth transitions, responsive design, and rippling background animations reflecting its aquatic thematic roots.
- **Location Search:** Integrated Place Autocomplete (powered by Google Maps Platform) to quickly search for cities/municipalities.
- **AI Backend Support:** Full-stack Express backend configured to integrate with Gemini API for dynamic, data-driven insights.

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Lucide React (Icons)
- Google Maps Platform (Places Library for autocomplete)

### Backend
- Node.js
- Express
- Google Gemini API (`@google/genai`)

## Application Infrastructure

- The frontend is served seamlessly through an Express/Vite hybrid setup.
- The entry point for the backend logic is `server.ts`. 
- `npm run dev` kicks off the backend and Vite middleware for asset serving simultaneously via `tsx`.
- `npm run build` bundles the server for production using `esbuild` and the client using `vite build`.

## Getting Started

### Prerequisites

- Node.js (v18+)
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey)
- A [Google Maps Platform API Key](https://developers.google.com/maps/documentation/javascript/get-api-key) with the Places API enabled.

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd aquainsight
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   - Create a `.env` file in the root based on `.env.example`.
   - Add your API keys:
     ```env
     GEMINI_API_KEY=your_gemini_api_key_here
     VITE_GOOGLE_MAPS_PLATFORM_KEY=your_google_maps_api_key_here
     ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application and the backend API will start simultaneously.

5. **Build for Production:**
   ```bash
   npm run build
   npm start
   ```

## Design Philosophy

The application interface embraces a "Civic Modernism" design, providing a polished and purposeful UI through intentional typographic hierarchy and deliberate interactions.

## License

This project is licensed under the MIT License.
