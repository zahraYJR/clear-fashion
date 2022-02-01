// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

console.log('🚀 This is it.');

const MY_FAVORITE_BRANDS = [{
  'name': 'Hopaal',
  'url': 'https://hopaal.com/'
}, {
  'name': 'Loom',
  'url': 'https://www.loom.fr'
}, {
  'name': 'ADRESSE',
  'url': 'https://adresse.paris/'
}];

console.table(MY_FAVORITE_BRANDS);
console.log(MY_FAVORITE_BRANDS[0]);

/**
 * 🌱
 * Let's go with a very very simple first todo
 * Keep pushing
 * 🌱
 */

/*
************************************************ TEST ***************************************************
************************************************ TEST ***************************************************
*/

// 🎯 TODO: The cheapest t-shirt
// 0. I have 3 favorite brands stored in MY_FAVORITE_BRANDS variable
// 1. Create a new variable and assign it the link of the cheapest t-shirt
// I can find on these e-shops
// 2. Log the variable

var hopaal = 'https://hopaal.com/collections/t-shirts-homme/products/red-barn-t-shirt?variant=37505969750200';
var loom = 'https://www.loom.fr/products/le-t-shirt';
var address = 'https://adresse.paris/t-shirts-et-polos/4238-t-shirt-ranelagh-1300000262026.html';
console.log('Cheapest T-shirt Hopaal: '+hopaal);
console.log('Cheapest T-shirt Loom: '+loom);
console.log('Cheapest T-shirt Address: '+address);

/**
 * 👕
 * Easy 😁?
 * Now we manipulate the variable `marketplace`
 * `marketplace` is a list of products from several brands e-shops
 * The variable is loaded by the file data.js
 * 👕
 */

// 🎯 TODO: Number of products
// 1. Create a variable and assign it the number of products
// 2. Log the variable

var number_products = marketplace.length;
console.log('Number of products in the marketplace: '+number_products);

// 🎯 TODO: Brands name
// 1. Create a variable and assign it the list of brands name only
// 2. Log the variable
// 3. Log how many brands we have

var brand_list = [];
marketplace.forEach(element => brand_list.push(element.brand));
console.log(brand_list);
console.log('There are ' + brand_list.length + ' brands!');


// 🎯 TODO: Sort by price
// 1. Create a function to sort the marketplace products by price
// 2. Create a variable and assign it the list of products by price from lowest to highest
// 3. Log the variable

var sort_by_price = marketplace.sort((a, b) => a.price - b.price);
var product_list = [];
sort_by_price.forEach(element => product_list.push([element.name, element.price]));
console.log(product_list);

// 🎯 TODO: Sort by date
// 1. Create a function to sort the marketplace objects by products date
// 2. Create a variable and assign it the list of products by date from recent to old
// 3. Log the variable

var sort_by_date = marketplace.sort(function(a, b){
  var dateA = new Date(a.date), dateB = new Date(b.date);
  return dateB - dateA;
});
var product_list_date = [];
sort_by_date.forEach(element => product_list_date.push([element.name, element.date]));
console.log(product_list_date);

// 🎯 TODO: Filter a specific price range
// 1. Filter the list of products between 50€ and 100€
// 2. Log the list

function sort_50_100(arr){
  var list = [];
  for (let i = 0; i < arr.length; i++) 
  {
    if(arr[i].price<100 && arr[i].price>50) { list.push(arr[i]); }
  }
  return list;
}
console.log(sort_50_100(marketplace))

// 🎯 TODO: Average price
// 1. Determine the average price of the marketplace
// 2. Log the average

var price = [];
marketplace.forEach(element => price.push(element.price));
var sum = price.reduce((a, b) => a + b, 0);
var avg = (sum / price.length) || 0;
var avg_rounded = Math.round((avg + Number.EPSILON) * 100) / 100

console.log(`The sum is: ${sum}. The average is: ${avg_rounded}€.`);


/**
 * 🏎
 * We are almost done with the `marketplace` variable
 * Keep pushing
 * 🏎
 */

// 🎯 TODO: Products by brands
// 1. Create an object called `brands` to manipulate products by brand name
// The key is the brand name
// The value is the array of products
//
// Example:
// const brands = {
//   'brand-name-1': [{...}, {...}, ..., {...}],
//   'brand-name-2': [{...}, {...}, ..., {...}],
//   ....
//   'brand-name-n': [{...}, {...}, ..., {...}],
// };
//
// 2. Log the variable
// 3. Log the number of products by brands

function products_by_brand(arr)
{
  var brands={};
  // Loop to create a list for each brand.
  for (let step = 0; step < arr.length; step++) 
  {
    brands[arr[step].brand]=new Array();
  }
  // Loop to push the corresponding product to the brand.
  for (let step = 0; step < arr.length; step++) 
  {
    brands[arr[step].brand].push(arr[step]);
  }
  return brands;
}

console.log(products_by_brand(marketplace))


/**
 * 💶
 * Let's talk about money now
 * Do some Maths
 * 💶
 */

// 🎯 TODO: Compute the p90 price value
// 1. Compute the p90 price value of each brand
// The p90 value (90th percentile) is the lower value expected to be exceeded in 90% of the products

function sort_by_price_asc(array_to_sort){
  var sort_by_price = array_to_sort.sort((a, b) => a.price - b.price);
  var product_list = [];
  sort_by_price.forEach(element => product_list.push(element.price));
  return product_list;
}

