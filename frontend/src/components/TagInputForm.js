import React, { useState, useEffect } from 'react';
import '../styles/TagInputForm.css'

export default function TagInputForm()  {
    const [tags, setTags] = useState([]);

    useEffect (() => {
        console.log('Loaded TagInputForm')
        setTags([])
    }, [])

    const handleKeyDown = (e) => {
        console.log('Trying to add tag, keydown:', e.key)
        if (e.key !== 'Enter') return
        const value = e.target.value
        if (!value.trim()) return
        setTags([...tags, value])
        e.target.value = ''
    }

    const handleDelete = (index) => {
        console.log('Trying to delete tag')
        setTags(tags.filter((el, i) => i !== index))
    }

    return (
        <div className='tags-container'>
            {tags.map((tag, index) => (
                <div className="tag-item" key={index}>
                    <span className="text">{tag}</span>
                    <span onClick={() => handleDelete(index)} className="close">&times;</span>
                </div>
            ))}
            <input className='tags-input' onKeyDown={handleKeyDown} placeholder={'Type something'}></input>
        </div>
    );
};