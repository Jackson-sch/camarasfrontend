/* These lines of code are importing necessary modules and components for the Map component. */
import React, { Component } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { mapStyles } from "./mapStyles";
import config from "./config";
import markersData from "./markers.json";
import { createInfoWindow } from "./InfoWindow";
import { geocodeLatLng } from "./Geocode";
import Modals from "../../views/dashboard/incidencias/modal";

/* El componente del mapa representa un componente GoogleMap, que representa un componente de marcador para cada marcador en
La matriz MarkersData.
*/
class Map extends Component {
  /**
   * La función del constructor es un método especial para crear e inicializar un objeto creado dentro de
   * a class.
   * @param props - The props passed to your component.
   */
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: -8.0827995,
        lng: -79.0029054,
      },
      markers: [], // Lista de marcadores en el mapa
      activeMarker: null,
      address: "",
      city: "",
      state: "",
      country: "",
      showModal: false, // Estado de modalidad de registro
      newMarkerLat: null,
      newMarkerLng: null
    };
  }

  /* Esta función se llama cuando se hace clic en un marcador.Crea una nueva ventana de información y la abre en el
mapa.También establece el marcador activo en el estado. */
  handleMarkerClick = async (marker) => {
    //Se extraen los datos geográficos del marcador
    const { street, city, state, country } = await geocodeLatLng(
      marker.lat,
      marker.lng,
      config.REACT_APP_GOOGLE_MAPS_API_KEY
    );
    //Se crea la ventana de información con los datos del marcador
    const infoWindow = await createInfoWindow(
      marker,
      street,
      city,
      state,
      country
    );
    infoWindow.open(this.map, marker);
    //Se establece el marcador activo y los detalles del marcador
    this.setState({
      activeMarker: marker,
      address: street,
      city: city,
      state: state,
      country: country,
    });
  };

  /* Una función que se llama cuando se carga el mapa.Guarda una referencia al mapa en el estado. */
  handleMapLoad = (map) => {
    this.map = map;
  };

  /* Una función que se llama cuando se hace clic en el mapa.Crea un nuevo objeto marcador y lo agrega a
el estado de marcadores. */
  handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    //Se obtiene la dirección del objeto
    const { street } = await geocodeLatLng(
      lat,
      lng,
      config.REACT_APP_GOOGLE_MAPS_API_KEY
    );
    //Se crea un nuevo marcador para el objeto y se agrega a la lista de marcadores
    const newMarker = {
      id: Date.now(),
      lat: lat,
      lng: lng,
      name: "New Marker",
      address: street,
      description: "New Description"
    };
    const markers = [...this.state.markers, newMarker];
    //Se establece el nuevo estado del marcador
    this.setState({
      markers,
      showModal: true,
      newMarkerLat: lat,
      newMarkerLng: lng,
      address: street
    });
  };

  //Función para cancelar el marcador después de haber sido agregado
  handleCancelMarker = () => {
    const markers = [...this.state.markers];
    markers.pop();
    this.setState({
      markers,
      showModal: false
    });
  };

  //Función para cerrar el modal de registro
  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const containerStyle = {
      width: "100%",
      height: "600px"
    };

    return (
      <LoadScript googleMapsApiKey={config.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          onLoad={this.handleMapLoad}
          mapContainerStyle={containerStyle}
          center={this.state.center}
          zoom={16}
          options={{
            styles: mapStyles,
            scrollwheel: true
          }}
          onClick={this.handleMapClick}
        >
          {/*Recorrer la lista de marcadores y pintarlos en el mapa */}
          {markersData.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => this.handleMarkerClick(marker)}
              label={{
                text: marker.name,
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
                fontFamily: "Roboto",
                fontStyle: "italic",
                textAnchor: "middle",
                textAlign: "center"
              }}
            />
          ))}

          {/*Pintar marcadores creados por el usuario*/}
          {this.state.markers.map((marker) => (
            <Marker
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => this.handleMarkerClick(marker)}
            />
          ))}
        </GoogleMap>
        {/*Mostrar formulario de registro si showModal es verdadero*/}
        {this.state.showModal ? (
          <Modals
            show={() => this.setState({ showModal: false })}
            onHide={this.handleCloseModal}
            lat={this.state.newMarkerLat}
            lng={this.state.newMarkerLng}
            address={this.state.address}
            onCancelMarker={this.handleCancelMarker}
          />
        ) : null}
      </LoadScript>
    );
  }
}

export default Map;