function p90_value(arr){
  for(var brand of Object.keys(arr)){
    var product_brand_by_price = sort_by_price_asc(arr[brand]);
    var index = Math.round(product_brand_by_price.length*0.9);
    console.log(brand +' 90 Percentile value - '+ product_brand_by_price[index] +'€');
  }
}

p90_value(products_by_brand(marketplace))

/**
 * 🧥
 * Cool for your effort.
 * It's almost done
 * Now we manipulate the variable `COTELE_PARIS`
 * `COTELE_PARIS` is a list of products from https://coteleparis.com/collections/tous-les-produits-cotele
 * 🧥
 */

const COTELE_PARIS = [
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-gris',
    price: 45,
    name: 'BASEBALL CAP - TAUPE',
    uuid: 'af07d5a4-778d-56ad-b3f5-7001bf7f2b7d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-navy',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - NAVY',
    uuid: 'd62e3055-1eb2-5c09-b865-9d0438bcf075',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-fuchsia',
    price: 110,
    name: 'VESTE - FUCHSIA',
    uuid: 'da3858a2-95e3-53da-b92c-7f3d535a753d',
    released: '2020-11-17'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-camel',
    price: 45,
    name: 'BASEBALL CAP - CAMEL',
    uuid: 'b56c6d88-749a-5b4c-b571-e5b5c6483131',
    released: '2020-10-19'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-beige',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BEIGE',
    uuid: 'f64727eb-215e-5229-b3f9-063b5354700d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-rouge-vermeil',
    price: 110,
    name: 'VESTE - ROUGE VERMEIL',
    uuid: '4370637a-9e34-5d0f-9631-04d54a838a6e',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-bordeaux',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BORDEAUX',
    uuid: '93d80d82-3fc3-55dd-a7ef-09a32053e36c',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/le-bob-dylan-gris',
    price: 45,
    name: 'BOB DYLAN - TAUPE',
    uuid: 'f48810f1-a822-5ee3-b41a-be15e9a97e3f',
    released: '2020-12-21'
  }
]

// 🎯 TODO: New released products
// // 1. Log if we have new products only (true or false)
// // A new product is a product `released` less than 2 weeks.

function addDaysToDate(date, days){
  var res = new Date(date);
  res.setDate(res.getDate() + days);
  return res;
}

var newItem=false;
for(const item of COTELE_PARIS){
  var date = new Date(item.released);
  date=addDaysToDate(date,14);
  //console.log(date);
  //console.log(addDaysToDate(date,15));
  if(date>new Date()){
    newItem=true;
  }
}
console.log("A new product has been registered: " + newItem);

// 🎯 TODO: Reasonable price
// // 1. Log if coteleparis is a reasonable price shop (true or false)
// // A reasonable price if all the products are less than 100€

var reasonableprice=true;
for(const item of COTELE_PARIS){
  if(parseInt(item.price,10)>100){
    reasonableprice=false;
  }
}
console.log("All prices are reasonnable (less than 100e): " + reasonableprice);

// 🎯 TODO: Find a specific product
// 1. Find the product with the uuid b56c6d88-749a-5b4c-b571-e5b5c6483131
// 2. Log the product

let i;
for (i = 0; i < COTELE_PARIS.length ; i++) {
  if (COTELE_PARIS[i].uuid == 'b56c6d88-749a-5b4c-b571-e5b5c6483131') {
    console.log('the product with the right uuid is : ' + COTELE_PARIS[i].name + ' - ' + COTELE_PARIS[i].link)
  }
}

// 🎯 TODO: Delete a specific product
// 1. Delete the product with the uuid b56c6d88-749a-5b4c-b571-e5b5c6483131
// 2. Log the new list of product

console.log("New List of Product")
for (i = 0; i < COTELE_PARIS.length ; i++) {
  if (COTELE_PARIS[i].uuid == 'b56c6d88-749a-5b4c-b571-e5b5c6483131') {
    COTELE_PARIS.splice(i, 1); // 2nd parameter means remove one item only
  }
  console.log('Kept element : ' + COTELE_PARIS[i].name + ' - ' + COTELE_PARIS[i].link)
}

// 🎯 TODO: Save the favorite product
let blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};
// we make a copy of blueJacket to jacket
// and set a new property favorite to true
var jacket = blueJacket;
jacket.favorite = true;


// 1. Log blueJacket and jacket variables
console.log(blueJacket);
console.log(jacket);

// Both variables were the same object so we created a real independant copy
// 2. What do you notice?

blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// 3. Update jacket property with favorite to true WITHOUT changing blueJacket properties
var jacket = JSON.parse(JSON.stringify(blueJacket));
jacket.favorite = true;
console.log("Blue jacket");
console.log(blueJacket);
console.log("Jacket");
console.log(jacket);


/**
 * 🎬
 * The End
 * 🎬
 */

// 🎯 TODO: Save in localStorage
// 1. Save MY_FAVORITE_BRANDS in the localStorage
// 2. log the localStorage

for (let j = 0; j < MY_FAVORITE_BRANDS.length ; j++) {
  let obj = JSON.stringify(MY_FAVORITE_BRANDS[j]);
  localStorage.setItem("obj"+j,obj);
}
console.log("Local Storage:");
console.log(localStorage);