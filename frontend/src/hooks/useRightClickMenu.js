import { useState, useEffect } from 'react';

export const useRightClickMenu = () => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [showMenu, setShowMenu] = useState(false);

    const handleClick = () => {
        showMenu && setShowMenu(false);
    }

    const handleContextMenu = (e) => {
        e.preventDefault();
        setX(e.pageX);
        setY(e.pageY);
        setShowMenu(true);
    }

    useEffect(() => {
        document.addEventListener('click', handleClick);
        document.addEventListener('contextmenu', handleContextMenu);
        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('contextmenu', handleContextMenu);
        }
    })

    return { x, y, showMenu }
}