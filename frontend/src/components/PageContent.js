import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import '../styles/PageContent.css';

// Components/Variables
import { commandsList } from './Commands';

/* 
    Main space for where content/notes are written/stored for each page
    Customizable with text editing, commands, formatting, and elements
*/

const PageContent = () => {
    const { id } = useParams();
    const [content, setContent] = useState('');
    const [expComm, setExpComm] = useState(false);
    const [command, setCommand] = useState('');
    const [ignoreKeys] = useState(["Shift", "CapsLock", "Control", "Alt"]);
    
    // Fetch content from the server on mount
    useEffect(() => {
        const fetchContent = async () => {
        try {
            const response = await fetch(`/pages/${id}`);
            const data = await response.json();
            if (response.ok) {
            setContent(data.content);
            document.getElementById('page-content').innerHTML = data.content;
            } else {
            console.error('Failed to fetch page content:', data);
            }
        } catch (err) {
            console.error('Error:', err);
        }
        };

        fetchContent();
    }, [id]);

    // Handles commands
    /*
        Commands:
        - Change heading size
        - Insert table
        - Insert image
        - Roll from loot-table
        - Dice roll
        TODO
    */
    const handleKeyDown = (e) => {

        // If '/', trigger command menu
        if (e.key === '/') {
            console.log('Command expected');
            setExpComm(true);
            setCommand('');
            return;
        }

        // If expecting a command (ExpComm), then save inputs until 'enter', 'tab', or submission
        if (expComm) {
            if (e.key === 'Enter' || e.key === 'Tab' || e.key === ' ') { // TODO add submission criteria
                // TODO Submit
                const foundCommand = commandsList.find(cmd => cmd.name.includes(command));
                if (foundCommand) {
                    e.preventDefault();

                    // Remove the command and '/' before it from the content
                    const currentContent = document.getElementById('page-content').innerHTML;
                    const commandStart = currentContent.lastIndexOf('/') + 1;
                    const newContent = currentContent.substring(0, commandStart - 1); // Remove command including the slash

                    // Update content of the div
                    document.getElementById('page-content').innerHTML = newContent;

                    // Update the content
                    updateContent(newContent);
                    foundCommand.execute();
                }

                console.log('Command submitted: ' + command);
                setCommand('');
                setExpComm(false);
                return;
            } else if (e.key === 'Backspace') {
                if (command.length > 0) {
                    setCommand(command.slice(0, -1));
                } else {
                    // Exit command sequence
                    setCommand('');
                    setExpComm(false);
                    console.log('Exited command sequence');
                }
            } else if (!ignoreKeys.includes(e.key)) {
                setCommand(command + e.key);
            }
        }

        if (command.length > 0) console.log(command);
    }

    // Updates content, affected by handleKeyDown
    const handleInput = async (e) => {
        const newContent = e.target.innerHTML;
        updateContent(newContent);
    };
    
    // Updates the content of the page to db, useful given any input changes the content
    // as well as submitting a command which removes text
    const updateContent = async (newContent) => {
        setContent(newContent);
    
        try {
          const response = await fetch(`/pages/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: newContent }),
          });
    
          if (!response.ok) {
            const errorData = await response.json();
            console.error('Failed to update content:', errorData);
          }
        } catch (err) {
          console.error('Error:', err);
        }
    }

    return (
        <div
            name="page-content" 
            id="page-content" 
            contenteditable="true"
            className="page-content-container"
            onKeyDown={handleKeyDown}
            onInput={handleInput}
        />
    );
};

export default PageContent;