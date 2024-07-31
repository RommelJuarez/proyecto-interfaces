import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylecomponents/ImageCarrusel.css';

const ImageCarousel: React.FC = () => {
  return (
    <div id="carouselContainer" className="container-fluid p-0">
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
    </div>
  );
};

export default ImageCarousel;
