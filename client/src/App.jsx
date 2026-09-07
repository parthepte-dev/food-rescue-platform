import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DonorPage from './pages/DonorPage';
import NgoPage from './pages/NgoPage';
import MatchingPage from './pages/MatchingPage';
import AnalyticsPage from './pages/AnalyticsPage';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;