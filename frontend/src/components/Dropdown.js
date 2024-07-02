import React from 'react';
import '../styles/Dropdown.css';

const Dropdown = ({ isOpen }) => (
  <span
    className={`dropdown-container arrow ${isOpen ? 'open' : ''}`}
  ></span>
);

export default Dropdown;
