import React, { useState, useMemo } from 'react'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { Slate, Editable, withReact } from 'slate-react'

const Editor = () => {
  const editor = useMemo(() => withReact(withHistory(createEditor())), [])
  const [value, setValue] = useState([
    {
        type: 'paragraph',
        children: [{ text: 'poop' }]
    },
    {
        type: 'image',
        src: '../images/brawl.png',
        alt: 'brawlhalla lobby',
        children: [{ text: '' }]
    }
  ])

  const Paragraph = ({ attributes, children}) => {
    <p {...attributes}>{children}</p>
  }

  const Image = ({ attributes, element, children }) => {
    <div {...attributes}>
        <div contentEditable={false}>
            <img src={element.src} alt={element.alt} />
        </div>
        {children}
    </div>
  }

  const renderElement = (props) => {
    switch(props.element.type) {
        case 'image':
            return <Image {...props} />
        default:
            return <Paragraph {...props} />
    }
  }

  return (
    <Slate editor={editor} initialValue={value} onChange={newValue => setValue(newValue)}>
      <Editor renderElement={renderElement} />
      {/* <Editable /> */}
    </Slate>
  )
}

export default Editor
