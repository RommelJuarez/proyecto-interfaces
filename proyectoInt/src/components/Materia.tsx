import { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './stylecomponents/materia.css';

const MateriasAccordion = () => {
  const { id } = useParams<{ id: string }>(); 
  const [activeKey, setActiveKey] = useState<string | null>(id || "0"); 

  
  useEffect(() => {
    setActiveKey(id || "0");
  }, [id]);

  
  const handleSelect = (key: string | null) => {
    setActiveKey(key === activeKey ? null : key); 
  };

  return (
    <div className="accordion-background">
      <div className="accordion-container">
        <Accordion activeKey={activeKey} onSelect={handleSelect as any} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Diseño de Interfaces</Accordion.Header>
            <Accordion.Body>
              Esta materia se centra en la creación de interfaces de usuario intuitivas y atractivas. Los estudiantes aprenderán sobre principios de diseño, usabilidad y herramientas de diseño de interfaces.
              <br/>             
              Ahora texto de relleno:<br/>   
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Redes de Comunicación</Accordion.Header>
            <Accordion.Body>
              Esta materia cubre los fundamentos de las redes de comunicación, incluyendo la configuración, administración y seguridad de redes. Los estudiantes aprenderán sobre protocolos de red, topologías y tecnologías de comunicación.
              Ahora texto de relleno:<br/>   
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Introducción a Base de Datos</Accordion.Header>
            <Accordion.Body>
              En esta materia, los estudiantes serán introducidos a los conceptos básicos de bases de datos, incluyendo el diseño, implementación y administración de bases de datos. Aprenderán sobre modelos de datos, SQL y sistemas de gestión de bases de datos.
              Ahora texto de relleno:<br/>   
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}

export default MateriasAccordion;
