import React from 'react';
import { Link } from 'react-router-dom';
import { FaMoon } from 'react-icons/fa';
import '../css/components/Header.css';

const Header = () => {
  return (
    <header className="main-header">
      <div className="logo">Gentil Le NoiR</div>
      <nav>
        <Link to="/">Accueil</Link>
        <Link to="/bio">Biographie</Link>
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/contacts">Contacts</Link>
        <Link to="/images">Images</Link>
      </nav>
    </header>
  );
};

export default Header;
