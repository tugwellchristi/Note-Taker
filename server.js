//Import express and node package "path"
const express = require('express');
const path = require('path');
const notes = require('./db/notes.json');

// Identify the port of use and initialize the app express use
const app = express();
const PORT = 3001;


// Serve images, css files, js files from the public directory
// Allows us to reference files with their relative path
app.use(express.static('public'));
app.use(express.json());


// Create express routes for default '/', '*' and '/notes' endpoints
app.get('/', (req, res) => res.send('Navigate to * or /notes'));
     
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);