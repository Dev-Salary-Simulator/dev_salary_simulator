require("dotenv").config();

const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const jwt  = require('jsonwebtoken');

const { MONGO, SECRET, JWT_KEY, IP } = process.env;

const { Jobs } = require("./model/Jobs");
const { User } = require("./model/User");

const app = express();

const port = 3000;

app.set('host', IP || '127.0.0.1');
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
        // $toLower : titres en minuscules,
        // $group : les regrouper,
        // $first : premier titre pour chaque groupe. 
        // $project : renvoyer que les titres.
        const result = await Jobs.aggregate([
            {
                $group: {
                    _id: { $toLower: "$title" },
                    title: { $first: "$title" }
                }
            },
            {
                $project: {
                    _id: 0,
                    title: 1
                }
            }
        ]);
        
        // titles est un array qui ne contient que les intitulés des jobs
        const titles = result.map(item => item.title);

        return res.json(titles.filter(item => item !== "").sort()).status(200);
    } catch (error) {
        console.error("Erreur lors de la récupération.\n" + error);
    }
});

router.get('/regions', async (req, res) => {
    try {
        const regions = await Jobs.find().distinct("region");
        return res.json(regions.filter(item => item !== "").sort()).status(200);
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
                        if (stack && !stacks.includes(stack.toLowerCase())) {
                            stacks.push(stack.toLowerCase());
                        }
                    })
                })
            })
            .catch(error => console.error("Erreur lors de la récupération.\n" + error))
        ;

        return res.json(stacks.filter(item => item !== "").sort()).status(200);
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
    
    // const simulationObj = { ...findObj, stack : stack };

    try {
        const jobs = await Jobs.find(findObj, { _id: 0});

        // if (user !== null) {
        //     // On enregistre la recherche dans les simulations du User
        //     const userSearch = await User.updateOne({ _id : user._id }, { $push: { simulations : { ...simulationObj, title, region } } } ).exec();
        // }

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

router.get("/simulations", async (req, res) => {
    if (!user) return res.json({ error: "Vous n'êtes pas connecté" }).status(401);

    const simulations = await User.find({ _id : user._id }, { _id: 0, simulations: 1 }).exec();

    return res.json(simulations).status(200);
});

// créer une route pour corriger les données de la BDD d'un coup (selon les attributs choisis)
router.post("/fix", async (req, res) => {
    const { column, oldValue, correctValue } = req.body;

    if ( !column )          res.send("Vous devez spécifier une colonne à corriger").status(400);
    if ( !oldValue )        res.send("Vous devez spécifier une valeur à remplacer").status(400);
    if ( !correctValue )    res.send("Vous devez spécifier une valeur de remplacement").status(400);

    // Check if column exists in Jobs collection
    const columns = await Jobs.schema.obj;
    if (!columns[column]) return res.send("La colonne n'existe pas").status(400);
    
    try {    
        // Find all jobs in MongoDB Jobs collection where { column : oldValue }
        const jobs = await Jobs.find({ column : oldValue }, { _id: 0});
        
        // Update all jobs : column <= correctValue
        jobs.map(async job => {
            await Jobs.updateOne({ _id : job._id }, { $set: { column : correctValue } } ).exec();
        });

        return res.send("Les données ont été corrigées").status(200);

    } catch (error) {
        console.error("Erreur lors de la récupération.\n" + error);
    }
});

app.use('/api/jobs', router);

app.listen(port, () => console.log(`Listening on port ${port}`) );