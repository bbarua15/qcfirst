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

// schema for new Users
const NEWUSER = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userName: {type: String, required: true},
    password: {type: String, required: true},
    userType: {type: String, required: true},
    creationDate: {type: Date, default: Date.now},
    classes: [CLASS]
});

// create model
let userCreate = mongoose.model("userCreate", NEWUSER);

module.exports = userCreate;
