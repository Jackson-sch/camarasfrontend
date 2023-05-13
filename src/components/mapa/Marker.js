export function createInfoWindow(markers) {
  const content = `
    <div>
      <h1>${markers.name}</h1>
      <p>${markers.address}</p>
      <p>${markers.description}</p>
    </div>
  `;
  const infoWindow = new window.google.maps.InfoWindow({ content });
  return infoWindow;
}
