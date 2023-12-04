const fs = require('fs');
const path = require('path');

const dbFilePath = path.join(__dirname, 'db.json');

// Read existing notes 
const getNotes = () => {
    const data = fs.readFileSync(dbFilePath, 'utf8');
    return JSON.parse(data);
};

// Save note
const saveNote = (note) => {
    const notes = getNotes();
    note.id = Math.random().toString();
    notes.push(note);
    fs.writeFileSync(dbFilePath, JSON.stringify(notes, null, 2), 'utf8');
};

// Delete note
const deleteNote = (id) => {
    const notes = getNotes().filter((note) => note.id !== id);
    fs.writeFileSync(dbFilePath, JSON.stringify(notes, null, 2), 'utf8');
};

app.get('/api/notes', (req, res) => {
    const notes = getNotes();
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    saveNote(newNote);
    res.json(newNote);
});

app.delete('/api/notes', (req, res) => {
    const noteId = req.params.id;
    deleteNote(noteId);
    res.json({ message: 'Note has been deleted'});
});