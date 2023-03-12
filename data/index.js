require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { MONGO } = process.env;

const { Jobs } = require("./model/Jobs");

const app = express(); 

app.use(cors());

mongoose.set('strictQuery', false);

// Connexion à MongoDB
mongoose.connect(MONGO)
.then ( () => console.log("Successfully connected to MongoDB") )
.catch( () => console.log("Connection failed") )

app.listen(3000, () => {
    console.log("Listening on port 3000");   
});