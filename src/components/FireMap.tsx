import React, { useEffect, useState, useRef } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const fireMarkerURI = "/images/fire-marker.svg";
const questionMarkerURI = "/images/question-marker.svg";

interface FireMapProps {
  reports: any;
  fires: any;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const FireMap = (coordinatesData: FireMapProps) => {
  const [fireMarkers, setFireMarkers] = useState<JSX.Element[]>([]);
  const [questionMarkers, setQuestionMarkers] = useState<JSX.Element[]>([]);
  const [zoom, setZoom] = useState(5);

  useEffect(() => {
    if (!coordinatesData.fires) return;
    const markers = coordinatesData.fires.map(
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
    setFireMarkers(markers);
  }, [zoom, coordinatesData]);

  useEffect(() => {
    if (!coordinatesData.reports) return;
    const markers = coordinatesData.reports.map(
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
    setQuestionMarkers(markers);
  }, [coordinatesData]);

  const handleZoomChange = () => {
    setZoom(zoom + 1);
  };

  return (
    <div className="map">
      <GoogleMap
        mapContainerStyle={{
          height: "75vh",
          width: "95%",
          margin: "0 auto",
          padding: "0",
          borderRadius: "18px",
          overflow: "hidden",
        }}
        center={{
          lat: coordinatesData.coordinates.lat,
          lng: coordinatesData.coordinates.lng,
        }}
        zoom={5}
        onZoomChanged={handleZoomChange}
        options={{
          minZoom: 3,
          maxZoom: 10,
          mapTypeId: "hybrid",
          styles: [
            {
              featureType: "all",
              elementType: "labels",
              stylers: [{ visibility: "on" }],
            },
          ],
        }}
      >
        {fireMarkers}
        {questionMarkers}
      </GoogleMap>
    </div>
  );
};

export default FireMap;
