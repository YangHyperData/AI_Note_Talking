
import { chatSession } from '@/configs/AiModel';
import { api } from '@/convex/_generated/api';
import { useAction } from 'convex/react';
import { Bold, Code, Highlighter, Italic, Sparkles, Strikethrough } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react';

function EditorExtention({ editor }) {
    const { fileId } = useParams();
    const SearchAI = useAction(api.myAction.search)


    const onAiClick = async () => {
        const selectedText = editor.state.doc.textBetween(
            editor.state.selection.from,
            editor.state.selection.to,
            ' '
        );
        console.log("selectedText", selectedText);
        const result = await SearchAI({
            query: selectedText,
            fileId: fileId
        })

        const UnformattedAns = JSON.parse(result);
        let AllUnformattedAns = '';
        UnformattedAns && UnformattedAns.forEach(item => {
            AllUnformattedAns = AllUnformattedAns + item.pageContent
        });

        const PROMPT = "For question :" + selectedText + " and with the given content as answer," +
            "please give approriate answer in HTML format. The answer content is:" + AllUnformattedAns;
        console.log("Unformatted Ans:", result);

        const AiModelResult = await chatSession.sendMessage(PROMPT);
        console.log(AiModelResult.response.text());
        const FinalAns = AiModelResult.response.text().replace('```','').replace('html','').replace('```','');

        const AllText = editor.getHTML();
        editor.commands.setContent(AllText + '<p> <strong>Answer:</strong>' + FinalAns + ' </p>');
    }
    if (!editor) {
        return null;
    }

    return editor && (
        <div className='p-5 '>
            <div className="control-group">
                <div className="button-group flex gap-3">
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={editor.isActive('bold') ? 'text-blue-500' : ''}
                    >
                        <Bold />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={editor.isActive('italic') ? 'text-blue-500' : ''}
                    >
                        <Italic />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleCode().run()}
                        className={editor.isActive('code') ? 'text-blue-500' : ''}
                    >
                        <Code />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={editor.isActive('strike') ? 'text-blue-500' : ''}
                    >
                        <Strikethrough />
                    </button>
                    <button
                        onClick={() => onAiClick()}
                        className={'hover:text-blue-500'}
                    >
                        <Sparkles />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditorExtention;
