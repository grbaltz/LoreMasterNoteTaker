import React from 'react';
import '../styles/ContextMenu.css';

const ContextMenu = ({ children, position, isVisible, page }) => {
    if (!isVisible) return null;

    return (
        <div className={`context-menu ${isVisible ? 'visible' : ''}`} style={{ top: `${position.y}px`, left: `${position.x}px`}}>
            {children}
        </div>
    );
};

export default ContextMenu;
