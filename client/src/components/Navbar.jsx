import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ display: 'flex', gap: '20px', padding: '15px', background: '#222', justifyContent: 'center' }}>
      <Link to="/" style={{ color: 'white' }}>Home</Link>
      <Link to="/donor" style={{ color: 'white' }}>Donor</Link>
      <Link to="/ngo" style={{ color: 'white' }}>NGO</Link>
      <Link to="/matching" style={{ color: 'white' }}>Matching</Link>
      <Link to="/analytics" style={{ color: 'white' }}>Analytics</Link>
    </nav>
  );
}

export default Navbar;