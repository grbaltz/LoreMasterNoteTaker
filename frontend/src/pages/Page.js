import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePagesContext } from '../hooks/usePagesContext';
import * as api from '../api';
import '../styles/Page.css';

// components
import PageContent from '../components/PageContent';

const Page = () => {
  const { id } = useParams(); // Get the unique identifier from the URL
  const [pageData, setPageData] = useState(null);
  const { pages, dispatch } = usePagesContext();
  const [error, setError] = useState(null);
  const [tags, setTags] = useState('');
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [editingTags, setEditingTags] = useState(false);

  useEffect(() => {
    // Fetch page data from the server or MongoDB using the id
    fetch('/pages/' + id)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched page data:', data); // Debugging log
        setPageData(data);
        setContent(data.content);
        setTags(data.tags);
      })
      .catch(error => {
        console.error('Error fetching page data:', error);
        setError('Error fetching page data');
      });
  }, [id]);

  if (!pageData) return <div>Loading...</div>;

  const handleDeletePage = async () => {    
    try {
      await api.deletePage(id, dispatch);
      navigate('/'); // Redirect to homepage or another route after deletion
    } catch (err) {
      throw(err);
    }
  };

  // Deletes target tag
  const handleTagDelete = (index) => {
    console.log('Trying to delete tag');
    setTags(tags.filter((el, i) => i !== index));
  };

  // If 'Enter', then submit, otherwise continue typing tag name
  const handleTagKeyDown = (e) => {
    console.log('Trying to add tag, keydown:', e.key);
    if (e.key === 'Enter') {
        e.preventDefault();
        const value = e.target.value;
        if (!value.trim()) {
            // handleSubmit(e);
        } else {
            setTags([...tags, value]);
            e.target.value = '';
        }
    }
  };

  // Toggles value of editingTags, patches tags list if leaving edit mode
  const toggleEditTags = async (e) => {
    if (e.currentTarget.contains(e.relatedTarget)) {
      return;
    }

    console.log("editingTags = " + editingTags);
    setEditingTags(!editingTags);

    // Clear background hover color
    e.currentTarget.style.background = 'transparent';

    // Because setEditingTags is async (ish), then the value of editingTags is still as it came in with
    if (editingTags) {
      try {
        api.updatePageTags(id, tags, dispatch)
      } catch (err) {
        console.log(err);
      } 
    }
  }

  return (
    // Page container
    <div className="current-page-container">
      {/* Title */}
      <h1>{pageData.title}</h1>
      {/* Tags area */}
      <div className='page-tags-container' >
        <p>Tags: </p>
        {/* If editing the tags, then display each one with 'x', etc., else list each tag with border */}
        {editingTags ? (
          <div 
            className="editing-tags-container" 
            onBlur={toggleEditTags}
            tabIndex="0"
          > 
            {tags.map((tag, index) => (
              <div className="page-tag-item" key={index}>
                  <span className="text">{tag}</span>
                  <span style={{ cursor: 'pointer' }}onClick={(e) => { e.stopPropagation(); handleTagDelete(index); }} className="close">
                    &times;
                  </span>
              </div>
            ))}
              <input autoFocus className='page-tags-input' onKeyDown={handleTagKeyDown} placeholder={'Tag name'} />
          </div>
        ) : (
          <div 
            className="editing-tags-container"  
            onMouseOver={(e) => e.currentTarget.style.background = '#444444'} 
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            onClick={(e) => toggleEditTags(e)}
            placeholder="Click to add tabs"
          >
            {tags.length === 0 ? (<span style={{ opacity: '30%'}}>Click to add tags</span>) : '' }
            {tags.map((tag, index) => (
              <span 
                className="page-tag"
                key={index} 
                onMouseOver={(e) => e.stopPropagation()}
                onMouseLeave={(e) => e.stopPropagation()}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <p>ID: {id}</p>
      {pageData.parent ? <p>Parent ID: {pageData.parent.title}</p> : <p>No parent</p>}
      <p>Children:</p>
      {
        pageData.children && pageData.children.length > 0
          ? pageData.children.map((child) => (
              <p key={child._id}>Child: {child._id}</p>
            ))
          : ""
      }


      {/* Page layout and content area */}
      <PageContent />

      {/* Render other page details */}
      <button className="delete-page-button" onClick={handleDeletePage}>Delete Page</button>
    </div>
  );
};

export default Page;
