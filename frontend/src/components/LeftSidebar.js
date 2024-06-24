import React, { useState } from 'react';
import '../styles/LeftSidebar.css';
import { usePagesContext } from '../hooks/usePagesContext';
import { NavLink, Outlet, useParams } from 'react-router-dom';

/* Contains the list of pages available on the left side, from their highest level
    and sortable. To be created:

    Framework
    Create section/folder (not a page, just a sortation tool)
        Creating a section will create a button with a label that expands all pages
        stored in said section
        Section Page (as mentioned below) will allow for a folder as well a front page for
        the pages in the section, such as a country and then all of its city pages
        listed below
    Create section page (potentially add "section: boolean" to Page.js)
    Dropdown for each section
*/

const LeftSidebar = () => {
    const {pages} = usePagesContext();

    return (
        <div className="sidebar-container">
          <div className="logo">
            <NavLink to={'page/home'} className="text">LMNT</NavLink>
          </div>
          <NavLink className="create-page-button" to={'/page/new'}>Create Page</NavLink>
          {pages && pages.map((page) => (
            <NavLink className="page-link" key={page._id} to={'/page/' + page._id}>
              {page.title}
            </NavLink>
          ))}
        </div>
      );
    };

export default LeftSidebar;