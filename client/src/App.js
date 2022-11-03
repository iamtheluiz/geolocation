import ReactDOMServer  from 'react-dom/server';
import Leaflet, { Icon, DivIcon } from "leaflet";
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import './App.css';
import 'leaflet/dist/leaflet.css';
import { useLocation } from './context/location';

import { FaBusAlt } from "react-icons/fa";

let mapIcons = {};

mapIcons['bus'] = Leaflet.divIcon({
  html: ReactDOMServer.renderToString(<FaBusAlt size={32} color="#5712a0" />),
  className: "",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function App() {
  const { locations } = useLocation();

  return (
    <div className="App" style={{ width: '100%', height: '100vh' }}>
      <MapContainer center={[-24.160802, -46.7771013]} zoom={14} scrollWheelZoom={true} style={{ height: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map(location => <Marker key={location.name} icon={mapIcons['bus']} position={[location.latitude, location.longitude]} />)}
      </MapContainer>
    </div>
  );
}

export default App;
