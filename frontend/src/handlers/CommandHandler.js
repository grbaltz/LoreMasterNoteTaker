import React, { useEffect } from "react";

const CommandHandler = ({ input, setInput }) => {
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

    return null;
};

export default CommandHandler;
