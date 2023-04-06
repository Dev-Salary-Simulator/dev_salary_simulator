const mongoose = require('mongoose');

const { jobSchema : Job } = require('./Jobs');

const { Simulation } = require('./Simulation');

const userSchema = new mongoose.Schema({
    _id : String,
    email : String,
    username : String,
    birthday: Date,
    roles : [String],
    password : String,
    currentJob : mongoose.ObjectId,
    oldJobs : [Job],
    simulations : [{
        name : String,
        date : Date,
        Simulation
    }]
});

const User = mongoose.model('Users', userSchema);

module.exports = { User }
