import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/PageContent.css';
import CommandHandler from '../handlers/CommandHandler';
import { PagesContext } from '../contexts/PagesContext'; // Update this path to your actual context file
import * as api from '../api'; // Import the function

// Components
import Editor from './Editor';

const PageContent = () => {
  const { id } = useParams();
  const { pages, dispatch } = useContext(PagesContext);
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Loading page")
    const fetchContent = async () => {
      try {
        setInput(await api.fetchPageContent(id));
      } catch (err) {
        console.log(err);
      }
    }
    
    fetchContent();
  }, [id]);

  return (
    <>
      <Editor />
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
    </>
  );
};

export default PageContent;
