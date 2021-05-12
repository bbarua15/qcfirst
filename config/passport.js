const LocalStrategy = require('passport-local').Strategy;
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

// load user model
const userCreate = require("../models/userCreate");

module.exports = function(passport) {
    passport.use (
        new LocalStrategy({ usernameField: "username"}, (username, password, done) => {
            // match user
            userCreate.findOne({userName: username
            }).then(user => {
                if(!user) {
                    return done(null, false, {message: "That email is not registered"});
                }
                // match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) throw err;
                    if(isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, {message: "Password incorrect"});
                    }
                });
            });
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        userCreate.findById(id, (err, user) => {
            done(err, user);
        });
    });

}