import { useState } from 'react';
import '../styles/Dropdown.css';

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="dropdown-container">
            <div className={`arrow ${isOpen ? 'open' : ''}`} onClick={handleOpen}/>
        </div>
    )
}

export default Dropdown;