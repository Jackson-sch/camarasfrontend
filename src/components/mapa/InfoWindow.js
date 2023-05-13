import React, { useEffect } from "react";
import { InfoWindow } from "@react-google-maps/api";
import { geocodeLatLng } from "./Geocode";
import config from "./config";

export const createInfoWindow = async (marker) => {
  const address = await geocodeLatLng(marker.lat, marker.lng, config.REACT_APP_GOOGLE_MAPS_API_KEY);
  const content = `
    <div>
      <h3>
        <b>${marker.name}</b>
      </h3>
      <p class="mb-1">${address.street}</p>
      <p class="mb-1">${address.city}, ${address.state}</p>
      <p class="mb-1">${address.country}</p>
    </div>
  `;
  return new window.google.maps.InfoWindow({
    content: content,
    position: { lat: marker.lat, lng: marker.lng },
  });

};

const MyInfoWindow = ({ marker, onCloseClick }) => {
  useEffect(() => {
    const infoWindow = createInfoWindow(marker);
    if (infoWindow) {
      infoWindow.open();
    }
    
    return () => {
      if (infoWindow) {
        infoWindow.close();
      }
    };
  }, [marker]);
    
    return <InfoWindow onCloseClick={onCloseClick}></InfoWindow>;
    };

    export default MyInfoWindow;
