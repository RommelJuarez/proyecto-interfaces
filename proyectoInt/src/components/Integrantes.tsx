import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./stylecomponents/Integrantes.css"

const CustomComponent: React.FC = () => {
  return (
    <div className="custom-container">
      <Container>
        {}
        <Row>
          <Col md={6} className="mb-3">
            <Card className="custom-card">
              <Row className="g-0">
                <Col md={4}>
                  <Card.Img
                    src="/images/alejandro.jpeg"
                    className="img-fluid rounded-start"
                    alt="Card Imagen 1"
                  />
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Card.Title>Alejandro Caval</Card.Title>
                    <Card.Text>
                      Estudiante de Desarrollo de Software<br/>
                      <br/>
                      Alejandro es un apasionado de los videojuegos y el desarrollo de software, con un talento innato para la tecnología. 
                      Desde muy joven, se sintió atraído por el mundo digital, pasando horas explorando diferentes juegos y desentrañando sus mecánicas. 
                      Su curiosidad lo llevó a aprender a programar, 
                      comenzando con lenguajes básicos y avanzando rápidamente hacia proyectos más complejos.
                      En su tiempo libre, Alejandro disfruta de maratones de juegos de rol y aventuras gráficas.


                      
                    </Card.Text>
                    <Card.Text>
                      <small className="text-muted">Esta soltero para las interesadas ;v xd</small>
                    </Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col md={6} className="mb-3">
            <Card className="custom-card">
              <Row className="g-0">
                <Col md={4}>
                  <Card.Img
                    src="/images/rommel.jpeg"
                    className="img-fluid rounded-start"
                    alt="Card Imagen 2"
                  />
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Card.Title>Rommel Juarez </Card.Title>
                    <Card.Text>
                    Rommel es un entusiasta de la tecnología y los videojuegos, cuya vida también está profundamente marcada por su amor por la naturaleza. 
                    Como desarrollador de software, Rommel pasa sus días inmerso en el mundo digital, creando soluciones innovadoras y explorando nuevas tecnologías. 
                    Su habilidad para entender y desarrollar software está complementada por su fascinación por los videojuegos, que considera una fuente inagotable de inspiración y diversión.

                    A pesar de su dedicación a la tecnología, Rommel sabe cómo desconectar y recargar energías en la naturaleza. 
                      
                    </Card.Text>
                    <Card.Text>
                      <small className="text-muted">adicto al cubata rojo xd</small>
                    </Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CustomComponent;
