import React, { Component } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { mapStyles } from "../../../../components/mapa/mapStyles";
import config from "../../../../components/mapa/config";

const containerStyle = {
  width: "100%",
  height: "100%",
};

class MiniMapaMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }

  render() {
    const { lat, lng, ubicacion, tipoOcurrencia } = this.props;
    const { selected } = this.state;
    return (
      <LoadScript googleMapsApiKey={config.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={16}
          center={{ lat, lng }}
          options={{ styles: mapStyles }}
        >
          <Marker
            position={{ lat, lng }}
            onClick={() => {
              this.setState({ selected: { ubicacion, tipoOcurrencia } });
            }}
          />
          {selected && (
            <InfoWindow
              position={{ lat, lng }}
              onCloseClick={() => {
                this.setState({ selected: null });
              }}
            >
              <div>
                <p>{selected.tipoOcurrencia}</p>
                <p>{selected.ubicacion}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    );
  }
}

export default MiniMapaMarker;
