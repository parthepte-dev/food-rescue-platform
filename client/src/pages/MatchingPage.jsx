import { useState, useEffect } from 'react';
import API from '../api';

function MatchingPage() {
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState('');
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    API.get('/donations').then(res => setDonations(res.data));
  }, []);

  const findMatches = async () => {
    if (!selectedDonation) return;
    const res = await API.get(`/matches/for-donation/${selectedDonation}`);
    setMatches(res.data);
  };

  const confirmMatch = async (requirementId, score) => {
    await API.post('/matches', {
      donationId: selectedDonation,
      requirementId,
      matchScore: score
    });
    alert('Match confirmed!');
    findMatches();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: '0 auto' }}>
      <h2>🤖 Smart Matching</h2>
      <p>Select a donation to find the best-matching NGO requirements, ranked by AI scoring.</p>

      <select value={selectedDonation} onChange={(e) => setSelectedDonation(e.target.value)}>
        <option value="">-- Select a Donation --</option>
        {donations.map(d => (
          <option key={d._id} value={d._id}>
            {d.foodType} — {d.quantity}{d.unit} — {d.location} ({d.status})
          </option>
        ))}
      </select>
      <button onClick={findMatches} style={{ marginLeft: '10px' }}>Find Matches</button>

      <h3 style={{ marginTop: '30px' }}>Ranked Matches</h3>
      {matches.length === 0 && <p>No matches yet — select a donation and click "Find Matches".</p>}
      {matches.map((m, i) => (
        <div key={m.requirement._id} style={{
          border: '1px solid #ccc', padding: '10px', marginBottom: '10px', borderRadius: '6px'
        }}>
          <strong>#{i + 1} — {m.requirement.ngoName}</strong>
          <br />
          {m.requirement.foodType} — {m.requirement.quantityNeeded}{m.requirement.unit} — {m.requirement.location}
          <br />
          Urgency: {m.requirement.urgency}
          <br />
          <span style={{ fontWeight: 'bold', color: 'green' }}>Match Score: {m.score}</span>
          <br />
          <button onClick={() => confirmMatch(m.requirement._id, m.score)} style={{ marginTop: '8px' }}>
            Confirm This Match
          </button>
        </div>
      ))}
    </div>
  );
}

export default MatchingPage;