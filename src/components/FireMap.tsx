import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "900px",
  height: "600px",
};

const fireMarkerURI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABg2lDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TpVIqDmYQcchQdbGLijiWKhbBQmkrtOpgcukXNDEkKS6OgmvBwY/FqoOLs64OroIg+AHi6uKk6CIl/i8ptIjx4Lgf7+497t4BQrPGNKsnDmi6bWaSCSlfWJFCrwgjBBHjEGVmGansQg6+4+seAb7exXiW/7k/R79atBgQkIjjzDBt4nXimU3b4LxPLLKKrBKfE0+YdEHiR64rHr9xLrss8EzRzGXmiEViqdzFSheziqkRTxNHVU2nfCHvscp5i7NWq7P2PfkLI0V9Oct1miNIYhEppCFBQR1V1GAjRqtOioUM7Sd8/MOuP00uhVxVMHLMYwMaZNcP/ge/u7VKU5NeUiQB9L44zscoENoFWg3H+T52nNYJEHwGrvSOf6MJzH6S3uho0SNgYBu4uO5oyh5wuQMMPRmyKbtSkKZQKgHvZ/RNBWDwFgiver2193H6AOSoq6Ub4OAQGCtT9prPu/u6e/v3TLu/H6stcr2AH40oAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH5woHFCgJL1y8IAAAAJZJREFUWMPtllEOwCAIQyvZGXfIXdJ9b8m0TBBj6L/lgWgKpIJVLEzqifowvXjfw7Lw1Al8Fdd0DwAS1fkQgKUksnuXCWgBXa5AA+G2AyyE6xIyEMKYWC8eDWBRuOex7j/wJh+ZRuuseL7xPb/iBNgOoMzY+lZKWnsCFlPoZUQqQP6FYAIqnWC1EGw6VsfyHog2lqfCdQNETTgccDBqqgAAAABJRU5ErkJggg=="


const FireMap = ({ fireList }) => {
  const fireMarkers = fireList.map((fire, index) =>
      <Marker key={index} position={{ lat: fire.latitude, lng: fire.longitude }} icon={fireMarkerURI} />
  ) 

  return (
    <LoadScript googleMapsApiKey="AIzaSyArBIg50Ku4QTfoyPSW3xbA3cUh_VjZlsI">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: 40, lng: -83 }}
        zoom={3}
      >
        {fireMarkers}
      </GoogleMap>
    </LoadScript>
  );
}

export default FireMap;