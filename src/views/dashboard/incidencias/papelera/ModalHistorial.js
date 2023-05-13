import React from "react";
import { Modal, Box, Typography, Divider, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const ModalHistorial = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...style }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={handleClose}>
            <FontAwesomeIcon icon={faXmark} />
          </IconButton>
        </div>
        <Typography variant="h4">Detalles de la incidencia</Typography>
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
};
