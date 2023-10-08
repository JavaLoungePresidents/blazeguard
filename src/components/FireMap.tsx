import React, { useEffect, useState, useRef } from "react";
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
  const [fireMarkers, setFireMarkers] = useState<JSX.Element[]>([]);
  const [questionMarkers, setQuestionMarkers] = useState<JSX.Element[]>([]);
  const [center, setCenter] = useState(coordinates);
  const [zoom, setZoom] = useState(5);

  const mapRef = useRef<google.maps.Map>();

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

  const handleCenterChange = () => {
    const newCenter = mapRef.current?.getCenter();
    if (newCenter) {
      setCenter({ lat: newCenter.lat(), lng: newCenter.lng() });
    }
  };

  return (
    <GoogleMap
      ref={(map) => {
        mapRef.current = map;
      }}
      mapContainerStyle={containerStyle}
      center={{ lat: center.lat, lng: center.lng }}
      zoom={5}
      onZoomChanged={handleZoomChange}
      onCenterChanged={handleCenterChange}
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
  );
};

export default FireMap;
