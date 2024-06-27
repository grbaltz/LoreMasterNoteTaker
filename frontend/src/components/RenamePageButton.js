import React, { useState } from 'react';
import { usePagesContext } from '../hooks/usePagesContext';

const RenamePageButton = ({ page, title, className = '', ...props }) => {
    const [error, setError] = useState(null);
    const { dispatch } = usePagesContext();

    const handleSubmit = async () => {
        try {
            console.log('attempting to rename page:', page._id);
            const response = await fetch('/pages/' + page._id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: title })
            });

            if (!response.ok) {
                const errorJson = await response.json();
                console.log('Found error in updating page:', errorJson);
                setError(errorJson.error || 'Failed to update page');
                return;
            } 

            const updatedPage = await response.json();
            setError(null);
            console.log('Updated page');
            dispatch({ type: 'UPDATE_PAGE', payload: updatedPage });
        } catch (err) {
            console.error('Submission failed', err);
            setError('Something went wrong!');
        }
    };

    return (
        <div>
            <button className={`rename-page-button ${className}`} onClick={handleSubmit} {...props}>
                Rename Page
            </button>
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default RenamePageButton;