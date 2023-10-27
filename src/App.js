import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editedNote, setEditedNote] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  // Load notes from local storage on component mount
  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  // Save notes to local storage whenever notes change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

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
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = editedNote;
      setNotes(updatedNotes);
      setEditedNote('');
      setEditIndex(null);
    }
  }

  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  }

  return (
    <div className="app-container">
      <h1>Simple Note-Taking App</h1>
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
                <button className="save-button" onClick={handleSaveEdit}>Save</button>
              </div>
            ) : (
              <div>
                {note}
                <div className="edit-buttons">
                  <button className="edit-button" onClick={() => handleEditNote(index)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDeleteNote(index)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
