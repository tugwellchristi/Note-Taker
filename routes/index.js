const express = require('express');

const notesRouter = require('./notesRoutes');
const homeRouter = require('./homeRoutes');

const app = express();

app.use('/notes', notesRouter);
app.use('/home', homeRouter);

module.exports = app;