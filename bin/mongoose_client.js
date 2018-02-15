var mongoose = require("mongoose");

var connectDB = function (callback, fallback) {
    mongoose.connect("mongodb://localhost:27017/scoreboard");

    var db = mongoose.connection;
    db.on('error',function (error) {
        fallback(error);
    });
    db.once('open',function (obj) {
        console.log("Connection to database successful");
        callback(obj);
    });
};

exports.connectDB = connectDB;