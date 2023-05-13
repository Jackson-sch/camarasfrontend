const mapService = {
  loadMapsScript(callback) {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.apiKey}&libraries=places`;
    script.async = true;
    script.onload = () => {
      callback();
    };
    document.head.appendChild(script);
  },
};

export default mapService;
