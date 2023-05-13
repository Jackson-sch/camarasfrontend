import React from "react";
import { Modal, Box, Typography, Divider, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import MapWithMarker from "./MiniMapaMarker";
import { formatDate } from '../utils/DateTimeFormatter'

export const ModalViewDetails = ({ open, handleClose, selectedRow }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...style }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={handleClose}>
            <FontAwesomeIcon icon={faXmark} />
          </IconButton>
        </div>
        <Typography variant="h4">Detalles de la incidencia</Typography>
        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="caption" component="div" gutterBottom>
              <Box fontWeight="fontWeightBold">Fecha y Hora:</Box>
              <Box>{formatDate(selectedRow?.fechaHora)}</Box>
            </Typography>
            <Divider variant="middle" />
            <Typography variant="caption" component="div" gutterBottom>
              <Box fontWeight="fontWeightBold">Apellidos y Nombres:</Box>
              <Box>
                {selectedRow?.apellidos}, {selectedRow?.nombres}
              </Box>
            </Typography>
            <Divider variant="middle" />
            <Typography variant="caption" component="div" gutterBottom>
              <Box fontWeight="fontWeightBold">Ubicación:</Box>
              <Box>{selectedRow?.ubicacion}</Box>
            </Typography>
            <Divider variant="middle" />
            <Typography variant="caption" component="div" gutterBottom>
              <Box fontWeight="fontWeightBold">Clasificación:</Box>
              <Box>{selectedRow?.clasificacion}</Box>
            </Typography>
            <Divider variant="middle" />
          </Grid>
          <Grid item xs={12} md={6}>
            <MapWithMarker
              lat={selectedRow?.latitud}
              lng={selectedRow?.longitud}
              ubicacion={selectedRow?.ubicacion}
              tipoOcurrencia={selectedRow?.tipoOcurrencia}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="caption" component="div" gutterBottom>
              <Box fontWeight="fontWeightBold">Tipo de Ocurrencia:</Box>
              <Box>{selectedRow?.tipoOcurrencia}</Box>
            </Typography>
            <Divider variant="middle" />
            <Typography variant="caption" component="div" gutterBottom>
              <Box fontWeight="fontWeightBold">Operador:</Box>
              <Box>{selectedRow?.operador}</Box>
            </Typography>
            <Divider variant="middle" />
            <Typography variant="caption" component="div" gutterBottom>
              <Box fontWeight="fontWeightBold">Comisaria:</Box>
              <Box>{selectedRow?.comisaria}</Box>
            </Typography>
            <Divider variant="middle" />
            <Typography variant="caption" component="div" gutterBottom>
              <Box fontWeight="fontWeightBold">Zona:</Box>
              <Box>{selectedRow?.zona}</Box>
            </Typography>
            <Divider variant="middle" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="caption" component="div" gutterBottom>
              <Box fontWeight="fontWeightBold">Vehiculo de Apoyo:</Box>
              <Box>{selectedRow?.vehiculoApoyo}</Box>
            </Typography>
            <Divider variant="middle" />
            <Typography variant="caption" component="div" gutterBottom>
              <Box fontWeight="fontWeightBold">Turno:</Box>
              <Box>{selectedRow?.turno}</Box>
            </Typography>
            <Divider variant="middle" />
            <Typography variant="caption" component="div" gutterBottom>
              <Box fontWeight="fontWeightBold">Sector/Mapa:</Box>
              <Box>{selectedRow?.sectorMapa}</Box>
            </Typography>
            <Divider variant="middle" />
            <Typography variant="caption" component="div" gutterBottom>
              <Box fontWeight="fontWeightBold">Cámara:</Box>
              <Box>{selectedRow?.camara}</Box>
            </Typography>
            <Divider variant="middle" />
          </Grid>
        </Grid>
        <Typography variant="caption" component="div" gutterBottom>
          <Box fontWeight="fontWeightBold">Observaciones:</Box>
          <Box>{selectedRow?.observaciones}</Box>
        </Typography>
        <Divider variant="middle" />
      </Box>
    </Modal>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  height: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "4px",
  overflow: "auto",
  "&::-webkit-scrollbar": { height: 10, WebkitAppearance: "none" },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: 8,
    border: "2px solid",
    borderColor: "#E7EBF0",
    backgroundColor: "rgba(0 0 0 / 0.5)",
  },
};
