require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const jwt  = require('jsonwebtoken');
const cors = require('cors');

const app = express(); 

app.use(cors())

const dataSchema = new mongoose.Schema({
    
});


const Data = mongoose.model('Data', dataSchema);

// Connexion à MongoDB
mongoose.connect("mongodb://localhost:27017/Eval")
.then ( () => console.log("Successfully connected to MongoDB") )
.catch( () => console.log("Connection failed") )