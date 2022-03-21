const mongodb = require('./mongodb.js');

async function sandbox () 
{
//await mongodb.removeProducts({});
let result = await mongodb.insert();

console.log('💽  Find Montlimart products only');

const Montlimart = await mongodb.find({'brand': 'Montlimart'},(sort = {}));

console.log(`👕 ${Montlimart.length} total of products found for Montlimart`);
console.log(Montlimart);

console.log('💽  Find products less than 100');

const less20 = await mongodb.find({'price' : {$lt:100}},(sort = {}));

console.log(`👕 ${less20.length} total of products less than 100 found`);
console.log(less20);

console.log('💽  products sort by price');

const sorted_products =await mongodb.find({},(sort = { price: 1 })); //await mongodb.aggregate({'price' : {$lt:100}});

console.log(`👕 ${sorted_products.length} total of products sorted by price`);
console.log(sorted_products);

mongodb.close();
}
sandbox();