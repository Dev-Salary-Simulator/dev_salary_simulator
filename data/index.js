require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { MONGO } = process.env;

const { Jobs } = require("./model/Jobs");

const app = express(); 

app.use(cors());

const router = express.Router();

// Mongoose deprecated strictQuery
mongoose.set('strictQuery', false);

// Connexion à MongoDB
mongoose.connect(MONGO)
.then ( () => console.log("Successfully connected to MongoDB") )
.catch( () => console.log("Connection failed") )

// Routes
router.get('/', async (req, res) => {
    try {
        const jobs = await Jobs.find({}, { _id: 0}).exec();
        res.json(jobs);
    } catch (error) {
        console.error("Erreur lors de la récupération.\n" + error);
    }
});

router.get('/titles', async (req, res) => {
    try {
        const titles = await Jobs.find().distinct("title");
        res.json(titles);
    } catch (error) {
        console.error("Erreur lors de la récupération.\n" + error);
    }
});

router.get('/regions', async (req, res) => {
    try {
        const regions = await Jobs.find().distinct("region");
        res.json(regions);
    } catch (error) {
        console.error("Erreur lors de la récupération.\n" + error);
    }
});

router.get('/stack', async (req, res) => {
    const stacks = [];

    try {
        await Jobs.find().exec()
        .then(jobs => {
            jobs.map(job => {
                job.stack.map(stack => {
                    if (stack && !stacks.includes(stack.toLowerCase())) {
                        stacks.push(stack.toLowerCase());
                    }
                })
            })
        })
        ;
        res.json(stacks.sort());
    } catch (error) {
        console.error("Erreur lors de la récupération.\n" + error);
    }
});

app.use('/api/jobs', router);

app.listen(3000, () => console.log("Listening on port 3000") );