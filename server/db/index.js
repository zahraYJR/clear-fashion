require('dotenv').config();
const {MongoClient} = require('mongodb');
const fs = require('fs');

const MONGODB_DB_NAME = 'clearfashion';
const MONGODB_COLLECTION = 'products';
const MONGODB_URI = "mongodb+srv://admin:mongoDB2@clearfashion.biwwt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//const MONGODB_URI = process.env.MONGODB_URI;

let client = null;
let database = null;

/**
 * Get db connection
 * @type {MongoClient}
 */
const getDB = module.exports.getDB = async () => {
  try {
    if (database) {
      console.log('💽  Already Connected');
      return database;
    }

    client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    database = client.db(MONGODB_DB_NAME);

    console.log('💽  Connected');

    return database;
  } catch (error) {
    console.error('🚨 MongoClient.connect...', error);
    return null;
  }
};

/**
 * Insert list of products
 * @param  {Array}  products
 * @return {Object}
 */
module.exports.insert = async products => {
  try {
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    // More details
    // https://docs.mongodb.com/manual/reference/method/db.collection.insertMany/#insert-several-document-specifying-an-id-field
    const result = await collection.insertMany(products, {'ordered': false});

    return result;
  } catch (error) {
    console.error('🚨 collection.insertMany...', error);
    fs.writeFileSync('products.json', JSON.stringify(products));
    return {
      'insertedCount': error.result.nInserted
    };
  }
};

/**
 * Find products based on query
 * @param  {Array}  query
 * @return {Array}
 */
module.exports.find = async query => {
  try {
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    const result = await collection.find(query).toArray();

    return result;
  } catch (error) {
    console.error('🚨 collection.find...', error);
    return null;
  }
};

/**
 * Close the connection
 */
module.exports.close = async () => {
  try {
    await client.close();
  } catch (error) {
    console.error('🚨 MongoClient.close...', error);
  }
};


/**
 * Find all the products
 * @param {*} printResults 
 * @returns 
 */
module.exports.findAllProducts = async (printResults = false) => {
  const db = await getDB();
  const result = await db.collection(MONGODB_COLLECTION).find().toArray()
  if(printResults){
      console.log(' Get all products:', );
      console.log(` ${result.length} documents found:`);
      await result.forEach(doc => console.log(doc));
  }
  return result
}

/**
 * Get a product with its ID
 * @param {*} request 
 * @returns 
 */
module.exports.findProductById = async (request) => {
  const id = request.params.id;
  let products = db.find({ _id: id });
  if (products.length === 0) {
    throw new Error("Product doesn't exist.");
  }

  return products;
};

/**
 * Find one product with brand and price
 * @param {*} limit 
 * @param {*} brand 
 * @param {*} price 
 * @returns 
 */
module.exports.findOneProduct = async (limit, brand, price) => {
  try {
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    const result = await collection.find({'brand':brand,'price':{$lte:price}}).limit(limit).toArray();

    return result;

  } catch (error) {
    console.error('collection.find..', error);
    return null;
  }
}

