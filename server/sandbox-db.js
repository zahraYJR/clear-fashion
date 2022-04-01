/* eslint-disable no-console, no-process-exit */
const db = require('./db');
const fs = require('fs');

async function sandbox () {
  try {
    //Has to be done once to fill the mongo db 
    const raw = fs.readFileSync('all_products.json');
    const products = JSON.parse(raw);

    console.log(`💽 products insertion will follow :`);
    
    const result = await db.insert(products);

    console.log(`💽  ${result.insertedCount} inserted products`);

    console.log('\n');

    console.log('💽  Find montlimart products only');

    const montlimartOnly = await db.find({'brand': 'montlimart'});

    console.log(`👕 ${montlimartOnly.length} total of products found for montlimart`);
    console.log(montlimartOnly);

    console.log('\n');
    console.log('💽  Find products less than 50€');

    const price = await db.find({'price': {$lt:50}});

    console.log(`👕 ${price.length} total of products less than 50€`);
    console.log(price);

    console.log('\n');
    console.log('💽  Find products sorted by price');

    let priceOrdered = [];
    try {
      const collection = await db.collection();
      priceOrdered = await collection.find({}).sort({'price':1}).toArray();
    } catch (error) {
      console.error('🚨 find sort in sandbox db', error);
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