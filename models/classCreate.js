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
});

//create model
let classCreate = mongoose.model("classCreate", CLASS);

module.exports = classCreate;