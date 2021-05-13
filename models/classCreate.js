// adapted from [5/3/2021]: https://mongoosejs.com/docs/schematypes.html

const mongoose = require('mongoose');

// create schema
const { Schema } = mongoose;

// schema for new Classes
const CLASS  = new Schema({
    courseNumber: {type: Number},
<<<<<<< HEAD
    semester: {type: String,},
    courseName: {type: String},
    department: {type: String},
    instructor: {type: String},
    rosterStudent: {type: [String]},
    description: {type: String},
    schedule: {type: String},
    capacity: {type: Number},
    startDate: {type: Date, default: Date.now}
=======
    classDate: {type: Date, default: Date.now},
    classDescription: {type: String},
    capacity: {type: Number}
    courseID: {type: Number},
    semester: {type: String},
    department: {type: String},
    instructor: {type: String},
    schedule: {type: Date},
    enrollDeadline: {type: Date}
>>>>>>> ee1dd75ab2eeaddb13d774af67d22544b218cfd1
});

//create model
let classCreate = mongoose.model("classCreate", CLASS);

module.exports = classCreate;