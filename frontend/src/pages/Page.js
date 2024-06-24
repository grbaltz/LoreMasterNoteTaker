import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Page.css';

// components
import LeftSidebar from '../components/LeftSidebar';

const Page = () => {
  const { id } = useParams(); // Get the unique identifier from the URL
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    // Fetch page data from the server or MongoDB using the id
    fetch('/pages/' + id)
      .then(response => response.json())
      .then(data => setPageData(data));
  }, [id]);

  if (!pageData) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="current-page-container">
        <h1>{pageData.title}</h1>
        <p>Tags: {pageData.tags.join(', ')}</p>
        {/* Render other page details */}
      </div>
    </div>
  );
};

export default Page;
