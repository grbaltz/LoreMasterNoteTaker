import React, { useState } from 'react';
import { usePagesContext } from '../hooks/usePagesContext'

const DeletePageButton = ({ page, className = '', ...props }) => {
    const [error, setError] = useState(null);
    const { dispatch } = usePagesContext()

    const handleSubmit = async () => {
        try {
            console.log('attempting to delete page:', page._id)
            const response = await fetch('/pages/' + page._id, {
                method: 'DELETE',
            })

            if (!response.ok) {
                const errorJson = await response.json()
                console.log('Found error in deleting page:', errorJson)
                setError(errorJson.error || 'Failed to delete the page')
                return;
            } 
            if (response.ok) {
                setError(null)

                console.log('Deleted page')
                dispatch({ type: 'DELETE_PAGE', payload: page._id })
            }
        } catch (err) {
            console.error('Submission failed', err)
            setError('Something went wrong!')
        }
    }

    return (
        <div>
            <button className={`delete-page-button ${className}`} onClick={handleSubmit}>Delete Page</button>
            {error && <div className="error">{error}</div>}
        </div>
    )
}

export default DeletePageButton;