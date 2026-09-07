import { useState, useEffect, useRef } from 'react';
import socket from '../socket';

function VolunteerTrackingPage() {
  const [sharing, setSharing] = useState(false);
  const [position, setPosition] = useState(null);
  const watchId = useRef(null);

  const startSharing = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    watchId.current = navigator.geolocation.watchPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setPosition(coords);
        socket.emit('sendLocation', { volunteerName: 'Volunteer', ...coords });
      },
      (err) => alert('Location error: ' + err.message),
      { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
    );
    setSharing(true);
  };

  const stopSharing = () => {
    if (watchId.current) navigator.geolocation.clearWatch(watchId.current);
    setSharing(false);
  };

  useEffect(() => {
    return () => { if (watchId.current) navigator.geolocation.clearWatch(watchId.current); };
  }, []);

  return (
    <div className="page-container">
      <h2 className="page-title">📍 Volunteer Live Tracking</h2>
      <p className="page-subtitle">Share your live location while delivering food.</p>

      <div className="card-form" style={{ alignItems: 'center' }}>
        {!sharing ? (
          <button onClick={startSharing} className="btn">Start Sharing Location</button>
        ) : (
          <button onClick={stopSharing} className="btn" style={{ background: 'var(--danger)' }}>Stop Sharing</button>
        )}
        {position && (
          <p style={{ marginTop: '10px', color: 'var(--text-muted)' }}>
            Current: {position.lat.toFixed(5)}, {position.lng.toFixed(5)}
          </p>
        )}
      </div>
    </div>
  );
}

export default VolunteerTrackingPage;