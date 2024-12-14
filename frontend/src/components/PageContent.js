import React, { useState, useEffect, useContext, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/PageContent.css';
import CommandHandler from '../handlers/CommandHandler';
import { PagesContext } from '../contexts/PagesContext'; // Update this path to your actual context file
import * as api from '../api'; // Import the function
import { createEditor, Editor, Transforms, Element as SlateElement, } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, Editable, withReact } from 'slate-react';

const initialValue = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
      { text: 'rich', bold: true },
      { text: ' text, ' },
      { text: 'much', italic: true },
      { text: ' better than a ' },
      { text: '<textarea>', code: true },
      { text: '!' },
    ],
  },
]

const Element = ({ attributes, children, element }) => {
  const style = { textAlign: element.align }
  switch (element.type) {
    case 'heading-one':
      return <h1 style={style} {...attributes}>
        {children}
      </h1>
    case 'heading-two':
      return <h2 style={style} {...attributes}>
        {children}
      </h2>
    case 'heading-three':
      return <h3 style={style} {...attributes}>
        {children}
      </h3>
    case 'heading-four':
      return <h4 style={style} {...attributes}>
        {children}
        </h4>
    case 'bulleted-list':
      return <ul style={style} {...attributes}>
        {children}
      </ul>
    case 'numbered-list':
      return <ol style={style} {...attributes}>
        {children}
      </ol>
    case 'list-item':
      return <li style={style} {...attributes}>
        {children}
      </li>
    default:
      return <p style={style} {...attributes}>{children}</p>
  }
}

const Leaf = ({ attributes, children, leaf}) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }
  if (leaf.italic) {
    children = <em>{children}</em>
  }
  if (leaf.underline) {
    children = <ul>{children}</ul>
  }
  if (leaf.code) {
    children = <code>{children}</code>
  }

  return <span {...attributes}>{children}</span>
}

const PageContent = () => {
  const { id } = useParams();
  const { pages, dispatch } = useContext(PagesContext);
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);
  const editor = useMemo(() => withReact(withHistory(createEditor())), []);
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])

  useEffect(() => {
    console.log("Loading page")
    const fetchContent = async () => {
      try {
        setInput(await api.fetchPageContent(id));
      } catch (err) {
        console.log(err);
      }
    }
    
    fetchContent();
  }, [id]);

  return (
    <>
      <Slate editor={editor} initialValue={initialValue}>
        <Editable 
          renderElement={renderElement} 
          renderLeaf={renderLeaf}
          placeholder="Type something cool here..."/>
      </Slate>
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
    </>
  );
};

export default PageContent;
