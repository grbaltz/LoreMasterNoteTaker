import React, { useEffect, useState } from "react";

const CommandHandler = ({ input, setInput }) => {
    const [isBold, setIsBold] = useState(false)

    useEffect(() => {
        const checkForCommands = (value) => {
            const regex = /\/(\w+)/g;
            let match;

            while ((match = regex.exec(value)) !== null) {
                handleCommand(match[1], match.index);
            }
        };

        const handleCommand = (command, index) => {
            let result = "";
            switch (command) {
                case "d20":
                    console.log(
                        "Rolled a d20: ",
                        Math.floor(Math.random() * 20) + 1
                    );
                    result = String(Math.floor(Math.random() * 20) + 1);
                    break;
                // Add more commands as needed
                default:
                    console.log(
                        `Command ${command} doesn't exist/isn't finished`
                    );
            }

            // Get text before and after the command, insert 'result' in between
            if (result) {
                const before = input.slice(0, index);
                const after = input.slice(index + command.length + 1);
                setInput(`${before}${result}${after}`);
            }
        };

        checkForCommands(input);
    }, [input, setInput]);

    // Runs through body of text and converts all instances of text in between ** ** to bold characters
    const toggleBold = () => {
        // get the selection window
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const text = range.toString();

            if (text) {
                const beg = text.slice(0, range.startOffset(0));
                const end = text.slice(range.endOffset);
                const newInput = beg + 'fake bold' + end;

                setInput(newInput);
                range.deleteContents();
                range.insertNode(document.createTextNode(`**${text}**`));
                selection.removeAllRanges();
            } else {
                setIsBold(!isBold);
                const newInput = isBold ? input + '**' : input
                setInput(newInput);
            }
        }
    }

    // Handles commands such as Ctrl+b and externally inputted commands
    const handleKeyDown = (e) => {
        if (e.ctrlKey && e.key === 'b') {
            e.preventDefault();
            console.log("Bold triggered");
            toggleBold();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [input, isBold])

    return null;
};

export default CommandHandler;