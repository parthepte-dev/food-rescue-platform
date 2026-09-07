import { useState, useEffect } from 'react';
import API from '../api';

function MatchingPage() {
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState('');
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    API.get('/donations').then(res => setDonations(res.data));
  }, []);

  const findMatches = async () => {
    if (!selectedDonation) return;
    setLoading(true);
    const res = await API.get(`/matches/for-donation/${selectedDonation}`);
    setMatches(res.data);
    setLoading(false);
  };

  const confirmMatch = async (requirementId, score) => {
    await API.post('/matches', { donationId: selectedDonation, requirementId, matchScore: score });
    findMatches();
  };

  return (
    <div className="page-container">
      <h2 className="page-title">🤖 Smart Matching</h2>
      <p className="page-subtitle">Select a donation to find the best-ranked NGO requirements using our scoring engine.</p>

      <div className="card-form" style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
        <select value={selectedDonation} onChange={(e) => setSelectedDonation(e.target.value)} style={{ flex: 1, minWidth: '200px' }}>
          <option value="">-- Select a Donation --</option>
          {donations.map(d => (
            <option key={d._id} value={d._id}>
              {d.foodType} — {d.quantity}{d.unit} — {d.location} ({d.status})
            </option>
          ))}
        </select>
        <button onClick={findMatches} className="btn">Find Matches</button>
      </div>

      <h3 className="section-title">Ranked Matches</h3>
      {loading && <p style={{ color: 'var(--text-muted)' }}>Scoring matches...</p>}
      {!loading && matches.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No matches yet — select a donation and click "Find Matches".</p>}
      {matches.map((m, i) => (
        <div key={m.requirement._id} className="item-card" style={m.requirement.urgency === 'emergency' ? { borderLeft: '4px solid var(--danger)' } : {}}>
          <div className="item-title">#{i + 1} — {m.requirement.ngoName}</div>
          <div className="item-meta">{m.requirement.foodType} — {m.requirement.quantityNeeded}{m.requirement.unit} — {m.requirement.location}</div>
          <span className={`badge badge-${m.requirement.urgency}`}>{m.requirement.urgency}</span>{' '}
          <span className="score-badge">Score: {m.score}</span>
          <div style={{ marginTop: '10px' }}>
            <button onClick={() => confirmMatch(m.requirement._id, m.score)} className="btn btn-outline">Confirm This Match</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MatchingPage;