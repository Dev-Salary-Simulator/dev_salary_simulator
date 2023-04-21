require("dotenv").config();

const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');

const { MONGO, SECRET, IP, PORT } = process.env;

const { 
    index,
    titles,
    regions,
    stack,
    search,
    searchSave,
    getSimulations,
    updateSimulation,
    deleteSimulation 
} = require('./controller/app-controller');

const checkToken = require("./middleware/checkToken");
const newAuth = require("./middleware/newAuth");

const app = express();

app.set('host', IP || '127.0.0.1');
app.set('port', PORT);
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

// Routes
router.get('/', index);

router.get('/titles', titles);

router.get('/regions', regions);

router.get('/stack', stack);

router.post("/search", search);

router.post("/search/save", [newAuth], searchSave);

router.get("/simulations", [newAuth], getSimulations);

// Mettre à jour une simulation
router.patch("/simulations", [newAuth], updateSimulation);

router.delete("/simulations", [newAuth], deleteSimulation);

// Route pour corriger les données de la BDD d'un coup (selon les attributs choisis)
// Faire la correction avec des paramètres semble compliqué, donc on doit se résoudre à la faire en dur
router.post("/fix", async (req, res) => {
    try {
        await Jobs.updateMany({ stack: "" }, { $set: { stack: [] } }).exec()
        .then(() => console.log("Les données ont été corrigées"))
        .catch(error => console.error("Erreur lors de la mise à jour.\n" + error))
        ;

        return res.send("Les données ont été corrigées").status(200);

    } catch (error) {
        console.error("Erreur lors de la récupération.\n" + error);
    }
});

app.use('/api/jobs', router);

module.exports = { app, PORT };