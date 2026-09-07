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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/donations', form);
    setForm({ donorName: '', foodType: '', quantity: '', unit: 'kg', location: '', expiryTime: '' });
    fetchDonations();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Donor Dashboard</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input name="donorName" placeholder="Your Name" value={form.donorName} onChange={handleChange} required />
        <input name="foodType" placeholder="Food Type (e.g. Cooked Rice)" value={form.foodType} onChange={handleChange} required />
        <input name="quantity" type="number" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
        <label>Expiry Time:</label>
        <input name="expiryTime" type="datetime-local" value={form.expiryTime} onChange={handleChange} required />
        <button type="submit">List Donation</button>
      </form>

      <h3 style={{ marginTop: '30px' }}>Your Listed Donations</h3>
      {donations.map(d => (
        <div key={d._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', borderRadius: '6px' }}>
          <strong>{d.foodType}</strong> — {d.quantity}{d.unit} — {d.location}
          <br />
          Status: <span style={{ fontWeight: 'bold' }}>{d.status}</span>
        </div>
      ))}
    </div>
  );
}

export default DonorPage;