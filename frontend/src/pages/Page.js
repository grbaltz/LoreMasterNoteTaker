import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePagesContext } from '../hooks/usePagesContext';
import '../styles/Page.css';

// components

const Page = () => {
  const { id } = useParams(); // Get the unique identifier from the URL
  const [pageData, setPageData] = useState(null);
  const { pages, dispatch } = usePagesContext()
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch page data from the server or MongoDB using the id
    fetch('/pages/' + id)
      .then(response => response.json())
      .then(data => setPageData(data));
  }, [id]);

  if (!pageData) return <div>Loading...</div>;

  const handleDeletePage = async () => {    
    try {
      const response = await fetch('/pages/' + id, {
        method: 'DELETE',
      })
      const json = await response.json()

      if (!response.ok) {
        console.log('Found error in deleting page')
        setError(json.error)
      }

      dispatch({ type: 'DELETE_PAGE', payload: id });

    } catch (err) {
      console.error('Submission failed', err)
      setError('Something went wrong!')
    }
  }

  return (
    <div className="container">
      <div className="current-page-container">
        <h1>{pageData.title}</h1>
        <p>Tags: {pageData.tags.join(', ')}</p>
        {/* Render other page details */}
        <button className="delete-page-button" onClick={handleDeletePage}>Delete Page</button>
      </div>
    </div>
  );
};

export default Page;
