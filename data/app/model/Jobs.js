const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    idUser: mongoose.ObjectId,
    region: String,
    title: String,
    stack: [String],
    experience: Number,
    salary: Number,
    companyName: String,
    status: String
});

const Jobs = mongoose.model('Jobs', jobSchema);

module.exports = { Jobs, jobSchema }
