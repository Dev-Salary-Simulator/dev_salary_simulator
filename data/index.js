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
const { Simulation } = require("./model/Simulation");

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

// let token = null;
let user = null;

const isAuthenticated = (req, res, next) => {
    if (!user) 
        return res.status(401).json({ error: "Vous devez être connecté pour lancer une recherche" });

    next();
};

const checkToken = (req, res, next) => {
    // const token = req.headers['Authorization'];
    const token = req.headers['x-access-token'];

    // Vérification de l'existence du token
    if (!token) {
        return res.status(401).send('Aucun token fourni');
    }

    // Décodage du token
    jwt.verify(token, JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).send('Erreur lors de la vérification du token');
        }

        // Si tout est bon, sauvegarder l'id du user pour une utilisation dans d'autres routes
        req.userId = decoded._id;
        next();
    });
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

    try {
        const jobs = await Jobs.find(findObj, { _id: 0});

        const lowestSalary = Math.min(...jobs.map(job => job.salary));
        const highestSalary = Math.max(...jobs.map(job => job.salary));
        const averageSalary = Math.round(jobs.reduce((acc, job) => acc + job.salary, 0) / jobs.length);

        return res.json({
            lowestSalary,
            highestSalary,
            averageSalary,
            parameters: {
                title,
                experience,
                stack,
                region
            },
        }).status(200);

    } catch (error) {
        console.error("Erreur lors de la récupération.\n" + error);
    }
});

router.get("/simulations", [checkToken], async (req, res) => {
    const simulations = await User.find({ _id : req.userId }, { _id: 0, simulations: 1 }).exec();

    return res.json(simulations).status(200);
});

router.post("/search/save", [checkToken], async (req, res) => {
    const { simulation, saveName } = req.body;

    if (!simulation) return res.send("Vous devez spécifier une simulation à sauvegarder").status(400);

    const saveSimulation = new Simulation(simulation);

    const date = new Date();

    const userSearch = await User.updateOne({ _id : req.userId }, { $push: { simulations : { saveSimulation, date, saveName } } } ).exec();

    return res.json(userSearch.simulations).status(200);
});

// créer une route pour corriger les données de la BDD d'un coup (selon les attributs choisis)
router.post("/fix", async (req, res) => {
    const { column, oldValue, correctValue } = req.body;

    if ( !column )                  return res.send("Vous devez spécifier une colonne à corriger").status(400);
    if ( oldValue === null )        return res.send("Vous devez spécifier une valeur à remplacer").status(400);
    if ( correctValue === null )    return res.send("Vous devez spécifier une valeur de remplacement").status(400);

    // Check if column exists in Jobs collection
    const columns = await Jobs.schema.obj;
    if (!columns[column]) return res.send("La colonne n'existe pas").status(400);
    
    try {    
        // Find all jobs in MongoDB Jobs collection where { column : oldValue }
        const jobs = await Jobs.find({ column : oldValue });
        
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