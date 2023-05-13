import React from "react";
import Modal from "react-bootstrap/Modal";

import { Box, Divider, Typography } from "@mui/material";

// Importar el formulario
import Form from "./components/formulario";

/* Iconos de los botones */
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";

function Modals(props) {
  const { show, onHide, onCancelMarker, lat, lng, address } = props;

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header>
          <Modal.Title>
            <Typography variant="h5">
              <AddLocationAltIcon color="secondary" /> Registrar Incidencia
            </Typography>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            spacing={2}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              width="100%"
            ></Box>
            <Divider light />
            <Box width="100%">
              <Form
                lat={lat}
                lng={lng}
                address={address}
                onHide={onHide}
                onCancelMarker={onCancelMarker}
              />
            </Box>
            <Divider light />
          </Box>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Modals;
