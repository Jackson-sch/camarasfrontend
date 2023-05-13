import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft, faEye } from "@fortawesome/free-solid-svg-icons";

import { formatDate } from '../utils/DateTimeFormatter'

const renderIcon = (icon, color, onClick, title) => (
  <Tooltip title={title}>
    <IconButton onClick={onClick} color={color}>
      <FontAwesomeIcon icon={icon} beat size="2xs" />
    </IconButton>
  </Tooltip>
);

const renderActions = (params, handleRestore, handleView) => (
  <div>
    {renderIcon(faEye, "success", () => handleView(params.row), "Ver")}
    {renderIcon(
      faRotateLeft,
      "primary",
      () => handleRestore(params.row),
      "Restaurar"
    )}
  </div>
);

export const columns = (handleRestore, handleView) => [
  {
    headerName: "Actions",
    field: "actions",
    width: 84,
    renderCell: (row) => renderActions(row, handleRestore, handleView),
  },
  {
    headerName: "Fecha y Hora",
    field: "fechaHora",
    width: 155,
    valueFormatter: (params) => formatDate(params.value)
  },
  {
    headerName: "Turno",
    field: "turno",
    width: 88.77,
  },
  {
    headerName: "Apellidos y Nombres",
    field: "fullname",
    valueGetter: (params) => `${params.row.apellidos} ${params.row.nombres}`,
    width: 230.38,
  },
  {
    headerName: "Cámara",
    field: "camara",
    width: 97.5,
  },
  {
    headerName: "Ocurrencia",
    field: "tipoOcurrencia",
    width: 268,
  },
  {
    headerName: "Ubicación",
    field: "ubicacion",
    width: 270,
  },
  {
    headerName: "Observaciones",
    field: "observaciones",
    width: 360,
  },
];
