//--- Importing modules ---//
const fs = require('fs');
const path = require('path');
const express = require('express');
const dbFile = require('./db/db.json');
var uuuidv1 = require('uuidv1');

//--- setting PORT 3001 and initializing app ---//
const PORT = process.env.PORT || 3001;
const app = express();

//--- TODO: set Middleware Functions---//

    //-- parsing incoming string/ data from the client
app.use(express.urlencoded({ extended: true }));
    //-- serve the contents of the public directory as static files
app.use(express.json());
app.use(express.static("public"));

// TODO: define the routing

    // TODO: GET for '/notes'
    app.get('/notes',(req,res)=>{
        res.sendFile(path.join(__dirname, './public/notes.html'));
    });

    // TODO: GET for '/api/notes' from the db.json file and sends a JSON response

    // TODO: POST route for `/api/notes` that receives a JSON object from the request body, adds an ID to it, writes the new data to the "db.json" file, and sends a success message as a JSON response

    // TODO: catch-all GET route for any other endpoint that sends the `index.html` file located in the "public" folder

    // TODO: BONUS ROUND: DELETE route for '/api/notes/:id' that deletes the note with the specified ID from the "db.json" file



    app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
  );
  