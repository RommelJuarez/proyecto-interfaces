

function Footer() {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            
            <p>
              Proyecto de Diseño de Interfaces.
            </p>
          </div>
          <div className="col-md-3">
            <h5>Enlaces rapidos</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light">Inicio</a></li>
              <li><a href="#" className="text-light">Integrantes</a></li>
              <li><a href="#" className="text-light">Materias</a></li>
              <li><a href="#" className="text-light">Contactos</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Contactos</h5>
            <ul className="list-unstyled">
              <li><a href="mailto:info@example.com" className="text-light">rommel.juarez@itq.edu.ec</a></li>
              <li><a href="mailto:info@example.com" className="text-light">alejandro.caval@itq.edu.ec</a></li>
              <li><a href="tel:+1234567890" className="text-light">+593 9958687</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-3">
          <p>&copy; {new Date().getFullYear()} Rommel Juarez | Alejandro Caval.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
