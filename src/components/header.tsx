import React from 'react';
import { Link } from 'react-router-dom';
import '/src/styles/Header.css'; // Importando o arquivo CSS

const Header: React.FC = () => {
  return (
    <header className="header-container">
      <div className="logo">
        <Link to="/" className="logo-link">
          <h1 className="logo-text">Feira de Especialidades 2025.1</h1>
        </Link>
      </div>
      <nav className="navigation">
        <Link to="/" className="nav-link">Início</Link>
      </nav>
    </header>
  );
};

export default Header;
