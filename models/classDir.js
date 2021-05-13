const mongoose = require('mongoose');

const { Schema } = mongoose;

// schema for all classes
const COURDIR  = new Schema({
    courseID: {type: Number},
    semester: {type: String},
    courseNumber: {type: Number},
    department: {type: String},
    instructor: {type: String},
    classDescription: {type: String},
    schedule: {type: Date},
    enrollDeadline: {type: Date}
});

let classDir = mongoose.model("classDir", COURDIR);

module.exports = classDir;