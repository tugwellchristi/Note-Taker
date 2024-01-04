//Import express and node package "path"
const express = require('express');
const path = require('path');
const fs = require('fs');

// Identify the port of use and initialize the app express use
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve images, css files, js files from the public directory
// Allows us to reference files with their relative path
app.use(express.static('public'));

// Path to db.json file
const dbFilePath = path.join(__dirname, 'db', 'db.json');

// Create express routes for default '/', '*' and '/notes' endpoints
app.get('/', (req, res) => res.send('Navigate to * or /notes'));
     
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    try {
        const notes = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));
        res.json(notes);
    } catch (error) {
        console.error('Error reading db.json', error);
        res.status(500).send('Internal Server Error');
    }
});

// Post notes route
app.post('api/notes', (req, res) => {
    try {
        const newNote = req.body;
        const notes = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

        newNote.id = Math.random().toString(36).substr(2, 9);

        notes.push(newNote);

        fs.writeFileSync(dbFilePath, JSON.stringify(notes));

        res.json(newNote);
    } catch (error) {
        console.error('Error writing to db.json', error);
        res.status(500).send('Internal Server Error');
    }
});

// Delete notes route
app.delete('/api/notes/:id', (req, res) => {
    try {
        const noteId = req.params.id;
        let notes = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

        notes = notes.filter((note) => note.id !== noteId);

        fs.writeFileSync(dbFilePath, JSON.stringify(notes));

        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting from db.json', error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);