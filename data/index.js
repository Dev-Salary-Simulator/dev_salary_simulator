require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const jwt  = require('jsonwebtoken');
const cors = require('cors');

const app = express(); 

app.use(cors())

const jobSchema = new mongoose.Schema({
    idUser: mongoose.ObjectId,
    region: String,
    title: String,
    stack: [String],
    experience: Number,
    salary: Number,
    companyName: String,
    status: String
});


const Jobs = mongoose.model('Jobs', jobSchema);

// Connexion à MongoDB
mongoose.connect("mongodb://localhost:27017/Eval")
.then ( () => console.log("Successfully connected to MongoDB") )
.catch( () => console.log("Connection failed") )