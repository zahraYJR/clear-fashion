const cors = require('cors');
const express = require('express');
const res = require('express/lib/response');
const helmet = require('helmet');
const { Db, ObjectId } = require('mongodb');
const MongoClient = require("mongodb").MongoClient;
const mongodb = require("./mongodb");

const PORT = 8092;
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

app.get(`/Liste_Products/search`, async (request, response) => {
    let result = null;
    if (request.query.brand && request.query.limit && request.query.price)
    {
        let marque = request.query.brand;
        console.log(`brand:${marque}`);
        let limite = parseInt(request.query.limit);
        console.log(`limit:${limite}`);
        let prix = parseFloat(request.query.price);
        console.log(`price:${prix}`);
        const query_brand = { brand: marque, price: { $lte: prix }};
        result = await mongodb.find(query_brand, sort = {},limit = limite);
        //result = await mongodb.find(query_brand).skip((request.query.page-1)*limite).limit(limite);

    }
    else if(!request.query.limit && !request.query.price)
    {
        const query_brand = { brand: request.query.brand};
        result = await mongodb.find(query_brand, sort = {});
        
    }
    else if(!request.query.brand && !request.query.limit)
    {
        let prix = parseFloat(request.query.price);
        console.log(`price:${prix}`);
        const query_brand = { price: { $lte: prix }};
        result = await mongodb.find(query_brand, sort = {});
    }
    else if(!request.query.brand)
    {
        let prix = parseFloat(request.query.price);
        console.log(`price:${prix}`);
        let limite = parseInt(request.query.limit);
        console.log(`limit:${limite}`);
        const query_brand = { price: { $lte: prix }};
        result = await mongodb.find(query_brand, sort = {}, limit = limite);
    }
    else if(!request.query.limit)
    {
        let prix = parseFloat(request.query.price);
        console.log(`price:${prix}`);
        let marque = request.query.brand;
        console.log(`brand:${marque}`);
        const query_brand = { brand: marque, price: { $lte: prix }};
        result = await mongodb.find(query_brand, sort = {});
    }
    else if(!request.query.price)
    {
        let marque = request.query.brand;
        console.log(`brand:${marque}`);
        let limite = parseInt(request.query.limit);
        console.log(`limit:${limite}`);
        const query_brand = { brand: marque};
        result = await mongodb.find(query_brand, sort = {}, limit=limite);
    }

    response.send(result);

});



app.get('/Liste_Products/:id', async (request,response)=> {
    result_id = request.params.id;
    console.log(result_id);
    let variable = ObjectId(result_id);
    console.log(variable);
    result = await mongodb.find({_id:variable},sort = {});
    console.log(result);
    response.send(result);
});