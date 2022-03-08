/* eslint-disable no-console, no-process-exit */
require('dotenv').config();
const {MongoClient} = require('mongodb');
const db = require('./db');
const fs = require('fs');

async function sandbox () {
  try {
    //const rawdata = fs.readFileSync('all_products.json');
    //const products = JSON.parse(rawdata);
    
    //const result = await db.insert(products);

    //console.log(`💽  ${result.insertedCount} inserted products`);

    console.log('\n');

    console.log('💽  Find dedicated products only');

    const dedicatedOnly = await db.find({'brand': 'dedicated'});

    console.log(`👕 ${dedicatedOnly.length} total of products found for dedicated`);
    //console.log(dedicatedOnly);

    console.log('💽  Find products less than 50€');

    const price = await db.find({'price': {$lt:50}});

    console.log(`👕 ${price.length} total of products less than 50€`);
    //console.log(price);

    console.log('💽  Find products sorted by price');

    let priceOrdered = [];
    try {
      const collection = await db.collection();
      priceOrdered = await collection.find({}).sort({'price':1}).toArray();
    } catch (error) {
      console.error('🚨 collection.find...', error);
      return null;
    }

    console.log(`👕 ${priceOrdered.length} total of products`);
    console.log(priceOrdered);

    db.close();
  } catch (e) {
    console.error(e);
  }
}

sandbox();