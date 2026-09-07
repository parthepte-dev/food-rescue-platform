import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>🍲 Smart Food Rescue & Distribution Platform</h1>
      <p>Connecting donors, NGOs, and volunteers to reduce food waste.</p>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px' }}>
        <Link to="/donor"><button>Donor Dashboard</button></Link>
        <Link to="/ngo"><button>NGO Dashboard</button></Link>
      </div>
    </div>
  );
}

export default Home;