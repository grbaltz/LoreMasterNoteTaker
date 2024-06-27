import React, { useEffect } from 'react';
import { usePagesContext } from '../hooks/usePagesContext';
import '../styles/Screen.css';
import { Outlet } from 'react-router-dom';
import { useRightClickMenu } from '../hooks/useRightClickMenu';

// components
import LeftSidebar from '../components/LeftSidebar';

const Screen = () => {
  return (
    <div className="home">
      <LeftSidebar />
      <Outlet />
    </div>
  );
};

export default Screen;
