import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import EditorExtention from './EditorExtention'

function TextEditor() {
    const editor = useEditor({
        extensions: [StarterKit,
            Placeholder.configure({
                placeholder: 'Start Talking your note here...'
            })
        ],
        editorProps: {
            attributes: {
                class: 'focus:outline-none h-screen p-5'
            }
        }
    })
    return (
        <div>
            <EditorExtention editor={editor} />
            <div>
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}

export default TextEditor
