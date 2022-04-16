const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const db = require('./db');
const { ObjectId } = require('mongodb');

const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
});

// All products
app.get('/products', async(request, response) => {
  products = await db.findAllProducts(true)
  console.log("number of products: ",products.length)
  response.send({"products" : products});
});

// all products from a specific brand

//montlimar
app.get('/products/montlimar', async(request, response) => {
  products = await db.find({'brand': 'montlimart'}, false)
  console.log("number of products: ", products.length)
  response.send({"products" : products});
});

//dedicated
app.get('/products/dedicated', async(request, response) => {
  products = await db.find({'brand': 'dedicated'}, false)
  console.log("number of products: ", products.length)
  response.send({"products" : products});
});

//loom
app.get('/products/loom', async(request, response) => {
  products = await db.find({'brand': 'loom'}, false)
  console.log("number of products: ", products.length)
  response.send({"products" : products});
});



// All products with request of limit,brand,price
app.get('/products/search', async (request, response) => {
  try {
    let brand = request.query.brand;
    let price = parseInt(request.query.price);
    let limit = parseInt(request.query.limit);
  
    let products = await db.findOneProduct(limit,brand,price);
    response.send({"products" : products});
  } catch (e) {
    response.status(404).send("Product doesn't exist, try an other one.")
  }
});

// Find a product with its id 
app.get("/products/:id", async (request, response) => {
  try {
    let resp = await db.findProductById(request);
    response.send(resp);
  } catch (e) {
    response.status(404).send("Product doesn't exist, try an other one.");
  }
});



app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);

