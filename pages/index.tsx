import AppNavbar from "@/components/AppNavbar";
import Heading from "@/components/Heading";
import FireMap from "@/components/FireMap";
import CardContainer from "@/components/CardContainer";
import ReportsGraph from "@/components/ReportsGraph";
import Report from "@/components/Report";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

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
  const [fires, setFires] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);

  const updateLocation = (newLocation: Location) => {
    if (!newLocation.lat && !newLocation.lng) return;
    setCoordinates({ lat: newLocation.lat, lng: newLocation.lng });
    setTextLocation(newLocation.textLocation);
  };

  useEffect(() => {
    const fetchFires = async () => {
      try {
        const response = await fetch("https://wetca.ca/blaze/maps/fires/", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({
            la: coordinates.lat,
            lo: coordinates.lng,
            radius: 500,
          }),
        });
        const fires = await response.json();
        setFires(fires);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFires();
  }, [coordinates]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("https://wetca.ca/blaze/report/reports/", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({
            latitude: coordinates.lat,
            longitude: coordinates.lng,
          }),
        });
        const reports = await response.json();
        setReports(reports);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReports();
  }, [coordinates]);

  return (
    <>
      <AppNavbar updateGlobalLocation={updateLocation} />
      <div>
        <Heading
          content={
            textLocation ? (
              <h1>
                Live fires near <span>{textLocation}</span>
              </h1>
            ) : (
              <h1>
                Please choose a <span>location</span>
              </h1>
            )
          }
        />
        <div className="container-xxl">
          <FireMap coordinates={coordinates} reports={reports} fires={fires} />
        </div>
        <div className="container-xxl">
          <Row>
            <Col xs={8} className="graph-container">
              <Heading
                content={
                  <h2>
                    Live fires this <span>month</span>
                  </h2>
                }
              />
              <CardContainer
                content={<ReportsGraph reports={reports} fires={fires} />}
              />
            </Col>
            <Col xs={4} className="report-container">
              <Heading
                content={
                  <h2>
                    Report a <span>fire</span>
                  </h2>
                }
              />
              <CardContainer content={<Report />} />
            </Col>
          </Row>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Index;
