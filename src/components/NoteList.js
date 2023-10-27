import React, { useState } from 'react';
import './NoteList.css';

function NoteList() {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [editedNote, setEditedNote] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    const handleAddNote = () => {
        if (newNote.trim() !== '') {
            setNotes([...notes, newNote]);
            setNewNote('');
        }
    }

    const handleEditNote = (index) => {
        setEditedNote(notes[index]);
        setEditIndex(index);
    }

    const handleSaveEdit = () => {
        if (editedNote.trim() !== '' && editIndex !== null) {
            notes[editIndex] = editedNote;
            setNotes([...notes]);
            setEditedNote('');
            setEditIndex(null);
        }
    }

    const handleDeleteNote = (index) => {
        notes.splice(index, 1);
        setNotes([...notes]);
    }

    return (
        <div className="note-list-container">
            <h1>Simple Note App</h1>
            <div className="note-input">
                <input
                    type="text"
                    placeholder="Add a new note"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                />
                <button className="add-button" onClick={handleAddNote}>Add</button>
            </div>
            <ul className="note-list">
                {notes.map((note, index) => (
                    <li key={index} className="note-item">
                        {editIndex === index ? (
                            <div>
                                <input
                                    type="text"
                                    value={editedNote}
                                    onChange={(e) => setEditedNote(e.target.value)}
                                />
                                <button onClick={handleSaveEdit}>Save</button>
                            </div>
                        ) : (
                            <div>
                                {note}
                                <button onClick={() => handleEditNote(index)}>Edit</button>
                                <button onClick={() => handleDeleteNote(index)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NoteList;
