import React, { useState, useEffect, useRef } from 'react';
import '../styles/LeftSidebar.css';
import { usePagesContext } from '../hooks/usePagesContext';
import { NavLink } from 'react-router-dom';

// components
import ContextMenu from './ContextMenu';
import DeletePageButton from './DeletePageButton';
import RenamePageButton from './RenamePageButton';

const LeftSidebar = () => {
  const { pages, dispatch } = usePagesContext();
  const [contextMenu, setContextMenu] = useState({
    position: {
        x: 0,
        y: 0,
    },
    toggled: false,
    page: null
  });
  const [editMode, setEditMode] = useState(null); // State to track edit mode
  const [editTitle, setEditTitle] = useState(''); // State to track the input value
  const inputRef = useRef(null); // Ref to access the input element

  useEffect(() => {
    const handleClick = () => setContextMenu({
        position: {
            x: contextMenu.position.x,
            y: contextMenu.position.y,
        },
        toggled: false,
        page: null
    });
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [contextMenu.position.x, contextMenu.position.y]);

  const handleRightClick = (e, page) => {
    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;
    setContextMenu({
        position: {
            x,
            y,
        },
        toggled: true,
        page: page
    });
  };

  const handleRenameClick = (page) => {
    setEditMode(page._id);
    setEditTitle(page.title);
    setContextMenu({ ...contextMenu, toggled: false });
    setTimeout(() => {
      inputRef.current && inputRef.current.focus();
    }, 0);
  };

  const handleRenameSubmit = async (e) => {
    if (e.key === 'Enter') {
      inputRef.current && inputRef.current.blur(); // Trigger blur on Enter key
    }
  };

  const handleBlur = async () => {
    try {
      const response = await fetch('/pages/' + editMode, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: editTitle })
      });

      if (!response.ok) {
        const errorJson = await response.json();
        console.error('Error updating page:', errorJson);
        return;
      }

      const updatedPage = await response.json();
      dispatch({ type: 'UPDATE_PAGE', payload: updatedPage });
      setEditMode(null);
      setEditTitle('');
    } catch (err) {
      console.error('Failed to update page:', err);
    }
  };

  return (
    <div className="sidebar-container">
        <div className="logo">
            <NavLink to={'/page/home'} className="text">LMNT</NavLink>
        </div>
        <NavLink className="create-page-button sidebar-item" to={'/page/new'}>Create Page</NavLink>
        {pages && pages.map((page) => (
          <div key={page._id} className="sidebar-item" onContextMenu={(e) => handleRightClick(e, page)}>
            {editMode === page._id ? (
              <input
                ref={inputRef} // Attach the ref to the input
                className="rename-input"
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={handleRenameSubmit}
                onBlur={handleBlur}
                autoFocus
              />
            ) : (
              <NavLink className="page-link" to={'/page/' + page._id}>
                {page.title}
              </NavLink>
            )}
          </div>
        ))}
        {contextMenu.toggled && (
          <ContextMenu 
            isVisible={contextMenu.toggled}
            position={contextMenu.position}
            page={contextMenu.page}
          >
            <button className="context-menu-button" onClick={() => handleRenameClick(contextMenu.page)}>Rename Page</button>
            <DeletePageButton page={contextMenu.page} className="context-menu-button">Delete Page</DeletePageButton>
          </ContextMenu>
        )}
    </div>    
  );
};

export default LeftSidebar;
