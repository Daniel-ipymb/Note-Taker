const express = require('express');
const path = require('path');
const fs = require ('fs')

//create a port
const app = express();
const PORT = 3000;

// set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set file routes 
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.get('/api/notes', (req, res) => {
  const savedNotes = JSON.parse(fs.readFile('./db.json', 'utf-8'))
  res.json(savedNotes)
})

app.post('/api/notes', (req, res) => {
  const newNote = req.body;

  const allNotes = JSON.parse(fs.readFile('./db.json', 'utf-8'));






})

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));