import React from 'react';
import { WebrtcProvider } from 'y-webrtc';
import * as Y from 'yjs';

import {
    BoldExtension,
    ItalicExtension,
    StrikeExtension,
    BlockquoteExtension,
    CodeExtension,
    CodeBlockExtension,
    YjsExtension 
} from 'remirror/extensions';
import { Remirror, useRemirror, EditorComponent, useCommands, useActive } from '@remirror/react';

import 'remirror/styles/all.css';
import './Editor.css'

const ydoc = new Y.Doc();
const provider = new WebrtcProvider('remirror-yjs-editor', ydoc);

const Menu = () => {
    const commands = useCommands();
    const active = useActive();
    return(
        <div className="menuContainer">
            <button
                style={{ fontWeight: active.bold()? 'bold' : undefined }} 
                onClick={() => {commands.toggleBold(); commands.focus();}}
            >B</button>
            <button
                style={{ fontWeight: active.italic()? 'bold' : undefined }} 
                onClick={() => {commands.toggleItalic(); commands.focus();}}
            >I</button>
            <button
                style={{ fontWeight: active.strike()? 'bold' : undefined }} 
                onClick={() => {commands.toggleStrike(); commands.focus();}}
            >Str</button>
            <button
                style={{ fontWeight: active.blockquote()? 'bold' : undefined }} 
                onClick={() => {commands.toggleBlockquote(); commands.focus();}}
            >"</button>
            <button
                style={{ fontWeight: active.code()? 'bold' : undefined }} 
                onClick={() => {commands.toggleCode(); commands.focus();}}
            >{`<>`}</button>
            <button
                style={{ fontWeight: active.codeBlock()? 'bold' : undefined }} 
                onClick={() => {commands.toggleCodeBlock(); commands.focus();}}
            >{`{}`}</button>
        </div>
        
    )
};

const Editor = () => {
    
    const { manager, state } = useRemirror({
        extensions: () => [
            new BoldExtension(),
            new ItalicExtension(),
            new StrikeExtension(),
            new BlockquoteExtension(),
            new CodeExtension(),
            new CodeBlockExtension(),
            new YjsExtension({ getProvider: () => provider }),
        ],
        core: {
            excludeExtensions: ['history'],
        },
        // content: '<p>I love <b>Remirror</b></p>',
        // selection: 'start',
        // stringHandler: 'html',
    });
    return (
        <div className='remirror-theme'>
            <Remirror manager={manager} initialContent={state}>
                <EditorComponent />
                <Menu />
            </Remirror>
        </div>
    )
}

export default Editor;