const mongoose = require('mongoose');

const simulationSchema = new mongoose.Schema({
    averageSalary: Number,
    lowestSalary: Number,
    highestSalary: Number,
    parameters : {
        nameRegion : String,
        nameJob : String,
        namesStack : [String],
        experience : Number,
        status : String
    }
});

// const Simulation = mongoose.model('Simulation', simulationSchema);

module.exports = { simulationSchema }