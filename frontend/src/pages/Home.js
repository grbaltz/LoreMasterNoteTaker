import { usePagesContext } from '../hooks/usePagesContext';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
    const {pages} = usePagesContext();

    return (
        <div className="home-container">
            <text className="text">All Pages</text>
            {pages && pages.map((page) => (
            <NavLink className="page-link" key={page._id} to={'/page/' + page._id}>
              {page.title}
            </NavLink>
          ))}
        </div>
    )
}

export default Home;