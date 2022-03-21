require('dotenv').config();
const {MongoClient} = require('mongodb');
const fs = require('fs');
var Dedicated_Products = require("./Dedicated_Products.json");
var Montlimart_Products = require("./Montlimart_Products.json")
var adresse_Products = require("./adresse_Products.json")

const MONGODB_DB_NAME = 'fashion-sample';
const MONGODB_COLLECTION = 'Liste_Products';
const MONGODB_URI = process.env.MONGODB_URI;

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


module.exports.removeProducts = async (query) => {
  try {
    const db = await getDB();
    await collection.deleteMany(query);
    console.log("Products Removed !");
  } catch (err) {
    console.error(err);
  }
};



/**
 * Insert list of products
 * @return {Object}
 */
module.exports.insert = async () => {
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    // More details
    // https://docs.mongodb.com/manual/reference/method/db.collection.insertMany/#insert-several-document-specifying-an-id-field
    let result = await collection.insertMany(Dedicated_Products);
    console.log("Products Dedicated insert successfully!");
    result = await collection.insertMany(Montlimart_Products);
    console.log("Products Montlimart insert successfully!");
    result = await collection.insertMany(adresse_Products);
    console.log("Products Adresse Paris insert successfully!");

    return result;
};

/**
 * Find products based on query
 * @param  {Array}  query
 * @return {Array}
 */
module.exports.find = async (
  query,
  sort = {}, limit = 141) =>{
  try {
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    const result = await collection.find(query).sort(sort).limit(limit).toArray();
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
