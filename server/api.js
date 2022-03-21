const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const MongoClient = require("mongodb").MongoClient;

const PORT = 8092;
const CONNECTION_URL = 'mongodb+srv://Artemis:ABEG19232202@fashion-sample.ea124.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const DATABASE_NAME = "fashion-sample";
const app = express();
var database, collection;

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());
app.use(require('body-parser').urlencoded({ extended: true }));

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
});

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);

/*
const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = "mongodb+srv://Artemis:ABEG19232202@fashion-sample.ea124.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const DATABASE_NAME = "fashion-sample";
const PORT = 8092;

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collection;*/

/*
app.listen(PORT, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("people");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});*/