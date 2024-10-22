import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { Container, Row, Col, Card, Button, Alert, Modal } from 'react-bootstrap';
import './stylecomponents/PetDashboard.css';

const PetDashboard: React.FC = () => {
  const { userId, username } = useAuth(); // Obtener el userId y username del contexto
  const [pets, setPets] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [likedUsers, setLikedUsers] = useState<string[]>([]);
  const [dislikedPets, setDislikedPets] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [currentPets, setCurrentPets] = useState<any[]>([]);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchPetName, setMatchPetName] = useState('');

  // Mostrar el usuario logueado
  useEffect(() => {
    if (userId && username) {
      console.log(`Usuario logueado: ID=${userId}, Nombre=${username}`);
    } else {
      console.log('No hay usuario logueado.');
    }
  }, [userId, username]);

  // Cargar todas las mascotas
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/pets`);
        if (response.ok) {
          const data = await response.json();
          setPets(data);
          setCurrentPets(data);
          console.log('Mascotas cargadas:', data);
        } else {
          setErrorMessage('Error al obtener las mascotas.');
        }
      } catch (error) {
        console.error('Error al hacer la solicitud:', error);
        setErrorMessage('Error de conexión. Inténtalo de nuevo más tarde.');
      }
    };

    fetchPets();
  }, []);

  // Filtrar mascotas que el usuario no ha dado like o dislike
  useEffect(() => {
    const filteredPets = pets.filter(
      pet =>
        pet.ownerId !== userId &&
        !likedUsers.includes(pet.ownerId) &&
        !dislikedPets.includes(pet._id)
    );
    setCurrentPets(filteredPets);
    console.log('Mascotas filtradas:', filteredPets);
  }, [likedUsers, dislikedPets, pets, userId]);

  // Dar like a una mascota
  const handleLike = async (petId: string) => {
    console.log(`Intentando dar like a la mascota con ID: ${petId}`);
    const likedPet = pets.find(pet => pet._id === petId);

    if (likedPet) {
      const likedPetOwnerId = likedPet.ownerId;

      // Verificar si los IDs son válidos antes de guardar el like
      if (!userId || !likedPetOwnerId || !petId) {
        console.error('ID de usuario o mascota inválido');
        setErrorMessage('ID de usuario o mascota inválido');
        return;
      }

      // Guardar el like y verificar el match
      const likeResponse = await saveLike(likedPetOwnerId);
      if (likeResponse.success) {
        setLikedUsers(prev => [...prev, likedPetOwnerId]);

        // Si hay un match, mostrar el modal y actualizar la lista de matches
        if (likeResponse.match) {
          setMatchPetName(likeResponse.match.petName);
          setShowMatchModal(true);

          // Actualizar la lista de matches con el nuevo match
          setMatches(prev => [...prev, likeResponse.match]);
        }
      }
    } else {
      console.log(`No se encontró la mascota con ID: ${petId}`);
    }
  };

  const saveLike = async (targetUserId: string) => {
    console.log(`Guardando like para targetUserId: ${targetUserId}`);
    try {
      const response = await fetch('http://localhost:5000/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, ownerId: targetUserId }),
      });
      if (response.ok) {
        const likeData = await response.json();
        console.log('Like guardado:', likeData);

        // Devolver si hubo match mutuo
        return {
          success: true,
          match: likeData.match || null // Devolver match si lo hay
        };
      } else {
        console.error('Error al guardar el like:', await response.text());
        setErrorMessage('Error al guardar el like. Verifica los datos enviados.');
      }
    } catch (error) {
      console.error('Error al guardar el like:', error);
      setErrorMessage('Error de conexión al guardar el like.');
    }
    return { success: false }; // Indicar que no se guardó el like
  };

  // Registrar el dislike
  const handleDislike = (petId: string) => {
    if (!dislikedPets.includes(petId)) {
      setDislikedPets(prev => [...prev, petId]);
      console.log(`Mascota ${petId} registrada como dislike`);
    }
  };

  // Obtener los matches del usuario
  const handleFetchMatches = async () => {
    if (!userId) {
      console.error('User ID no disponible');
      return;
    }

    console.log(`Obteniendo matches para userId: ${userId}`);
    try {
      const response = await fetch(`http://localhost:5000/api/matches/${userId}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Matches obtenidos:', data);
        setMatches(data);
      } else {
        console.error('Error al obtener los matches.');
      }
    } catch (error) {
      console.error('Error de conexión al obtener los matches:', error);
    }
  };

  useEffect(() => {
    handleFetchMatches();
  }, [userId]);

  return (
    <Container className="pet-dashboard">
      <h1 className="text-center my-4">Petinder</h1>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Row>
        <Col md={8}>
          <h2>Mascotas</h2>
          <Row>
            {currentPets.length > 0 ? (
              currentPets.map(pet => (
                <Col md={4} key={pet._id} className="mb-4">
                  <Card className="pet-card">
                    <Card.Img variant="top" src={pet.image} className="pet-image" />
                    <Card.Body>
                      <Card.Title>{pet.name}</Card.Title>
                      <Card.Text>Tipo: {pet.type} | Edad: {pet.age} años</Card.Text>
                      <div className="d-flex justify-content-between">
                        <Button
                          variant="success"
                          onClick={() => handleLike(pet._id)}
                          disabled={likedUsers.includes(pet.ownerId) || dislikedPets.includes(pet._id)}
                        >
                          Like
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDislike(pet._id)}
                          disabled={likedUsers.includes(pet.ownerId) || dislikedPets.includes(pet._id)}
                        >
                          Dislike
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p>No hay mascotas disponibles.</p>
            )}
          </Row>
        </Col>
        <Col md={4}>
          <h2>Matches</h2>
          {matches.length > 0 ? (
            matches
              .filter(match => match.ownerId !== userId) // Filtrar matches que coincidan con el userId
              .map(match => (
                <Card key={match.matchId} className="mb-3">
                  <Card.Body>
                    <Card.Title>{match.petName}</Card.Title>
                    <Card.Text>
                      Propietario: {match.ownerName} {/* Mostrar el nombre del propietario */}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))
          ) : (
            <p>No tienes matches.</p>
          )}
        </Col>
      </Row>

      {/* Modal para mostrar matches */}
      <Modal show={showMatchModal} onHide={() => setShowMatchModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>¡Match encontrado!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¡Has hecho match con la mascota {matchPetName}!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowMatchModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PetDashboard;
