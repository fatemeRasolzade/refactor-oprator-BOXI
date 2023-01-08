import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

const MapComponent = () => {
  return (
    <MapContainer center={defaultCenter} zoom={defaultZoom}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <Polyline pathOptions={limeOptions} positions={polyline} />
      {/* <FeatureGroup
    ref={(featureGroupRef) => {
      onFeatureGroupReady(featureGroupRef);
    }}
  >
    <EditControl position="topright" onCreated={onCreated} />
  </FeatureGroup> */}
    </MapContainer>
  );
};

export default MapComponent;
const defaultCenter = [38.9072, -77.0369];
const position = [51.505, -0.09];
const limeOptions = { color: "red" };
const polyline = [
  [51.505, -0.09],
  [51.51, -0.1],
  [51.51, -0.12],
];
const defaultZoom = 8;
