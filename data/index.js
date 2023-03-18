require("dotenv").config();

const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const jwt  = require('jsonwebtoken');

const { MONGO, SECRET, JWT_KEY } = process.env;

const { Jobs } = require("./model/Jobs");
const { User } = require("./model/User");

const app = express();

const port = 3000;

app.set('host', process.env.IP || '127.0.0.1');
app.set('port', port);
app.disable('x-powered-by'); 

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SECRET,
    cookie: { httpOnly: true, secure: true}
}));

app.use(express.json());
app.use(cors());

const router = express.Router();

// Mongoose deprecated strictQuery
mongoose.set('strictQuery', false);

// Connexion à MongoDB
mongoose.connect(MONGO)
.then ( () => console.log("Successfully connected to MongoDB") )
.catch( () => console.log("Connection failed") )

let token = null;
let user = null;

const isAuthenticated = (req, res, next) => {
    if (!user) 
        return res.status(401).json({ error: "Vous devez être connecté pour lancer une recherche" });

    next();
};

// Routes
router.get('/', async (req, res) => {
    try {
        const jobs = await Jobs.find({}, { _id: 0}).exec();
        return res.json(jobs).status(200);
    } catch (error) {
        console.error("Erreur lors de la récupération.\n" + error);
    }
});

router.get('/titles', async (req, res) => {
    try {
        const titles = await Jobs.find().distinct("title");
        return res.json(titles.sort()).status(200);
    } catch (error) {
        console.error("Erreur lors de la récupération.\n" + error);
    }
});

router.get('/regions', async (req, res) => {
    try {
        const regions = await Jobs.find().distinct("region");
        return res.json(regions.sort()).status(200);
    } catch (error) {
        console.error("Erreur lors de la récupération.\n" + error);
    }
});

router.get('/stack', async (req, res) => {
    const stacks = [];

    try {
        await Jobs.find().exec()
            .then(jobs => {
                // Pour chaque job, on récupère la stack
                jobs.map(job => {
                    // Pour chaque élément de la stack, on vérifie s'il est déjà dans le tableau
                    job.stack.map(stack => {
                        if (stack !== "" && !stacks.includes(stack.toLowerCase())) {
                            stacks.push(stack.toLowerCase());
                        }
                    })
                })
            })
            .catch(error => console.error("Erreur lors de la récupération.\n" + error))
        ;

        return res.json(stacks.sort()).status(200);
    } catch (error) {
        console.error("Erreur lors de la récupération.\n" + error);
    }
});

router.post("/search", async (req, res) => {
    const { title, experience, stack, region } = req.body;

    const regexTitle = new RegExp(title, "i");
    const regexRegion = new RegExp(region, "i");

    const findObj = {};

    if (regexTitle)  findObj.title = regexTitle;
    if (regexRegion) findObj.region = regexRegion;
    if (experience)  findObj.experience = experience;
    if (stack)       findObj.stack = { $all: stack };
    
    const simulationObj = { ...findObj, stack : stack };

    try {
        const jobs = await Jobs.find(findObj, { _id: 0});

        if (user !== null) {
            // On enregistre la recherche dans les simulations du User
            const userSearch = await User.updateOne({ _id : user._id }, { $push: { simulations : simulationObj } } ).exec();
        }

        return res.json(jobs).status(200);
    } catch (error) {
        console.error("Erreur lors de la récupération.\n" + error);
    }
});

router.post("/saveUser", (req, res) => {
    const { token: tokenReceived } = req.body;

    if (!tokenReceived) return res.json({ error: "Vous n'avez pas envoyé de token" }).status(400);

    try {
        const decoded = jwt.verify(tokenReceived, JWT_KEY);
        user = decoded;
        token = tokenReceived;
    } catch (err) {
        return res.json({erreur: "Token Invalide"}).status(403);
    }

    return res.send("Token enregistré").status(200);
});

app.use('/api/jobs', router);

app.listen(port, () => console.log(`Listening on port ${port}`) );