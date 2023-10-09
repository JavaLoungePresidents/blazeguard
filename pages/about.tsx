import { Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";

function About() {
  return (
    <Container className="d-block justify-content-center align-items-center d-flex">
      <Container className="section1 m-6 about-container">
        <h2>About BlazeGuard</h2> <br />
        <p>
          We, as the Java Lounge Presidents, have developed "BlazeGuard", a
          full-stack web application aimed at improving fire and natural
          resource monitoring. For this project, we have decided to have our
          application leverage NASA's freely available VIIRS satellite-derived
          active forest fire data and use various technologies to help inform
          the public about local wild fires. To accomplish this objective, we
          mark this data on a web app where viewers have an interactive map
          which they can use to locate wildfires in their locality. On top of
          that, users are able to report any local wildfires by providing
          photos, of which we use an AI to detect if it's valid and use that to
          give us local data to help create more real-time data for users and to
          confirm the legitimacy of satellite data.
        </p>
        <br />
        <Nav.Link href="/" className="nav-links back-btn">
          Back to Home
        </Nav.Link>
        <br />
        <br />
      </Container>
    </Container>
  );
}

export default About;
