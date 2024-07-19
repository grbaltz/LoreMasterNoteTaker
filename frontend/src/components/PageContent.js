import React, { useState } from 'react';
import '../styles/PageContent.css';

/* 
    Main space for where content/notes are written/stored for each page
    Customizable with text editing, commands, formatting, and elements
*/

const PageContent = () => {
    const [content, setContent] = useState('');
    const [expComm, setExpComm] = useState(false);
    const [command, setCommand] = useState('');
    
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
        let ta = document.getElementById('page-content');

        // If '/', trigger command menu
        if (e.key === '/') {
            console.log('Command expected');
            setExpComm(true);
            setCommand('');
            ta.value = ta.value.slice(0, -1);
            return;
        }

        // If expecting a command (ExpComm), then save inputs until 'enter', 'tab', or submission
        if (expComm) {
            if (e.key === 'Enter' || e.key === 'Tab' || e.key === ' ') { // TODO add submission criteria
                // TODO Submit
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
            } else {
                setCommand(command + e.key);
            }
        }

        if (command.length > 0) console.log(command);
    }

    // Updates content, affected by handleKeyDown
    const handleChange = (e) => {
        const newValue = e.target.value;
        setContent(newValue);
    }

    return (
        <textarea 
            name="page-content" 
            id="page-content" 
            className="page-content-container"
            // value={content}
            // onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
    );
};

export default PageContent;