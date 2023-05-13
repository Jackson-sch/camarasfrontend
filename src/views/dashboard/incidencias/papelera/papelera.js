import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Box, Paper, LinearProgress } from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  esES,
} from "@mui/x-data-grid";
import Card from "../../../../components/Card";
import Swal from "sweetalert2";

import { findDeletedIncidencias, restoreIncidencia } from "../api";
import { columns } from "./columns";
import { ModalViewDetails } from "../components/modalViewDetails";

export default function Papelera() {
  const [incidencias, setIncidencias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    findDeletedIncidencias()
      .then((data) => {
        const filteredData = data.filter((row) => row.isDeleted === true);
        const dataId = filteredData.map((row, _id) => ({ ...row, id: _id }));
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

  //funcion para restaurar incidencia
  const handleRestore = async (row) => {
    const confirmRestore = await Swal.fire({
      title: "¿Está seguro de que desea restaurar esta incidencia?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, restaurar",
      cancelButtonText: "No, cancelar",
    });
    if (confirmRestore.isConfirmed) {
      try {
        await restoreIncidencia(row._id);
        const data = await findDeletedIncidencias();
        setIncidencias(data);
        await Swal.fire(
          "Restaurado",
          "La incidencia ha sido restaurada con éxito",
          "success"
        );
      } catch (error) {
        await Swal.fire(
          "Error",
          `Error al restaurar la incidencia ${row._id}`,
          "error"
        );
      }
    }
  };

  return (
    <>
      <div>
        <Row>
          <Col sm={12} md={12}>
            <Card>
              <Card.Header>Lista de Incidencias Eliminadas</Card.Header>
              <Card.Body>
                <Paper>
                  <Box sx={{ height: 400, width: "100%" }}>
                    <DataGrid
                      loading={isLoading}
                      columns={columns(handleRestore, handleView)}
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
                      checkboxSelection
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
                  </Box>
                </Paper>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
