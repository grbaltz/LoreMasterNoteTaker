import React, { useEffect } from 'react';
import { usePagesContext } from '../hooks/usePagesContext';
import '../styles/Screen.css';
import { Outlet } from 'react-router-dom';

// components
import PageDetails from '../components/PageDetails';
import CreatePageForm from '../components/CreatePageForm';
import DeletePageButton from '../components/DeletePageButton';
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
