import React, { useEffect, useState, useRef } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const fireMarkerURI = "/images/fire-marker.svg";
const questionMarkerURI = "/images/question-marker.svg";

interface FireMapProps {
  coordinates: {
    lat: number;
    lng: number;
  };
}

const FireMap = ({ coordinates }: FireMapProps) => {
  const [fireMarkers, setFireMarkers] = useState<JSX.Element[]>([]);
  const [questionMarkers, setQuestionMarkers] = useState<JSX.Element[]>([]);
  const [zoom, setZoom] = useState(5);

  useEffect(() => {
    const fetchFireMarkers = async () => {
      try {
        const response = await fetch("https://wetca.ca/blaze/maps/fires/", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({
            la: coordinates.lat,
            lo: coordinates.lng,
            radius: zoom * 100,
          }),
        });
        const json = await response.json();
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
        setFireMarkers(markers);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFireMarkers();
  }, [zoom, coordinates]);

  useEffect(() => {
    const fetchQuestionMarkers = async () => {
      try {
        const response = await fetch("https://wetca.ca/blaze/report/reports", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({
            latitude: coordinates.lat,
            longitude: coordinates.lng,
          }),
        });
        const json = await response.json();
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
        setQuestionMarkers(markers);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuestionMarkers();
  }, [coordinates]);

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
          borderRadius: "18px",
          overflow: "hidden",
        }}
        center={{ lat: coordinates.lat, lng: coordinates.lng }}
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
