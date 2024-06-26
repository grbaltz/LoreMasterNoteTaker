import { usePagesContext } from '../hooks/usePagesContext';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
    const {pages, dispatch} = usePagesContext();

    const deleteAllPages = async () => {
      if (!window.confirm("Are you sure you want to delete all pages? This action cannot be undone.")) {
        return;
      }

      try {
        const response = await fetch('/pages', {
          method: 'DELETE',
        })
        
      } catch (err) {
        console.log(err)
      }

      dispatch({ type: 'SET_PAGES', payload: []})
    }

    return (
        <div className="home-container">
          <text className="text">All Pages</text>
          {pages && pages.map((page) => (
          <NavLink className="page-link" key={page._id} to={'/page/' + page._id}>
            {page.title}
          </NavLink>
          ))}
          <button className="delete-all-pages-button" onClick={deleteAllPages}>DELETE ALL PAGES</button>
        </div>
    )
}

export default Home;