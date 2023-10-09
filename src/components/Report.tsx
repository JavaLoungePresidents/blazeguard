import React, { useState } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import usePlacesAutocomplete from "use-places-autocomplete";
import { FaSearch } from "react-icons/fa";
import { Container, Row, Button } from "react-bootstrap";

function Report() {
  const [reportStatus, setReportStatus] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const {
    suggestions: { data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
    setValue(event.target.value);
  };

  const handleSubmit = async () => {
    const apiUrl = "https://wetca.ca/blaze/report/submit";

    const currentDateTime = new Date().toISOString().split(".")[0];
    if (!(latitude || longitude)) {
      const postData = {
        report_datetime: currentDateTime,
        latitude: latitude,
        longitude: longitude,
        image: null,
      };
    }
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit report");
      }

      const responseData = await response.json();
      setReportStatus("Report submitted successfully");
    } catch (error) {
      console.error("Error submitting report:", error);
      setReportStatus("Error submitting report");
    }
  };

  return (
    <Container className="report-form" fluid="md">
      <Row>
        <h3>Location</h3>
      </Row>
      <Row id="report-fire">
        <InputGroup className="report-input">
          <FormControl
            type="text"
            placeholder="Enter a location"
            value={location}
            onChange={handleSearchChange}
            onBlur={() => clearSuggestions()}
            list="suggestions"
            className="report-bar-input"
          />
          <datalist id="suggestions">
            {data.map((suggestion) => (
              <option
                key={suggestion.place_id}
                value={suggestion.description}
              />
            ))}
          </datalist>
        </InputGroup>
      </Row>
      <Row className="btn-row">
        <div className="btn-container">
          <Button
            className="button-submit"
            id="light-btn"
            variant="primary"
            onClick={() => document.getElementById("fileToUpload")?.click()}
          >
            Select image to upload:
          </Button>
          <input
            type="file"
            name="fileToUpload"
            id="fileToUpload"
            className="hidden-input"
          ></input>
          <Button onClick={handleSubmit}>Submit Report</Button>
          {reportStatus && <p>{reportStatus}</p>}
        </div>
      </Row>
    </Container>
  );
}

export default Report;
