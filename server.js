/**
 * Created by mishal23 on 16/7/17.
 */

var express = require('express');
var app = express();
var mongojs = require('mongojs');


var bodyParser = require('body-parser');

var mongooseClient = require('./bin/mongoose_client');
mongooseClient.connectDB(function () {
    console.log("Connection to DB successful");
},function (err) {
    console.log("Error connecting");
    console.log(err);
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/contactlist',function (req,res) {
    console.log('Received GET request')
    
    db.contactlist.find(function (err,docs) {
        console.log(docs);
        res.json(docs);
    });
});


app.put('/contactlist/:id',function (req,res) {
    console.log("Entered POST request");
    var id = req.params.id;
    console.log(id);
    console.log("Name: " + req.params.name);
    console.log("b1time: " + req.params.b1time);
    console.log("b1score: " + req.params.b1score);
    console.log("b2time: " + req.params.b2time);
    console.log("b2score: " + req.params.b2score);
    console.log("b3time: " + req.params.b3score);
    console.log("b3score: " + req.params.b3score);
    console.log("time: " + req.params.time);
    console.log("score: " + req.params.score);

    db.contactlist.findAndModify({
        query:{'_id': mongodb.ObjectId(id)},
        update: {$set: {name: req.body.name, b1time: req.body.b1time, b1score: req.body.b1score, b2time: req.body.b2time, b2score: req.body.b2score, b3time: req.body.b3time, b3score: req.body.b3score, time: req.body.time, score: req.body.score}},
        new: true},
        function (err,doc) {
        if(err)
        {
            console.log("Some error occured");
        }
        else {
            console.log("Updated to " + doc);
            res.json(doc);
        }
    });

});

app.post('/contactlist',function (req,res) {
    console.log(req.body);
    
    db..insert(req.body,function (err,doc) {
        res.json(doc);
    });
});



app.delete('/contactlist/:id',function (req,res) {
    var id = req.params.id;
    console.log(id);
    
    db.contactlist.remove({'_id' : mongodb.ObjectId(id)},function (err,doc) {
        res.json(doc);
    });
});

app.get('/contactlist/:id',function (req,res) {
    var id = req.params.id;
    console.log(id);
    
    db.contactlist.findOne({'_id' : mongodb.ObjectId(id)},function (err,doc) {
        console.log(doc);
        res.json(doc);
    });
});


app.listen(3000);
console.log("Running at http://localhost:3000/");