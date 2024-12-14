import React, { useState, useMemo } from 'react';
import { createEditor, Path, Node, Transforms } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, Editable, withReact } from 'slate-react';
import { useEditorConfig } from '../hooks/useEditorConfig';

const withImage = (editor) => {
  const { isVoid } = editor;

  editor.isVoid = (element) =>
    element.type === 'image' ? true : isVoid(element);

  return editor;
}

export default function Editor({ document, onChange }) {
  const editor = useMemo(() => withReact(withHistory(withImage(createEditor()))), []);
  const { renderElement } = useEditorConfig(editor);

  const { isVoid, insertBreak } = editor;

  editor.insertBreak = (...args) => {
    const parentPath = Path.parent(editor.selection.focus.path);
    const parentNode = Node.get(editor, parentPath);

    if (isVoid(parentNode)) {
      const nextPath = Path.next(parentPath);
      Transforms.insertNodes(
        editor,
        {
          type: 'paragraph',
          children: [{ text: ''}]
        },
        {
          at: nextPath,
          select: true
        }
      );
    } else {
      insertBreak(...args);
    }
  }

  return (
    <Slate editor={editor} value={document} onChange={onChange}>
      <Editable renderElement={renderElement} />
    </Slate>
  )
}
