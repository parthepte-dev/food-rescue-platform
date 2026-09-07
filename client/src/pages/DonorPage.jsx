import { useState, useEffect } from 'react';
import API from '../api';

function DonorPage() {
  const [donations, setDonations] = useState([]);
  const [form, setForm] = useState({
    donorName: '', foodType: '', quantity: '', unit: 'kg',
    location: '', expiryTime: ''
  });

  const fetchDonations = async () => {
    const res = await API.get('/donations');
    setDonations(res.data);
  };

  useEffect(() => { fetchDonations(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/donations', form);
    setForm({ donorName: '', foodType: '', quantity: '', unit: 'kg', location: '', expiryTime: '' });
    fetchDonations();
  };

  const hoursLeft = (expiry) => (new Date(expiry) - new Date()) / (1000 * 60 * 60);

  return (
    <div className="page-container">
      <h2 className="page-title">Donor Dashboard</h2>
      <p className="page-subtitle">List your surplus food and help it reach those who need it.</p>

      <form onSubmit={handleSubmit} className="card-form">
        <input name="donorName" placeholder="Your Name" value={form.donorName} onChange={handleChange} required />
        <input name="foodType" placeholder="Food Type (e.g. Cooked Rice)" value={form.foodType} onChange={handleChange} required />
        <input name="quantity" type="number" placeholder="Quantity (kg)" value={form.quantity} onChange={handleChange} required />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
        <label>Expiry Time</label>
        <input name="expiryTime" type="datetime-local" value={form.expiryTime} onChange={handleChange} required />
        <button type="submit" className="btn">List Donation</button>
      </form>

      <h3 className="section-title">Your Listed Donations</h3>
      {donations.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No donations yet.</p>}
      {donations.map(d => {
        const left = hoursLeft(d.expiryTime);
        const urgent = left < 6 && left > 0;
        return (
          <div key={d._id} className="item-card">
            <div className="item-title">{d.foodType} {urgent && '⏰'}</div>
            <div className="item-meta">{d.quantity}{d.unit} — {d.location}</div>
            <span className={`badge badge-${d.status}`}>{d.status}</span>
          </div>
        );
      })}
    </div>
  );
}

export default DonorPage;