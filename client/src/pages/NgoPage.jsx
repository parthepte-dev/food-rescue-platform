import { useState, useEffect } from 'react';
import API from '../api';

function NgoPage() {
  const [requirements, setRequirements] = useState([]);
  const [form, setForm] = useState({
    ngoName: '', foodType: '', quantityNeeded: '', unit: 'kg',
    location: '', urgency: 'normal'
  });

  const fetchRequirements = async () => {
    const res = await API.get('/requirements');
    setRequirements(res.data);
  };

  useEffect(() => { fetchRequirements(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/requirements', form);
    setForm({ ngoName: '', foodType: '', quantityNeeded: '', unit: 'kg', location: '', urgency: 'normal' });
    fetchRequirements();
  };

  const sorted = [...requirements].sort((a, b) => (b.urgency === 'emergency') - (a.urgency === 'emergency'));

  return (
    <div className="page-container">
      <h2 className="page-title">NGO Dashboard</h2>
      <p className="page-subtitle">Post your food requirements and get matched with nearby donors.</p>

      <form onSubmit={handleSubmit} className="card-form">
        <input name="ngoName" placeholder="NGO Name" value={form.ngoName} onChange={handleChange} required />
        <input name="foodType" placeholder="Food Type Needed" value={form.foodType} onChange={handleChange} required />
        <input name="quantityNeeded" type="number" placeholder="Quantity Needed (kg)" value={form.quantityNeeded} onChange={handleChange} required />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
        <select name="urgency" value={form.urgency} onChange={handleChange}>
          <option value="normal">Normal</option>
          <option value="emergency">🚨 Emergency</option>
        </select>
        <button type="submit" className="btn">Post Requirement</button>
      </form>

      <h3 className="section-title">Your Requirements</h3>
      {sorted.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No requirements posted yet.</p>}
      {sorted.map(r => (
        <div key={r._id} className="item-card" style={r.urgency === 'emergency' ? { borderLeft: '4px solid var(--danger)' } : {}}>
          <div className="item-title">{r.foodType}</div>
          <div className="item-meta">{r.quantityNeeded}{r.unit} — {r.location}</div>
          <span className={`badge badge-${r.urgency}`}>{r.urgency === 'emergency' ? '🚨 Emergency' : 'Normal'}</span>{' '}
          <span className={`badge badge-${r.status}`}>{r.status}</span>
        </div>
      ))}
    </div>
  );
}

export default NgoPage;