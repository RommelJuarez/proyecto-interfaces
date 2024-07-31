import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ImageCarousel from './components/ImageCarrusel';
import Footer from './components/Footer';
import Integrantes from './components/Integrantes';
import Contactos from './components/Contactos';
import Materia from './components/Materia';
import ScrollToTop from './components/Scrolltotop';


const App: React.FC = () => {
  return (
    <Router>
      <div>
        <ScrollToTop/>
        <Navbar />
        <Routes>
          <Route path="/" element={<ImageCarousel />} />
          <Route path="/Integrantes" element={<Integrantes />} />
          <Route path="/materias/:id" element={<Materia />} />
          <Route path="/contactos" element={<div> <Contactos/> </div>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}


export default App;