import { React, useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import CommandHandler from '../handlers/CommandHandler';
import 'react-quill/dist/quill.snow.css';
import '../styles/QuillEditor.css';

function TextEditor () {
    const [value, setValue] = useState('');
    const edRef = useRef(null)
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],
      
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
      
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, false,] }],
      
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
      
        ['clean']                                         // remove formatting button
      ];

    const modules = {
        toolbar: toolbarOptions, 
    };

    return (
        <>
            <ReactQuill 
                ref={edRef}
                theme="snow"
                value={value}
                onChange={setValue}
                modules={modules}
                placeholder="Type a message or roll a dice"
            />
            {edRef.current &&
                <CommandHandler input={value} setInput={setValue} editor={edRef.current.getEditor()} />
            }
        </>
    )
}

export default TextEditor;