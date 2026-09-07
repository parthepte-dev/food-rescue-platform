import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import socket from '../socket';

// Fix for default marker icon not showing in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function TrackingMapPage() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    socket.on('receiveLocation', (data) => {
      setLocation(data);
    });
    return () => socket.off('receiveLocation');
  }, []);

  const defaultCenter = [19.076, 72.8777]; // Mumbai, as fallback

  return (
    <div className="page-container" style={{ maxWidth: '900px' }}>
      <h2 className="page-title">🗺️ Live Delivery Tracking</h2>
      <p className="page-subtitle">
        {location ? `Tracking ${location.volunteerName}...` : 'Waiting for a volunteer to share their location...'}
      </p>

      <div style={{ height: '450px', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
        <MapContainer
          center={location ? [location.lat, location.lng] : defaultCenter}
          zoom={14}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          {location && (
            <Marker position={[location.lat, location.lng]}>
              <Popup>{location.volunteerName} is here</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
}

export default TrackingMapPage;