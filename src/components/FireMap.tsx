import React, { useEffect, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "900px",
  height: "600px",
};

const fireMarkerURI = "/images/fire-marker.svg";
const questionMarkerURI = "/images/question-marker.svg";

interface FireMapProps {
  coordinates: {
    lat: number;
    lng: number;
  };
}

const FireMap = ({ coordinates }: FireMapProps) => {
  const [fireMarkers, updateFireMarkers] = useState([]);
  const [questionMarkers, updateQuestionMarkers] = useState([]);

  useEffect(() => {
    fetch("https://wetca.ca/blaze/maps/fires/", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        la: coordinates.lat,
        lo: coordinates.lng,
        radius: 500,
      }),
    })
      .then((r) => r.json())
      .then((json) => {
        const markers = json.map(
          (fire: { latitude: string; longitude: string }, index: number) => (
            <Marker
              key={index}
              position={{
                lat: JSON.parse(fire.latitude),
                lng: JSON.parse(fire.longitude),
              }}
              icon={fireMarkerURI}
            />
          )
        );
        updateFireMarkers(markers);
      });

    fetch("https://wetca.ca/blaze/report/reports", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        latitude: coordinates.lat,
        longitude: coordinates.lng,
      }),
    })
      .then((r) => r.json())
      .then((json) => {
        const markers = json.map(
          (fire: { latitude: string; longitude: string }, index: number) => (
            <Marker
              key={index}
              position={{
                lat: JSON.parse(fire.latitude),
                lng: JSON.parse(fire.longitude),
              }}
              icon={questionMarkerURI}
            />
          )
        );
        updateQuestionMarkers(markers);
      });
  }, []);
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: coordinates.lat, lng: coordinates.lng }}
      zoom={5}
    >
      {fireMarkers}
      {questionMarkers}
    </GoogleMap>
  );
};

export default FireMap;
