import React, { useEffect, useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import usePlacesAutocomplete from "use-places-autocomplete";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  onLocationChange: (location: {
    lat: number;
    lng: number;
    textLocation: string;
  }) => void;
}

const SearchBar = ({ onLocationChange }: SearchBarProps) => {
  const [locValue, setLocValue] = useState<string>("");
  const [textLocation, setTextLocation] = useState<string>("Toronto, Ontario");

  const {
    suggestions: { data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocValue(event.target.value);
    setValue(event.target.value);
  };

  const handleSearchSubmit = async () => {
    if (!locValue) return;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${locValue}&key=${process.env.NEXT_PUBLIC_MAPS_KEY}`
    );
    const data = await response.json();
    if (data.results.length === 0) return;
    const { lat, lng } = data.results[0].geometry.location;
    if (!lat || !lng) return;
    if (lat && lng) {
      setTextLocation(locValue);
      onLocationChange({ lat, lng, textLocation });
    }
    clearSuggestions();
  };

  useEffect(() => {
    handleSearchSubmit();
  }, [textLocation]);

  return (
    <InputGroup className="search-bar">
      <FormControl
        type="text"
        placeholder="Enter a location"
        value={locValue}
        onChange={handleSearchChange}
        onBlur={() => clearSuggestions()}
        list="suggestions"
        className="search-bar-input"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSearchSubmit();
          }
        }}
      />
      <datalist id="suggestions">
        {data.map((suggestion) => (
          <option key={suggestion.place_id} value={suggestion.description} />
        ))}
      </datalist>
      <Button onClick={handleSearchSubmit} className="search-bar-button">
        <FaSearch className="search-bar-icon" />
      </Button>
    </InputGroup>
  );
};

export default SearchBar;
