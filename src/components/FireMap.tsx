import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "900px",
  height: "600px",
};

const fireMarkerURI = "/images/fire-marker.svg"
const questionMarkerURI = "/images/question-marker.svg"

const FireMap = ({ coordinates }) => {

  const [fireMarkers, updateFireMarkers] = useState([])
  const [questionMarkers, updateQuestionMarkers] = useState([])

  const [ref, setRef] = useState(null)

  useEffect(() => {
    fetch("https://wetca.ca/blaze/maps/fires/", {
      headers: { "Content-Type": "application/json" },
      method: "POST", 
      body: JSON.stringify({
        "la": coordinates.latitude,
        "lo": coordinates.longitude,
        "radius": 500
      })
    }).then(r => r.json()).then((json) => {
      const markers = json.map((fire, index) => (
        <Marker key={index} position={{
            lat: JSON.parse(fire.latitude),
            lng: JSON.parse(fire.longitude)
        }} icon={fireMarkerURI} />
      ))
      updateFireMarkers(markers)
    })

    fetch("https://wetca.ca/blaze/report/reports", {
      headers: { "Content-Type": "application/json", },
      method: "POST", 
      body: JSON.stringify({
        "latitude": coordinates.latitude,
        "longitude": coordinates.longitude,
      })
    }).then(r => r.json()).then((json) => {
      const markers = json.map((fire, index) => (
        <Marker key={index} position={{
            lat: JSON.parse(fire.latitude),
            lng: JSON.parse(fire.longitude)
        }} icon={questionMarkerURI} />
      ))
      updateQuestionMarkers(markers)
    })

    
  }, [])

  return (
    <LoadScript 
      googleMapsApiKey={process.env.NEXT_PUBLIC_MAPS_KEY}
      onMapLoad={ (R) => { console.log('ref: ', R) } }
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: coordinates.latitude, lng: coordinates.longitude }}
        zoom={5}
        onCenterChanged={ (event) => console.log(event, ref) }
      >
        {fireMarkers}
        {questionMarkers}
      </GoogleMap>
    </LoadScript>
  );
}

export default FireMap;