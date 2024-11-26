import React, { useEffect, useState, useCallback } from "react";

const CommandHandler = ({ input, setInput, editor }) => {
    const [isBold, setIsBold] = useState(false)

    const checkForCommands = useCallback((value) => {
        const regex = /\/(\w+)/g;
        let match;

        while ((match = regex.exec(value)) !== null) {
            handleCommand(match[1], match.index);
        }
    }, [input]);

    const clear = useCallback((command, index) => {
        const before = input.slice(0, index);
        const after = input.slice(index + command.length + 1);
        setInput(`${before}${after}`);
    }, [input, setInput])

    const replace = useCallback((command, index, insert) => {
        const before = input.slice(0, index);
        const after = input.slice(index + command.length + 1);
        setInput(`${before}${insert}${after}`);
    }, [input, setInput])

    const handleCommand = useCallback((command, index) => {
        switch (command) {
            case "d20":
                console.log(
                    "Rolled a d20: ",
                    Math.floor(Math.random() * 20) + 1
                );
                let insert = String(Math.floor(Math.random() * 20) + 1);
                replace(command, index, insert);
                break;
            // Add more commands as needed
            case "bold":
                // console.log('triggering bold');

                // Get the range index
                const range = editor.getSelection()
                editor.deleteText(range.index - command.length - 1, range.index)
                editor.format('bold', !isBold)
                setIsBold(!isBold)
                break;
            default:
                console.log(
                    `Command ${command} doesn't exist/isn't finished`
                );
        }
    }, [clear, editor, replace]);

    useEffect(() => {
        checkForCommands(input);
    }, [input, checkForCommands]);

    // Handles commands such as Ctrl+b and externally inputted commands
    const handleKeyDown = (e) => {
        const range = editor.getSelection()
        const format = editor.getFormat(range.index, range.length)
        console.log(format)

        if (e.ctrlKey && e.key === 'b') {
            e.preventDefault();
            if (range.length === 0) {
                editor.format('bold', !isBold)
                setIsBold(!isBold)
            } else {
                // if (format['bold'] === undefined) {
                //     editor.formatText(range.index, range.length, 'bold', true)
                // } else {
                //     editor.formatText(range.index, range.length, 'bold', false)
                // }
                console.log("bold is undefined: ", format['bold'] === undefined)
                editor.formatText(range.index, range.length, { 'bold': format['bold'] !== undefined })
            }
        }
    }

    useEffect(() => {
        // console.log("Noticed a keydown events")
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [input, isBold])

    return null;
};

export default CommandHandler;