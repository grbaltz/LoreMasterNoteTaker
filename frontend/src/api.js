// api.js (create this file if it doesn't exist)
import { useContext } from 'react';
import { PagesContext } from './contexts/PagesContext'; // Update this path to your actual context file

export const updatePageContent = async (id, newContent, dispatch) => {
  try {
    const response = await fetch('/pages/' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: newContent })
    });

    if (response.ok) {
      console.log("Updated content");
      const updatedPage = await response.json();
      dispatch({ type: 'UPDATE_PAGE', payload: updatedPage });
    } else {
      const json = await response.json();
      throw new Error(json.error);
    }
  } catch (err) {
    throw err;
  }
};

export const updatePageTags = async (id, newTags, dispatch) => {
    try {
      const response = await fetch('/pages/' + id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tags: newTags })
      });
  
      if (response.ok) {
        console.log("Updated tags");
        const updatedPage = await response.json();
        dispatch({ type: 'UPDATE_PAGE', payload: updatedPage });
      } else {
        const json = await response.json();
        throw new Error(json.error);
      }
    } catch (err) {
      throw err;
    }
  };

export const fetchPageContent = async (id) => {
    try {
        const response = await fetch('/pages/' + id);
        const data = await response.json();
        return data.content;
    } catch (err) {
        console.error("Couldn't fetch, got this error:\n", err);
        throw err;
    }
}

export const deletePage = async (id, dispatch) => {
    try {
        const response = await fetch('/pages/' + id, {
          method: 'DELETE',
        });
        const json = await response.json();
  
        if (!response.ok) {
          console.log('Found error in deleting page');
          throw new Error(json.error);
        }
  
        dispatch({ type: 'DELETE_PAGE', payload: id });
      } catch (err) {
        console.error('Submission failed', err);
        throw new Error("Something went wrong trying to delete page. Check api.js");
      }
}