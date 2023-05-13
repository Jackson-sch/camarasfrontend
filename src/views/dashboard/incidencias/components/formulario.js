import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from "dayjs/plugin/timezone";
import { Button, TextField, Grid, MenuItem } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { esES } from "@mui/x-date-pickers/locales";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// SweetAlert2
import Swal from "sweetalert2";

/* Importar una función desde un archivo llamado API.JS. */
import { createIncidencia } from "../api";

/* Iconos de los botones */
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

dayjs.extend(utc);
dayjs.extend(timezone)
// Componente que renderiza el formulario dentro del modal
const Form = ({ lat, lng, address, onHide, onCancelMarker }) => {
  const initialIncidencia = {
    fechaHora: new Date().toISOString().slice(0, 19),
    turno: "",
    apellidos: "",
    nombres: "",
    clasificacion: "",
    operador: "",
    camara: "",
    tipoOcurrencia: "",
    zona: "",
    comisaria: "",
    ubicacion: address,
    latitud: lat,
    longitud: lng,
    sectorMapa: "",
    vehiculoApoyo: "",
    observaciones: "",
  };

  const [incidencia, setIncidencia] = useState(initialIncidencia);

  const [value, setValue] = useState(dayjs());

  const isInCurrentYear = (date) => date.get('year') !== dayjs().get('year');

  const localValue = value.utc().tz('America/Lima')

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIncidencia({
      ...incidencia,
      [name]: value,
    });
  };

  const handleDateChange = (newValue) => {
    // convierte la fecha y hora seleccionada a UTC
    const utcValue = dayjs.utc(newValue);
    setValue(utcValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createIncidencia(incidencia);
      console.log(response);
      Swal.fire({
        title: "Guardado Exitosamente",
        icon: "success",
        showConfirmButton: true,
        position: "center",
      });
      setIncidencia(initialIncidencia);
      onHide();
    } catch (error) {
      Swal.fire({
        title: "Error al Guardar",
        icon: "error",
        showConfirmButton: true,
        position: "center",
      });
      console.log(error.message);
    }
  };

  const handleCancelMarkerAlert = () => {
    Swal.fire({
      title: "¿Está seguro?",
      text: "Los cambios no se guardarán",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No, seguir editando",
    }).then((result) => {
      if (result.isConfirmed) {
        onCancelMarker();
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3"
      sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} sx={{ width: '100%' }}>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            localeText={
              esES.components.MuiLocalizationProvider.defaultProps.localeText
            }
          >
            <DateTimePicker
              fullWidth
              label="Fecha y Hora"
              value={localValue}
              onChange={handleDateChange}
              format="DD/MM/YYYY HH:mm:ss"
              slotProps={{ textField: { variant: "filled" } }}
              shouldDisableYear={isInCurrentYear}
              disableFuture
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            name="turno"
            select
            label="Turno"
            variant="filled"
            size="small"
            value={incidencia.turno || ""}
            onChange={handleInputChange}
          >
            <MenuItem value="">Seleccionar...</MenuItem>
            <MenuItem value="Mañana">Mañana</MenuItem>
            <MenuItem value="Tarde">Tarde</MenuItem>
            <MenuItem value="Noche">Noche</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Apellidos"
            name="apellidos"
            variant="filled"
            size="small"
            value={incidencia.apellidos || ""}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Nombres"
            name="nombres"
            variant="filled"
            size="small"
            value={incidencia.nombres || ""}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="clasificacion"
            select
            label="Clasificación"
            variant="filled"
            size="small"
            value={incidencia.clasificacion || ""}
            onChange={handleInputChange}
          >
            <MenuItem value="">Seleccionar...</MenuItem>
            <MenuItem value="cm">Central de Monitoreo</MenuItem>
            <MenuItem value="ll">Llamadas</MenuItem>
            <MenuItem value="ga_mdep">Gestión Ambiental MDEP</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField
            fullWidth
            name="operador"
            select
            label="Operador"
            variant="filled"
            size="small"
            value={incidencia.operador || ""}
            onChange={handleInputChange}
          >
            <MenuItem value="">Seleccionar...</MenuItem>
            <MenuItem value="o01">Omega 01</MenuItem>
            <MenuItem value="o02">Omega 02</MenuItem>
            <MenuItem value="o03">Omega 03</MenuItem>
            <MenuItem value="o04">Omega 04</MenuItem>
            <MenuItem value="o05">Omega 05</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6} md={2}>
          <TextField
            fullWidth
            label="Cámara"
            name="camara"
            variant="filled"
            size="small"
            value={incidencia.camara || ""}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="tipoOcurrencia"
            select
            label="Tipo de  Ocurrencia"
            variant="filled"
            size="small"
            value={incidencia.tipoOcurrencia || ""}
            onChange={handleInputChange}
          >
            <MenuItem value="">Seleccionar...</MenuItem>
            <MenuItem value="ps">Persona Sospechosa</MenuItem>
            <MenuItem value="p">Peligro</MenuItem>
            <MenuItem value="msp">Moto Sin Placa</MenuItem>
            <MenuItem value="ip">Intervención Policial</MenuItem>
            <MenuItem value="t">Tactico</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="zona"
            select
            label="Zona"
            variant="filled"
            size="small"
            value={incidencia.zona || ""}
            onChange={handleInputChange}
          >
            <MenuItem value="">Seleccionar...</MenuItem>
            <MenuItem value="epc">El Porvenir Central</MenuItem>
            <MenuItem value="m">Mampuesto</MenuItem>
            <MenuItem value="lm">La Merced</MenuItem>
            <MenuItem value="la">Las Animas - Fraternidad</MenuItem>
            <MenuItem value="al">Alan Garcia</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            name="comisaria"
            select
            label="Comisaria"
            variant="filled"
            size="small"
            value={incidencia.comisaria || ""}
            onChange={handleInputChange}
          >
            <MenuItem value="">Seleccionar...</MenuItem>
            <MenuItem value="na">Nicolas Alcazar</MenuItem>
            <MenuItem value="sc">Sánchez Carrión</MenuItem>
            <MenuItem value="at">Alto Trujillo</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            type="text"
            label="Ubicación"
            name="ubicacion"
            variant="filled"
            size="small"
            onChange={handleInputChange}
            value={incidencia.ubicacion || ""}
          />
        </Grid>
        <Grid item xs={6} md={6}>
          <TextField
            fullWidth
            type="number"
            label="Latitud"
            name="latitud"
            variant="filled"
            size="small"
            onChange={handleInputChange}
            value={incidencia.latitud || lat}
          />
        </Grid>
        <Grid item xs={6} md={6}>
          <TextField
            fullWidth
            label="Longitud"
            name="longitud"
            variant="filled"
            size="small"
            value={incidencia.longitud || lng}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6} md={6}>
          <TextField
            fullWidth
            label="Sector/Mapa"
            name="sectorMapa"
            variant="filled"
            size="small"
            value={incidencia.sectorMapa || ""}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6} md={6}>
          <TextField
            fullWidth
            label="Vehículo de Apoyo"
            name="vehiculoApoyo"
            variant="filled"
            size="small"
            value={incidencia.vehiculoApoyo || ""}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            label="Observaciones"
            name="observaciones"
            multiline
            rows={2}
            variant="filled"
            size="small"
            value={incidencia.observaciones || ""}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<CloseIcon />}
            onClick={handleCancelMarkerAlert}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveIcon />}
            sx={{ ml: 2 }}
          >
            Guardar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
