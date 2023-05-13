import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// componentes del template
import { Row, Col } from "react-bootstrap";
import Card from "../../../components/Card";

// componentes de MUI
import { Box, Paper, LinearProgress, Fab, Tooltip } from "@mui/material";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";

// SweetAlert2
import Swal from "sweetalert2";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRecycle } from "@fortawesome/free-solid-svg-icons";

// 
/* Importar dos funciones `deleteincidencia 'y` getincidencias' de un archivo ubicado en el mismo
Directorio llamado `API.JS`.Es probable que estas funciones se usen para hacer llamadas de API a un servidor de backend para Recupere o elimine los datos relacionados con las incidencias */
import { deleteIncidencia, getIncidencias } from "./api";

/* Importar la función `columns` */
import { columns } from "./DataGrid/columns";

/* Importando dos componentes llamados `modalViewDetails` y` modaleditar` */
import { ModalViewDetails } from "./components/modalViewDetails";
import { ModalEditar } from "./components/modalEditar";

export const Listar = () => {
  const [incidencias, setIncidencias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    getIncidencias()
      .then((data) => {
        const dataId = data.map((row, _id) => ({ ...row, id: _id }));
        setIncidencias(dataId);
        setTimeout(() => setIsLoading(false), 3000);
      })
      .catch((error) => {
        console.log("Error al cargar las incidencias:", error);
        setIsLoading(false);
      });
  }, []);

  const handleView = (row) => {
    setSelectedRow(row);
  };

  const handleClose = () => {
    setSelectedRow(null);
  };

  const handleDelete = async (row) => {
    const confirmDelete = await Swal.fire({
      title: "¿Está seguro de que desea eliminar esta incidencia?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    });
    if (confirmDelete.isConfirmed) {
      try {
        await deleteIncidencia(row._id);
        const data = await getIncidencias();
        setIncidencias(data);
        await Swal.fire(
          "Eliminado",
          "La incidencia ha sido eliminada con éxito",
          "success"
        );
      } catch (error) {
        await Swal.fire(
          "Error",
          `Error al eliminar la incidencia ${row._id}`,
          "error"
        );
      }
    }
  };

  const handleEdit = (row) => {
    setSelectedRow(row);
  };

  return (
    <>
      <div>
        <Row>
          <Col sm={12} md={12}>
            <Card>
              <Card.Header>Lista de Incidencias</Card.Header>
              <Card.Body>
                <Paper>
                  <Box sx={{ height: 400, width: "100%" }}>
                    <DataGrid
                      loading={isLoading}
                      columns={columns(handleEdit, handleDelete, handleView)}
                      rows={incidencias}
                      getRowId={(row) => row._id}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 10,
                          },
                        },
                      }}
                      pageSizeOptions={[10, 15, 20]}
                      disableRowSelectionOnClick
                      localeText={
                        esES.components.MuiDataGrid.defaultProps.localeText
                      }
                      slots={{
                        toolbar: GridToolbar,
                        loadingOverlay: LinearProgress,
                      }}
                      slotProps={{
                        toolbar: {
                          showQuickFilter: true,
                          quickFilterProps: {
                            debounceMs: 500,
                          },
                        },
                      }}
                    />
                    <ModalViewDetails
                      open={Boolean(selectedRow)}
                      handleClose={handleClose}
                      selectedRow={selectedRow}
                    />
                    <ModalEditar
                      open={Boolean(selectedRow)}
                      handleClose={handleClose}
                      selectedRow={selectedRow}
                    />
                  </Box>
                </Paper>
                <Link to="/dashboard/maps/papelera/papelera">
                  <Tooltip title="Papelera de Reciclaje">
                    <Fab
                      style={styles.fab}
                      color="primary"
                      aria-label="Papelera de Reciclaje"
                    >
                      <FontAwesomeIcon icon={faRecycle} shake size="xl" />
                    </Fab>
                  </Tooltip>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Listar;

const styles = {
  fab: {
    position: "fixed",
    bottom: 20,
    right: 20,
  },
};
