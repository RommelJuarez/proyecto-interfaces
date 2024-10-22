import React, { useState, useEffect } from 'react';
import './stylecomponents/RegisterPet.css';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const RegisterPet = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [petAge, setPetAge] = useState('');
  const [existingPets, setExistingPets] = useState<any[]>([]); // Para almacenar las mascotas existentes
  const { userId } = useAuth(); // Obtener el userId del contexto
  const navigate = useNavigate(); // Inicializar useNavigate

  useEffect(() => {
    // Obtener las mascotas del usuario
    const fetchPets = async () => {
      if (userId) {
        const response = await fetch(`http://localhost:5000/api/pets/${userId}`);
        if (response.ok) {
          const petsData = await response.json();
          setExistingPets(petsData);
        } else {
          console.error('Error al obtener las mascotas del usuario');
        }
      }
    };

    fetchPets();
  }, [userId]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Verificar si ya existe una mascota con el mismo nombre
    const isPetRegistered = existingPets.some(pet => pet.name === petName);
    if (isPetRegistered) {
      console.error("Error: Ya tienes una mascota registrada con ese nombre.");
      return;
    }

    if (!userId) {
      console.error("Error: No se encontró el ID de usuario.");
      return;
    }

    const petData = {
      ownerId: userId, // Usar el userId del contexto
      type: petType,
      name: petName,
      age: parseInt(petAge),
      image: imagePreview, // Puedes optar por guardar la URL o la imagen en base64
    };

    try {
      const response = await fetch('http://localhost:5000/api/pets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(petData),
      });

      if (response.ok) {
        console.log('Mascota registrada con éxito');
        // Redirigir a la nueva interfaz de mascotas
        navigate('/PetDashboard'); // Asegúrate de que esta ruta esté definida en tu Router
      } else {
        const errorData = await response.json();
        console.error('Error al registrar mascota:', errorData.message);
      }
    } catch (error) {
      console.error('Error de conexión:', error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1>Registro de Mascotas</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label htmlFor="petName">Nombre de la Mascota</label>
            <input
              type="text"
              id="petName"
              placeholder="Ingresa el nombre de tu mascota"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="petType">Tipo de Mascota</label>
            <select
              id="petType"
              value={petType}
              onChange={(e) => setPetType(e.target.value)}
              required
            >
              <option value="">Selecciona el tipo de mascota</option>
              <option value="perro">Perro</option>
              <option value="gato">Gato</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <div className="input-field">
            <label htmlFor="petAge">Edad de la Mascota (en años)</label>
            <input
              type="number"
              id="petAge"
              placeholder="Ingresa la edad de tu mascota"
              value={petAge}
              onChange={(e) => setPetAge(e.target.value)}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="petImage">Imagen de la Mascota</label>
            <input
              type="file"
              id="petImage"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>

          {/* Vista previa de la imagen */}
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Vista previa" />
            </div>
          )}

          <button className="button" type="submit">Registrar Mascota</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPet;
