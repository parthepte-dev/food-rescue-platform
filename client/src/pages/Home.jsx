import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="hero">
      <h1>🍲 Smart Food Rescue & Distribution</h1>
      <p>Connecting donors, NGOs, and volunteers with smart matching to reduce food waste and fight hunger.</p>
      <div className="hero-buttons">
        <Link to="/donor"><button className="btn">I'm a Donor</button></Link>
        <Link to="/ngo"><button className="btn btn-outline">I'm an NGO</button></Link>
      </div>
    </div>
  );
}

export default Home;