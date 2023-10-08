import React, { useEffect, useRef } from 'react';

const SearchBar: React.FC = (): JSX.Element => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const searchBoxInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || !searchBoxInputRef.current) {
      return;
    }
// Delete Below when integrating map
    const FireMap = new google.maps.Map(mapContainerRef.current, {
      center: { lat: -33.8688, lng: 151.2195 },
      zoom: 13,
      mapTypeId: 'roadmap',
    });
// Delete Above ^ once merged
    const searchBox = new google.maps.places.SearchBox(searchBoxInputRef.current);
    FireMap.controls[google.maps.ControlPosition.TOP_LEFT].push(searchBoxInputRef.current);

    FireMap.addListener('bounds_changed', () => {
      searchBox.setBounds(FireMap.getBounds() as google.maps.LatLngBounds);
    });

    let markers: google.maps.Marker[] = [];
    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();

      if (places.length === 0) {
        return;
      }

      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];

      const bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log('Returned place contains no geometry');
          return;
        }

        const icon = {
          url: place.icon!,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };

        markers.push(
          new google.maps.Marker({
            icon,
            title: place.name!,
            position: place.geometry.location,
          }),
        );

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      FireMap.fitBounds(bounds);
    });

    // Clean up listeners on component unmount
    return () => {
      google.maps.event.clearInstanceListeners(searchBox);
      google.maps.event.clearInstanceListeners(FireMap);
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '400px' }}>
        <div style={{ display: 'flex', width: '520px', border: '1px solid black', backgroundColor: 'lightblue' }}></div>
      <input id="pac-input" ref={searchBoxInputRef} type="text" placeholder="Enter your location" style={{
        backgroundColor: 'black',  // Background color of the search bar
        color: 'lightgrey',               // Text color
        marginLeft: '35em',
        borderRadius: '0.7em',
        width: '35em',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
    }}/>
      <div id="map" ref={mapContainerRef} style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default SearchBar;
