import React from "react";
import Card from "../../../components/Card";
import { Row, Col } from "react-bootstrap";
import Map from "../../../components/mapa/Map";

const Registro = () => {
  return (
    <div>
      <Row>
        <Col sm="12">
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <div className="header-title">
                <h4 className="card-title">Registro de Incidencias</h4>
              </div>
            </Card.Header>
            <div className="card-body">
              <p>Vista General de Cámaras</p>
              <Map></Map>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Registro;
