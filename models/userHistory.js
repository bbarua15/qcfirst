// adapted from [5/3/2021]: https://mongoosejs.com/docs/schematypes.html

const mongoose = require('mongoose');

// create schema
const { Schema } = mongoose;

// schema for new Classes
const CLASS  = new Schema({
    courseNumber: {type: String},
    semester: {type: String,},
    courseName: {type: String},
    department: {type: String},
    instructor: {type: String},
    rosterStudent: {type: [String]},
    description: {type: String},
    schedule: {type: String},
    capacity: {type: Number},
    startDate: {type: Date, default: Date.now}
});

// schema for new Users
const HISTORY = new Schema({
    history: {type: String},
    userEmail: {type: String},
    results: [CLASS],
    date: {type: Date, default: Date.now}
});

// create model
let userHistory = mongoose.model("userHistory", HISTORY);

module.exports = userHistory;