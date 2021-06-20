const express = require('express');
const path = require('path');
const fs = require ('fs')
const uuid = require('uuid')

//create a port
const app = express();
const PORT = process.env.PORT || 3000;

// set up middleware
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set file routes 
app.get('/', (req, res) => res.sendFile(path.join(__dirname,'public' ,'index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public','notes.html')));

app.get('/api/notes', (req, res) => {
  const savedNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'))
  
  res.json(savedNotes)
})

app.post('/api/notes', (req, res) => {
  const newNote = {
    id: uuid.v4(),
    title: req.body.title,
    text: req.body.text
  };

  const allNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  allNotes.push(newNote)
  fs.writeFileSync('./db/db.json', JSON.stringify(allNotes))
  
  res.json(newNote)
  
})

app.delete('/api/notes/:id', (req, res) => {
  // read the db.json file
  const selectedId = req.params.id;

  const noteList = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  console.log(noteList)

  for (let i = 0; i < noteList.length; i++) {
    if (selectedId === noteList[i].id) {
      noteList.splice(i, 1);
      
      fs.writeFileSync('./db/db.json', JSON.stringify(noteList), (err) => {
        if (err) throw err
        console.log('success')
      })
    }
  }
  res.json(noteList)
})

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));