const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation not supported.");
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        resolve(coords);
      },
      error => {
        reject(error.message);
      }
    );
  });
};

export { getCurrentPosition };
