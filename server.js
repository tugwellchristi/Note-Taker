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

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Create express routes for default '/', '*' and '/notes' endpoints
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html')));

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html')));

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html')));


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);