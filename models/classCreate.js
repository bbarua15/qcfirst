// adapted from [5/3/2021]: https://mongoosejs.com/docs/schematypes.html

const mongoose = require('mongoose');

// create schema
const { Schema } = mongoose;

// schema for new Classes
const CLASS  = new Schema({
    term: {type: String,},
    courseName: {type: String},
    courseNumber: {type: Number},
    classDate: {type: Date, default: Date.now},
    classDescription: {type: String},
    capacity: {type: Number}
    courseID: {type: Number},
    semester: {type: String},
    department: {type: String},
    instructor: {type: String},
    schedule: {type: Date},
    enrollDeadline: {type: Date}
});

//create model
let classCreate = mongoose.model("classCreate", CLASS);

module.exports = classCreate;