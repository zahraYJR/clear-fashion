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

// 🎯 TODO: The cheapest t-shirt
// 0. I have 3 favorite brands stored in MY_FAVORITE_BRANDS variable
// 1. Create a new variable and assign it the link of the cheapest t-shirt
// I can find on these e-shops

const cheap_tshirt = "https://www.loom.fr/products/le-t-shirt";

// 2. Log the variable

console.log(cheap_tshirt);

/**
 * 👕
 * Easy 😁?
 * Now we manipulate the variable `marketplace`
 * `marketplace` is a list of products from several brands e-shops
 * The variable is loaded by the file data.js
 * 👕
 */

 const marketplace = require('./data');

// 🎯 TODO: Number of products
// 1. Create a variable and assign it the number of products

var NumberOfProducts = marketplace.length;

// 2. Log the variable

console.log('Number of products:', NumberOfProducts)

// 🎯 TODO: Brands name
// 1. Create a variable and assign it the list of brands name only

var BrandsName = []

marketplace.forEach(element => {BrandsName.push(element.brand)});
BrandsName = new Set(BrandsName); //We eliminate the duplicates

// 2. Log the variable

console.log(BrandsName)

// 3. Log how many brands we have

console.log(BrandsName.size)

// 🎯 TODO: Sort by price
// 1. Create a function to sort the marketplace products by price
 
function SortByPrice(marketplace) 
{
	return marketplace.sort((element1,element2) => (element1.price > element2.price) ? 1 : -1);
}

// 2. Create a variable and assign it the list of products by price from lowest to highest

var MarketplaceSortedByPrice = SortByPrice(marketplace);

// 3. Log the variable

console.log(MarketplaceSortedByPrice);

// 🎯 TODO: Sort by date
// 1. Create a function to sort the marketplace objects by products date

function SortByDate(marketplace) 
{
	return marketplace.sort((element1,element2) => (Date.parse(element1.date) > Date.parse(element2.date)) ? 1 : -1);
}

// 2. Create a variable and assign it the list of products by date from recent to old

var MarketplaceSortedByDate = SortByDate(marketplace);

// 3. Log the variable

console.log(MarketplaceSortedByDate);

// 🎯 TODO: Filter a specific price range
// 1. Filter the list of products between 50€ and 100€

var FilteredMarketplace = []
marketplace.forEach(element => {if (element.price > 50 &  element.price < 100){FilteredMarketplace.push(element) }} );

// 2. Log the list

console.log(FilteredMarketplace);

// 🎯 TODO: Average price
// 1. Determine the average price of the marketplace

var Sum = 0;
marketplace.forEach(element => {Sum = Sum + element.price} );
var AveragePrice = Sum / marketplace.length;

// 2. Log the average

console.log('Average price of the marketplace : ',AveragePrice,'euros.');

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

const brands = {}
BrandsName.forEach(element => {brands[element] = []});
marketplace.forEach(element => {brands[element.brand].push(element)});

//
// 2. Log the variable

console.log(brands);

// 3. Log the number of products by brands

Object.keys(brands).forEach(key => { 
  console.log(key+' : '+brands[key].length)
})

// 🎯 TODO: Sort by price for each brand
// 1. For each brand, sort the products by price, from highest to lowest

Object.keys(brands).forEach(key => { 
    SortByPrice(brands[key])
})

// 2. Log the sort

console.log(brands)

// 🎯 TODO: Sort by date for each brand
// 1. For each brand, sort the products by date, from old to recent

Object.keys(brands).forEach(key => { 
  SortByDate(brands[key])
})

// 2. Log the sort

console.log(brands)

/**
 * 💶
 * Let's talk about money now
 * Do some Maths
 * 💶
 */

// 🎯 TODO: Compute the p90 price value
// 1. Compute the p90 price value of each brand
// The p90 value (90th percentile) is the lower value expected to be exceeded in 90% of the products

function math(key)
{
  return brands[key][Math.round(brands[key].length*0.1)].price
}

Object.keys(brands).forEach(key => { 
  console.log(key +' (p90) : '+ math(key)+' euros')
})

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



// 🎯 TODO: Reasonable price
// // 1. Log if coteleparis is a reasonable price shop (true or false)
// // A reasonable price if all the products are less than 100€

var reasonableprice = true;
let n = 0;
while(n<COTELE_PARIS.length && reasonableprice === true)
{
  if (COTELE_PARIS[n].price > 100)
  {
    reasonableprice = false;
  } 
  n = n + 1
}
console.log('coteleparis has reasonable priceshop : ',reasonableprice)


// 🎯 TODO: Find a specific product
// 1. Find the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`

var product;
COTELE_PARIS.forEach(element => 
  {if (element.uuid === 'b56c6d88-749a-5b4c-b571-e5b5c6483131') {product = element}})

// 2. Log the product

console.log(product)

// 🎯 TODO: Delete a specific product
// 1. Delete the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`

for(var i = 0; i < COTELE_PARIS.length;i++)
{
  if (COTELE_PARIS[i].uuid === 'b56c6d88-749a-5b4c-b571-e5b5c6483131') { COTELE_PARIS.splice(i,1)}
}

// 2. Log the new list of product

console.log(COTELE_PARIS)

// 🎯 TODO: Save the favorite product
let blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// we make a copy of blueJacket to jacket
// and set a new property `favorite` to true

let jacket = blueJacket;
jacket.favorite = true;

// 1. Log `blueJacket` and `jacket` variables

console.log('\nbluejacket : ',blueJacket);
console.log('\njacket : ',jacket);

// 2. What do you notice?

/*We can see that setting the property 'favorite' to true on the jacket
also adds it to the bluejacket*/

blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// 3. Update `jacket` property with `favorite` to true WITHOUT changing blueJacket properties

jacket = JSON.parse(JSON.stringify(blueJacket))
jacket.favorite = true;

console.log('\nbluejacket : ',blueJacket);
console.log('\njacketfavorite : ',jacket);

/**
 * 🎬
 * The End
 * 🎬
 */

// 🎯 TODO: Save in localStorage
// 1. Save MY_FAVORITE_BRANDS in the localStorage
// 2. log the localStorage

//localStorage.setItem("MY_FAVORITE_BRANDS",JSON.stringify(MY_FAVORITE_BRANDS));
//log(localStorage.getItem('MY_FAVORITE_BRANDS'));

