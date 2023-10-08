import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import usePlacesAutocomplete from "use-places-autocomplete";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
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

  const handleSearchSubmit = async () => {
    if (!location) return;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.NEXT_PUBLIC_MAPS_KEY}`
    );
    const data = await response.json();
    const { lat, lng } = data.results[0].geometry.location;
    setLatitude(lat);
    setLongitude(lng);
  };

  return (
    <InputGroup className="search-bar">
      <FormControl
        type="text"
        placeholder="Enter a location"
        value={location}
        onChange={handleSearchChange}
        onBlur={() => clearSuggestions()}
        list="suggestions"
        className="search-bar-input"
      />
      <datalist id="suggestions">
        {data.map((suggestion) => (
          <option key={suggestion.place_id} value={suggestion.description} />
        ))}
      </datalist>
      <Button
        onClick={handleSearchSubmit}
        className="search-bar-button"
      >
        <FaSearch className="search-bar-icon" />
      </Button>
    </InputGroup>
  );
};

export default SearchBar;
