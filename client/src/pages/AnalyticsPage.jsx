import { useState, useEffect } from 'react';
import API from '../api';

function AnalyticsPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get('/analytics').then(res => setStats(res.data));
  }, []);

  if (!stats) return <p style={{ textAlign: 'center', marginTop: '40px' }}>Loading...</p>;

  return (
    <div className="page-container" style={{ maxWidth: '900px' }}>
      <h2 className="page-title">📊 Impact Dashboard</h2>
      <p className="page-subtitle">See the real difference your platform is making.</p>
      <div className="stats-grid">
        <div className="stat-card"><h3>{stats.totalDonations}</h3><p>Total Donations</p></div>
        <div className="stat-card"><h3>{stats.totalFoodDonatedKg} kg</h3><p>Food Rescued</p></div>
        <div className="stat-card"><h3>{stats.totalRequirements}</h3><p>NGO Requirements</p></div>
        <div className="stat-card"><h3>{stats.totalMatches}</h3><p>Successful Matches</p></div>
        <div className="stat-card"><h3>{stats.totalDelivered}</h3><p>Deliveries Completed</p></div>
      </div>
    </div>
  );
}

export default AnalyticsPage;