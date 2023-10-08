import AppNavbar from "@/components/AppNavbar";
import Heading from "@/components/Heading";
import FireMap from "@/components/FireMap";
import { useState } from "react";

interface Coordinates {
  lat: number;
  lng: number;
}

interface Location extends Coordinates {
  textLocation: string;
}

const Index = () => {
  const [coordinates, setCoordinates] = useState<Coordinates>({
    lat: 0,
    lng: 0,
  });
  const [textLocation, setTextLocation] = useState<string | null>(null);

  const updateLocation = (newLocation: Location) => {
    if (!newLocation.lat && !newLocation.lng) return;
    setCoordinates({ lat: newLocation.lat, lng: newLocation.lng });
    setTextLocation(newLocation.textLocation);
  };

  return (
    <>
      <AppNavbar updateGlobalLocation={updateLocation} />
      {textLocation ? (
        <div>
          <Heading
            content={
              <h2>
                Live fires near <span>{textLocation}</span>
              </h2>
            }
          />
          <FireMap coordinates={coordinates} />
        </div>
      ) : (
        <>
          <div>
            <Heading
              content={
                <h2>
                  Please choose a <span>location</span>.
                </h2>
              }
            />
          </div>
          <FireMap coordinates={coordinates} />
        </>
      )}
      )
    </>
  );
};

export default Index;
