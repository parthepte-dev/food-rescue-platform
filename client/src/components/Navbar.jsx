import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/donor">Donor</Link>
      <Link to="/ngo">NGO</Link>
      <Link to="/matching">Matching</Link>
      <Link to="/analytics">Analytics</Link>
      <Link to="/volunteer-tracking">Share Location</Link>
      <Link to="/track">Live Tracking</Link>
    </nav>
  );
}

export default Navbar;