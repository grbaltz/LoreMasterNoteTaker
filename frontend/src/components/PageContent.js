import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/PageContent.css';
import CommandHandler from '../handlers/CommandHandler';
import { PagesContext } from '../contexts/PagesContext'; // Update this path to your actual context file
import * as api from '../api'; // Import the function
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/QuillEditor.css';

const PageContent = () => {
  const { id } = useParams();
  const { pages, dispatch } = useContext(PagesContext);
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);

  const handleInputChange = async (e) => {
    const newContent = e.target.value;
    setInput(newContent);
  
    try {
      await api.updatePageContent(id, newContent, dispatch);
    } catch (err) {
      setError(err.message);
    }
  };

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
      {/* <textarea
        name="page-content"
        className="page-content-container"
        onChange={handleInputChange}
        value={input}
        placeholder="Type a message or command"
      /> */}
      <ReactQuill
        theme="snow"
        className="editor"
        value={input}
        onChange={setInput}
        placeholder="Type a message or roll a dice"
      >

      </ReactQuill>
      <CommandHandler input={input} setInput={setInput} />
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
    </>
  );
};

export default PageContent;
