import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';

import Footer from './components/Footer';
import Integrantes from './components/Integrantes';

import ScrollToTop from './components/Scrolltotop';
import RegisterPet from './components/Register-pet';
import { AuthProvider } from './components/AuthContext';
import PetDashboard from './components/PetDashboard';


const App: React.FC = () => {
  return (
    <AuthProvider>
    <Router>
      <div className="scrollable">
        
        <ScrollToTop/>
        <Navbar />
        <Routes>
          <Route path="/register-pet" element={<RegisterPet />} />
          <Route path="/" element={<Integrantes />} />
          <Route path="/Integrantes" element={<Integrantes />} />
          <Route path="/PetDashboard" element={<PetDashboard />} />
          
        </Routes>
        <Footer />
      </div>
    </Router>
    </AuthProvider>
  );
}


export default App;