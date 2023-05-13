export const geocodeLatLng = async (lat, lng, apiKey) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();
  
  if (data.status === "OK") {
    const addressComponents = data.results[0].address_components;
    const address = data.results[0].formatted_address;
    let streetNumber = null;
    let streetName = null;
    let city = null;
    let state = null;
    let country = null;
    
    for (let i = 0; i < addressComponents.length; i++) {
      const component = addressComponents[i];
      const componentType = component.types[0];

      if (componentType === "street_number") {
        streetNumber = component.long_name;
      }

      if (componentType === "route") {
        streetName = component.long_name;
      }

      if (componentType === "locality") {
        city = component.long_name;
      }

      if (componentType === "administrative_area_level_1") {
        state = component.short_name;
      }

      if (componentType === "country") {
        country = component.long_name;
      }

      if (streetNumber && streetName && city && state && country) {
        break;
      }
  }

  return { 
    street: `${streetName} ${streetNumber}`,
    city,
    state,
    country,
    fullAdress: address 
  };
  }  else {
    return {
      street: null,
      city: null,
      state: null,
      country: null,
      fullAddress: "No se pudo obtener la dirección"
    }
  }
};

