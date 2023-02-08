//--- Importing modules ---//
const fs = require('fs');
const path = require('path');
const express = require('express');
const dbFile = require('./db/db.json');
var uuuidv1 = require('uuidv1');

//--- setting PORT 3001 and initializing app ---//
const PORT = process.env.PORT || 3001;
const app = express();
