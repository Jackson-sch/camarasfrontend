import React from "react";
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { IconButton, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

import { formatDate } from '../utils/DateTimeFormatter'

dayjs.extend(utc)
dayjs.extend(timezone)

const renderIcon = (icon, color, onClick, title) => (
  <Tooltip title={title}>
    <IconButton onClick={onClick} color={color}>
      <FontAwesomeIcon icon={icon} beat size="2xs" />
    </IconButton>
  </Tooltip>
);


const renderActions = (params, handleEdit, handleDelete, handleView) => (
  <div>
    {renderIcon(faEye, "success", () => handleView(params.row), "Ver")}
    {renderIcon(faPenToSquare, "primary", () => handleEdit(params.row), "Editar")}
    {renderIcon(faTrash, "error", () => handleDelete(params.row), "Eliminar")}
  </div>
);

export const columns = (handleEdit, handleDelete, handleView) => [
  {
    headerName: "Fecha y Hora",
    field: "fechaHora",
    width: 208.38,
    //formatea la fecha y hora utc a local usando la libreria dayjs
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
  {
    headerName: "Actions",
    field: "actions",
    width: 126,
    renderCell: (row) =>
      renderActions(row, handleEdit, handleDelete, handleView),
  },
];
