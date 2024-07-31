import React, { useState } from 'react';
import { Button, Container, Form, Modal, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylecomponents/Contactos.css';

const CustomComponent: React.FC = () => {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    
    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      setShow(true);
    }
  };

  const handleClose = () => setShow(false);

  return (
    <div>
      <header className="header-image">
        <div className="header-title">
          <h1>Contáctanos</h1>
        </div>
      </header>

      <Container className="mt-5">
        <Row>
          <Col md={6}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  required
                  type="text"
                  pattern="[A-Za-z\s]+"
                  placeholder="Ingresa tu nombre"
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, ingresa solo letras.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formSurname" className="mt-3">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  required
                  type="text"
                  pattern="[A-Za-z\s]+"
                  placeholder="Ingresa tu apellido"
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, ingresa solo letras.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formPhone" className="mt-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  required
                  type="text"
                  pattern="\d{10}"
                  placeholder="Ingresa tu número de teléfono"
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, ingresa solo 10 números.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formEmail" className="mt-3">
                <Form.Label>Correo</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Ingresa tu correo"
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, ingresa un correo válido.
                </Form.Control.Feedback>
              </Form.Group>

              <Button className="mt-4" variant="primary" type="submit">
                Enviar
              </Button>
            </Form>
          </Col>

          <Col md={6} className="text-container">
            <h5>Rommel Juarez</h5>
            <p>Telefono: 0995168010</p>
            <p>Correo: rommel.juarez@itq.edu.ec</p>
            <br></br>
            <h5>Alejandro Caval</h5>
            <p>Telefono: 0995168011</p>
            <p>Correo: alejandro.caval@itq.edu.ec</p>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Formulario Enviado</Modal.Title>
        </Modal.Header>
        <Modal.Body>Pronto nos contactaremos con usted.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomComponent;
