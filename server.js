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
app.use(express.json());
app.use(express.static("public"));


//--- Defining the routing ---//

    //-- GET route for '/notes' --//
    app.get('/notes',(req,res)=>{
        res.sendFile(path.join(__dirname, './public/notes.html'));
    });


    //-- GET route for '/api/notes' from the db.json file and sends a JSON response--//
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


    //-- "Catch-all" GET route for any other endpoint that sends to  'index.html' --// 
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname,'./public/index.html'));
    });


    //-- BONUS ROUND: DELETE route for '/api/notes/ (use http://localhost:3001/api/notes/:id) --//
    app.delete('/api/notes/:id', function (req, res) {
        console.log("Req.params:", req.params);
        let deletedNoteId = req.params.id;
        console.log("Deleted note id:", deletedNoteId);
    
        let deletedNoteIndex = -1;
        for (let i = 0; i < dbFile.length; i++) {
            if (deletedNoteId === dbFile[i].id) {
                deletedNoteIndex = i;
                break;
            }
        }
    
        if (deletedNoteIndex === -1) {
            res.status(404).json({error: "Note not found"});
            return;
        }
    
        dbFile.splice(deletedNoteIndex, 1); 
    
        let dataJson = JSON.stringify(dbFile, null, 2);
        fs.writeFile('./db/db.json', dataJson, function (err) {
            if (err) {
                res.status(500).json({error: "Failed to write to file"});
                return;
            }
    
            console.log('Your note has been deleted successfully!');
            res.json(dbFile);
        });
    });
    
    
    
     
    app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
  );
  