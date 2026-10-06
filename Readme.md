# Six Cities — Standalone Apartment Booking Service (Flagship Project)

A high-performance, fully production-ready client-side single-page application (SPA) for exploring and booking real estate offers across 6 major cities. Engineered using React, Redux Toolkit, and TypeScript as part of the Advanced Frontend Development track.

*Note: The UI/UX markup, visual styles, and static assets were provided by HTML Academy. My mission was to architect the complete React component ecosystem, build a resilient global state engine, implement strict TypeScript data boundaries, and deliver 100% network-independent autonomy.*

## 🛠 Tech Stack & Core Architecture
- **Core Framework:** React 18+ (Functional components, custom lifecycle hooks)
- **State Management:** Redux Toolkit (`createSlice`, advanced Thunks, memoized selectors via `createSelector`)
- **Type Safety:** Strict TypeScript configuration (100% type enforcement without any dynamic fallback types)
- **Routing & Navigation:** React Router v6 (Protected pipelines, path-matching parameters, custom history integration)
- **Geospatial UI:** Leaflet API mapping engine synchronized reactively with active UI states

## 💡 Key Technical & Architectural Features Engineered by Me:
- **100% Standalone Autonomy:** Completely decoupled the client runtime from unstable Academy backend servers. Authored a robust local data collection system hosting 99 detailed apartment profiles, dynamic comment trees, and localized assets, enabling full offline reliability.
- **Bi-Directional Map & List Synchronization:** Implemented real-time interaction pipelines between Leaflet markers and the product grid. Hovering over a list card reactively shifts focus onto the respective map node via Redux selectors, while direct interactions with map markers seamlessly trigger router events to open individual accommodation screens.
- **Persistent Local Favorites Storage:** Designed a zero-latency bookmarking engine synced with the browser's `localStorage` API. User preference flags are preserved cross-session without a standard database layer, allowing custom states to persist seamlessly through complete window updates.
- **Rigid TypeScript Integrity:** Performed comprehensive global state contract refactoring. Resolved strict type boundaries within Redux Immer states (`WritableDraft`), aligning static component requirements with server-shaped structural signatures.
- **Asynchronous Execution Optimization:** Migrated heavy sequential processing out of core view rendering. Relocated map synchronization actions and state dispatches strictly into dedicated lifecycle wrappers (`useEffect`), effectively eliminating performance anomalies and rendering bottlenecks.

## ⚙️ How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/denis-heise/Six-cities
   ```
2. Install all required dependencies:
   ```bash
   npm install
   ```
3. Boot up the local development environment:
   ```bash
   npm start
   ```
4. Open `http://localhost:3000` in your web browser.
