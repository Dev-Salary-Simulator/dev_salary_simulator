require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { MONGO } = process.env;

const { Jobs } = require("./model/Jobs");

const app = express(); 

app.use(cors());

// Mongoose deprecated strictQuery
mongoose.set('strictQuery', false);

// Routes
app.get('/api/jobs', async (req, res) => {
    try {
        const jobs = await Jobs.find({}, { _id: 0}).exec();
        res.json(jobs);
    } catch (error) {
        console.error("Erreur lors de la récupération.\n" + error);
    }
});

app.get('/api/jobs/titles', async (req, res) => {
    try {
        const titles = await Jobs.find().distinct("title");
        res.json(titles);
    } catch (error) {
        console.error("Erreur lors de la récupération.\n" + error);
    }
});

// Connexion à MongoDB
mongoose.connect(MONGO)
.then ( () => console.log("Successfully connected to MongoDB") )
.catch( () => console.log("Connection failed") )

app.listen(3000, () => {
    console.log("Listening on port 3000");   
});