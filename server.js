//Import express and node package "path"
const express = require('express');
const fs = require('fs');
const path = require('path');

// Identify the port of use and initialize the app express use
const app = express();
const PORT = 3001;

// Middleware pointing to the public folder
app.use(express.static('public'));

// Create express routes for default '/', '*' and '/notes' endpoints
// app.get('/', (req, res) => res.send('Navigate to * or /notes'));
     
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);