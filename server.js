//--- Importing modules ---//
const fs = require('fs');
const path = require('path');
const express = require('express');
const dbFile = require('./db/db.json');
var uuuidv1 = require('uuidv1');

//--- setting PORT 3001 and initializing app ---//
const PORT = process.env.PORT || 3001;
const app = express();

//--- Set Middleware Functions---//

    //-- Parsing incoming string/ data from the client --//
app.use(express.urlencoded({ extended: true }));
    //-- serve the contents of the public directory as static files
app.use(express.json());
app.use(express.static("public"));

//--- Define the routing ---//

    //-- GET for '/notes' --//
    app.get('/notes',(req,res)=>{
        res.sendFile(path.join(__dirname, './public/notes.html'));
    });

    //-- GET for '/api/notes' from the db.json file and sends a JSON response--//
    app.get('/api/notes',(req,res)=>{
        const dataNotes = fs.readFileSync(path.join(__dirname, './db/db.json'), 'utf8');
        const parseNotes = JSON.parse(dataNotes);
        res.json(parseNotes);
    });

    //-- POST route for `/api/notes` that receives a JSON object from the request body and adds an ID to it --//
    app.post('/api/notes',(req,res) => {
        const dataNotes = fs.readFileSync(path.join(__dirname,'./db/db.json'),'utf8');
        const parseNotes = JSON.parse(dataNotes);
        req.body.id = uuuidv1();
        parseNotes.push(req.body);

        fs.writeFileSync(path.join(__dirname,'./db/db.json'), JSON.stringify(parseNotes), 'utf8');
        res.json('You have added a new note!');
    });

    // "Catch-all" GET route for any other endpoint that sends to  'index.html' --// 
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname,'./public/index.html'));
    });

    // TODO: BONUS ROUND: DELETE route for '/api/notes/:id' that deletes the note with the specified ID from the "db.json" file



    app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
  );
  