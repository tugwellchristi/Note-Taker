// // Create express routes for default '/', '*' and '/notes' endpoints
// app.get('/', (req, res) => 
//     res.sendFile(path.join(__dirname, 'public/index.html')));
     
// app.get('/notes', (req, res) =>
//     res.sendFile(path.join(__dirname, 'public/notes.html')));

// app.get('/api/notes', (req, res) => {
//     try {
//         const notes = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));
//         res.json(notes);
//     } catch (error) {
//         console.error('Error reading db.json', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Post notes route
// app.post('/api/notes', (req, res) => {
//     try {
//         const newNote = req.body;
//         const notes = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

//         newNote.id = Math.random().toString(36).substr(2, 9);

//         notes.push(newNote);

//         fs.writeFileSync(dbFilePath, JSON.stringify(notes));

//         res.json(newNote);
//     } catch (error) {
//         console.error('Error writing to db.json', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Delete notes route
// app.delete('/api/notes/:id', (req, res) => {
//     try {
//         const noteId = req.params.id;
//         let notes = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

//         notes = notes.filter((note) => note.id !== noteId);

//         fs.writeFileSync(dbFilePath, JSON.stringify(notes));

//         res.json({ success: true });
//     } catch (error) {
//         console.error('Error deleting from db.json', error);
//         res.status(500).send('Internal Server Error');
//     }
// });