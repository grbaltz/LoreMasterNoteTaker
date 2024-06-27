import React, { useState, useEffect, useRef } from 'react';
import { usePagesContext } from '../hooks/usePagesContext';
import { useNavigate } from 'react-router-dom';
import '../styles/CreatePageForm.css';

const CreatePageForm = () => {
    const {  dispatch } = usePagesContext()
    const [title, setTitle] = useState('')
    const [tags, setTags] = useState([])
    const [error, setError] = useState(null)
    const [parent, setParent] = useState('')
    const titleRef = useRef(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        console.log('Submit requested') // Debugging log
        e.preventDefault()

        const page = { title, tags, parent }

        try {
            const response = await fetch('/pages', {
                method: 'POST',
                body: JSON.stringify(page),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json()

            if (!response.ok) {
                console.log('Found error in submitting form')
                setError(json.error)
            } 
            if (response.ok) {
                setError(null)
                // Reset form
                setTitle('')
                setTags([])
                
                // refocus title
                titleRef.current.focus();

                console.log('Added page')
                dispatch({ type: 'CREATE_PAGE', payload: json })

                navigate('/page/' + json._id)
            }
        } catch (err) {
            console.error('Submission failed', err)
            setError('Something went wrong!')
        }
    }

    const handleKeyDown = (e) => {
        console.log('Trying to add tag, keydown:', e.key)
        if (e.key === 'Enter') {
            const value = e.target.value
            if (!value.trim()) {
                handleSubmit(e);
            } else {
                setTags([...tags, value])
                e.target.value = ''
            }
        }
    }

    const handleDelete = (index) => {
        console.log('Trying to delete tag')
        setTags(tags.filter((el, i) => i !== index))
    }

    return (
        // Page info form
        <form className="inputs-container" onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()} onSubmit={handleSubmit}>
            <input 
                className="page-title-input"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="Type Page title here..."
                autoFocus
                ref={titleRef}
            />

            {/* TAG INPUT */}
            {/* Was originally TagInputForm, manually created to clear tags on submission */}
            <div className='tags-container'>
                {tags.map((tag, index) => (
                    <div className="tag-item" key={index}>
                        <span className="text">{tag}</span>
                        <span onClick={() => handleDelete(index)} className="close">&times;</span>
                    </div>
                ))}
                <input className='tags-input' onKeyDown={handleKeyDown} placeholder={'Tag name'}></input>
            </div>
            <div className="add-page-button-container">
                <button className="add-page-button" type="submit">Create page</button> {/* Button for form submission */}
            </div>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default CreatePageForm;
