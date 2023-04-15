const { Jobs } = require("../model/Jobs");
const { User } = require("../model/User");

const index = async (req, res) => {
    try {
        const jobs = await Jobs.find({}, { _id: 0}).exec();
        return res.json(jobs).status(200);
    } catch (error) {
        console.error("Erreur lors de la récupération.\n" + error);
    }
};

const titles = async (req, res) => {
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
};

const regions = async (req, res) => {
    try {
        const regions = await Jobs.find().distinct("region");
        return res.json(regions.filter(item => item !== "").sort()).status(200);
    } catch (error) {
        console.error("Erreur lors de la récupération.\n" + error);
    }
};

const stack = async (req, res) => {
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
};

const search = async (req, res) => {
    const { nameJob, experience, namesStack, nameRegion, status } = req.body;

    const regexTitle = new RegExp(nameJob, "i");
    const regexRegion = new RegExp(nameRegion, "i");

    const findObj = {};

    if (regexTitle)  findObj.title = regexTitle;
    if (regexRegion) findObj.region = regexRegion;
    if (experience)  findObj.experience = experience;
    if (namesStack)  findObj.stack = { $all: namesStack };
    if (status)      findObj.status = status;

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
                nameJob,
                experience,
                namesStack,
                nameRegion,
                status
            },
        }).status(200);

    } catch (error) {
        console.error("Erreur lors de la récupération.\n" + error);
    }
};

const searchSave = async (req, res) => {
    const { simulation, saveName } = req.body;

    if (!simulation) return res.send("Vous devez spécifier une simulation à sauvegarder").status(400);

    const date = new Date();

    await User.updateOne({ _id : req.userId }, { $push: { simulations : { name : saveName, date, simulation } } } ).exec();

    const user = await User.findById(req.userId).exec();

    return res.json(user.simulations).status(200);
};

const getSimulations = async (req, res) => {
    const user = await User.findById(req.userId).exec();

    return res.json(user.simulations).status(200);
}

const updateSimulation = async (req, res) => {
    const { id, saveName } = req.body;

    if (!id) return res.send("Vous devez spécifier une simulation à mettre à jour").status(400);

    await User.updateOne({ _id : req.userId, "simulations._id" : id }, { $set: { "simulations.$.name" : saveName } } ).exec();

    const user = await User.findById(req.userId).exec();

    const simulation = user.simulations.find(simulation => simulation._id == id);

    return res.json(simulation).status(200);
};

const deleteSimulation = async (req, res) => {
    const { id } = req.body;

    if (!id) return res.send("Vous devez spécifier une simulation à supprimer").status(400);

    await User.updateOne({ _id : req.userId }, { $pull: { simulations : { _id : id } } } ).exec();

    const user = await User.findById(req.userId).exec();

    return res.json(user.simulations).status(200);
};

module.exports = {
    index,
    titles,
    regions,
    stack,
    search,
    searchSave,
    getSimulations,
    updateSimulation,
    deleteSimulation
}