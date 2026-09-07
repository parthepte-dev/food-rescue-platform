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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/requirements', form);
    setForm({ ngoName: '', foodType: '', quantityNeeded: '', unit: 'kg', location: '', urgency: 'normal' });
    fetchRequirements();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>NGO Dashboard</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input name="ngoName" placeholder="NGO Name" value={form.ngoName} onChange={handleChange} required />
        <input name="foodType" placeholder="Food Type Needed" value={form.foodType} onChange={handleChange} required />
        <input name="quantityNeeded" type="number" placeholder="Quantity Needed" value={form.quantityNeeded} onChange={handleChange} required />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
        <select name="urgency" value={form.urgency} onChange={handleChange}>
          <option value="normal">Normal</option>
          <option value="emergency">Emergency</option>
        </select>
        <button type="submit">Post Requirement</button>
      </form>

      <h3 style={{ marginTop: '30px' }}>Your Requirements</h3>
      {requirements.map(r => (
        <div key={r._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', borderRadius: '6px' }}>
          <strong>{r.foodType}</strong> — {r.quantityNeeded}{r.unit} — {r.location}
          <br />
          Urgency: {r.urgency} | Status: <span style={{ fontWeight: 'bold' }}>{r.status}</span>
        </div>
      ))}
    </div>
  );
}

export default NgoPage;