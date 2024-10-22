import React, { useState } from 'react';
import { Carousel, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylecomponents/ImageCarrusel.css';
import UserList from './userList';
import RegisterPet from './Register-pet';

const ImageCarousel: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    
    <div id="carouselContainer" className="container-fluid p-0 position-relative">
      {/* Botón para abrir el formulario */}
      <Button variant="primary" className="position-absolute top-0 start-50 translate-middle" onClick={handleShow}>
        Registrarse
      </Button>

      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/ere.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Proyecto Diseño de Interfaces</h3>
            <p>Por Rommel Juarez y Alejandro Caval.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/spi.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>React</h3>
            <p>Un proyecto creado con React.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/bat.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Bootstrap</h3>
            <p>Usando el framework de bootstrap.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Modal para el formulario de registro */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Formulario de Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Ingresa tu email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Ingresa tu contraseña" />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Acepto los términos y condiciones" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Registrarse
            </Button>
          </Form>
          
        </Modal.Body>
      </Modal>
      <UserList />
      <RegisterPet/>
    </div>
  );
};

export default ImageCarousel;
