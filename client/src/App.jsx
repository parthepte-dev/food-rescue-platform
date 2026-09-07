import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DonorPage from './pages/DonorPage';
import NgoPage from './pages/NgoPage';
import MatchingPage from './pages/MatchingPage';
import AnalyticsPage from './pages/AnalyticsPage';
import VolunteerTrackingPage from './pages/VolunteerTrackingPage';
import TrackingMapPage from './pages/TrackingMapPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donor" element={<DonorPage />} />
        <Route path="/ngo" element={<NgoPage />} />
        <Route path="/matching" element={<MatchingPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/volunteer-tracking" element={<VolunteerTrackingPage />} />
        <Route path="/track" element={<TrackingMapPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;