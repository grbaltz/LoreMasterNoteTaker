import React, { useEffect, useState, useCallback } from "react";
import { stripHtml } from '../utils/utils';

const CommandHandler = ({ input, setInput, editor }) => {
    const [isBold, setIsBold] = useState(false)

    const checkForCommands = useCallback((value) => {
        const text = stripHtml(value)
        const regex = /\/(\w+)/g;
        let match;

        while ((match = regex.exec(text)) !== null) {
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
<<<<<<< HEAD
            case "1": case "2": case "3": case "4":
                editor.format('header', Number(command))
                break
=======
            case "1": case "2": case "3":
                editor.format('header', Number(command))
                break
            case "4": case "normal":
                editor.format('header', false)
                break
>>>>>>> b79fc7cf (Attempting to implement pathing aliases)
            case "bold":
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

<<<<<<< HEAD
=======
    useEffect(() => {
        checkForCommands(input);
    }, [input, checkForCommands]);

>>>>>>> b79fc7cf (Attempting to implement pathing aliases)
    return null;
};

export default CommandHandler;