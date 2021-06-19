const express = require('express');
const path = require('path');

//create a port
const app = express();
const PORT = 3000;

// set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set file routes 
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '../public/assests/notes.html')));

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));