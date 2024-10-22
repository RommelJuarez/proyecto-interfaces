import React, { useState } from 'react';
import { Button, Container, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./stylecomponents/Integrantes.css";

const CustomComponent: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false); // Estado de carga

  const navigate = useNavigate();
  const { login } = useAuth(); // Usar login del contexto

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setShowLoginModal(false);
    resetForm();
  };

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setErrorMessage('');
    setSuccessMessage('');
  };

  // Registro de usuario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage('Por favor, completa todos los campos.');
      return;
    }

    setLoading(true); // Iniciar carga

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage('Usuario registrado con éxito.');
        handleCloseModal();
        login(data.userId, username);
        navigate('/register-pet'); // Navegar a la página de registrar mascota
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Error al registrar el usuario.');
      }
    } catch (error) {
      setErrorMessage('Error de conexión. Por favor, inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false); // Finalizar carga
    }
  };

  // Login de usuario
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage('Por favor, completa todos los campos.');
      return;
    }

    setLoading(true); // Iniciar carga

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message);
        login(data.userId, username);

        // Obtener las mascotas del usuario
        const petsResponse = await fetch(`http://localhost:5000/api/pets/${data.userId}`);
        if (petsResponse.ok) {
          const petsData = await petsResponse.json();
          handleCloseModal();
          // Verificar si el usuario ya tiene mascotas
          if (petsData.length > 0) {
            navigate('/PetDashboard');
          } else {
            navigate('/register-pet'); // Redirigir a registrar mascota
          }
        } else {
          setErrorMessage('Error al obtener tus mascotas. Inténtalo de nuevo más tarde.');
        }
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Credenciales inválidas');
      }
    } catch (error) {
      setErrorMessage('Error de conexión. Por favor, inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false); // Finalizar carga
    }
  };

  const openLoginModal = () => {
    setShowModal(false);
    setShowLoginModal(true);
  };

  return (
    <div className="custom-container d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <Container className="text-center">
        <h1 className="custom-title mb-4">Petinder</h1>

        <Button className="open-modal-button" variant="primary" onClick={handleShowModal}>
          Registrar
        </Button>

        {/* Modal para Registro */}
        <Modal show={showModal} onHide={handleCloseModal} centered className="fade">
          <Modal.Header closeButton>
            <Modal.Title>Registro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresa tu password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button className="modal-submit-button" variant="primary" type="submit" disabled={loading}>
                {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Registrarse'}
              </Button>
              <Button variant="link" onClick={openLoginModal}>
                Ya tengo una cuenta - Login
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Modal para Login */}
        <Modal show={showLoginModal} onHide={handleCloseModal} centered className="fade">
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form onSubmit={handleLoginSubmit}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresa tu password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button className="modal-submit-button" variant="primary" type="submit" disabled={loading}>
                {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Ingresar'}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default CustomComponent;
