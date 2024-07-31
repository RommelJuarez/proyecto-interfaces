
import { Link } from 'react-router-dom';
import './stylecomponents/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Integrantes">Integrantes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Contactos">Contactos</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/Materia" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Materias
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/materias/0">Diseño de Interfaces</Link></li>
                <li><Link className="dropdown-item" to="/materias/1">Redes de Comunicación</Link></li>
                <li><Link className="dropdown-item" to="/materias/2">Introducción a Base de Datos</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
