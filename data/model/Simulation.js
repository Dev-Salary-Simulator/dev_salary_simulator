const mongoose = require('mongoose');

const Simulation = new mongoose.Schema({
    averagesalary: Number,
    lowestSalary: Number,
    highestSalary: Number,
    paramters : {
        region : String,
        title : String,
        stack : [String],
        experience : Number
    }
});

module.exports = { Simulation }