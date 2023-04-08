const mongoose = require('mongoose');

const simulationSchema = new mongoose.Schema({
    averagesalary: Number,
    lowestSalary: Number,
    highestSalary: Number,
    parameters : {
        region : String,
        title : String,
        stack : [String],
        experience : Number
    }
});

const Simulation = mongoose.model('Simulation', simulationSchema);

module.exports = { simulationSchema, Simulation }