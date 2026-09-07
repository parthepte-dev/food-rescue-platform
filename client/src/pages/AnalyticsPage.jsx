import { useState, useEffect } from 'react';
import API from '../api';

function AnalyticsPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get('/analytics').then(res => setStats(res.data));
  }, []);

  if (!stats) return <p style={{ textAlign: 'center' }}>Loading...</p>;

  const cardStyle = {
    border: '1px solid #ccc', borderRadius: '10px', padding: '20px',
    textAlign: 'center', minWidth: '150px'
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>📊 Impact Dashboard</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '30px' }}>
        <div style={cardStyle}>
          <h3>{stats.totalDonations}</h3>
          <p>Total Donations</p>
        </div>
        <div style={cardStyle}>
          <h3>{stats.totalFoodDonatedKg} kg</h3>
          <p>Food Rescued</p>
        </div>
        <div style={cardStyle}>
          <h3>{stats.totalRequirements}</h3>
          <p>NGO Requirements</p>
        </div>
        <div style={cardStyle}>
          <h3>{stats.totalMatches}</h3>
          <p>Successful Matches</p>
        </div>
        <div style={cardStyle}>
          <h3>{stats.totalDelivered}</h3>
          <p>Deliveries Completed</p>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;