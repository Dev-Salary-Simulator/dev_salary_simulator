const mongoose = require('mongoose');

const { jobSchema : Job } = require('./Jobs');

const Simulation = new mongoose.Schema({
    region : String,
    title : String,
    stack : [String],
    experience : Number,
});

const userSchema = new mongoose.Schema({
    _id : String,
    email : String,
    username : String,
    roles : [String],
    password : String,
    currentJob : mongoose.ObjectId,
    oldJobs : [Job],
    simulations : [Simulation]
});

const User = mongoose.model('Users', userSchema);

module.exports = { User }
