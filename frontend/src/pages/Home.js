import React from 'react';
import { usePagesContext } from '../hooks/usePagesContext';
import { NavLink } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
    const { pages, dispatch } = usePagesContext();

    const deleteAllPages = async () => {
        if (!window.confirm("Are you sure you want to delete all pages? This action cannot be undone.")) {
            return;
        }

        try {
            const response = await fetch('/pages', {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete pages');
            }

        } catch (err) {
            console.log(err);
        }

        dispatch({ type: 'SET_PAGES', payload: [] });
    };

    return (
        <div className="home-container">
            <div className="home-title">All Pages</div>
            <div className="pages-list">
                {pages && pages.map((page) => (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <text style={{ marginRight: 8 }}>📄</text>
                        <NavLink className="page-link" key={page._id} to={'/page/' + page._id}>
                            {page.title}
                        </NavLink>
                    </div>
                    
                ))}
            </div>
            <button className="delete-all-pages-button" onClick={deleteAllPages}>DELETE ALL PAGES</button>
        </div>
    );
};

export default Home;
