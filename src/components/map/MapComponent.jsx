import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import { ImLocation } from "react-icons/im";
import { divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";

import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

const MapComponent = () => {
  const iconMarkup = renderToStaticMarkup(
    <ImLocation className="bg-none border-none absolute top-0" size={"40px"} />
  );
  const customMarkerIcon = divIcon({
    html: iconMarkup,
  });
  return (
    <MapContainer center={defaultCenter} zoom={defaultZoom}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={position} icon={customMarkerIcon}>
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
const defaultCenter = [35.690011, 51.309085];
const position = [35.690011, 51.309085];
const limeOptions = { color: "red" };
const polyline = [
  [51.505, -0.09],
  [51.51, -0.1],
  [51.51, -0.12],
];
const defaultZoom = 8;
