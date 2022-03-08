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

let cheapest_t_shirt = 'https://adresse.paris/t-shirts-et-polos/4238-t-shirt-ranelagh-1300000262026.html';

// 2. Log the variable
console.log(cheapest_t_shirt)

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
let number_products = marketplace.length

// 2. Log the variable
console.log("There are ", number_products, " products in the marketplace.")

console.log('Number of products:', NumberOfProducts)

// 🎯 TODO: Brands name
// 1. Create a variable and assign it the list of brands name only
let brands_name = []
marketplace.forEach(value => {brands_name.push(value.brand)});

//Several brands have duplicates, we remove them
const brands_name_unique = new Set(brands_name);

// 2. Log the variable
console.log(brands_name_unique)

// 3. Log how many brands we have
console.log(brands_name_unique.size)


console.log(BrandsName.size)

// 🎯 TODO: Sort by price
// 1. Create a function to sort the marketplace products by price
var sort;
function sort_by_price(marketplace) 
{
	sort = marketplace.sort((value1,value2) => (value1.price > value2.price) ? 1 : -1);
	return sort;
}

// 2. Create a variable and assign it the list of products by price from lowest to highest
var marketplace_sorted_by_price = sort_by_price(marketplace);

// 3. Log the variable
console.table(marketplace_sorted_by_price)

console.log(MarketplaceSortedByPrice);

// 🎯 TODO: Sort by date
// 1. Create a function to sort the marketplace objects by products date
function sort_by_date(marketplace) 
{
	sort = marketplace.sort((value1,value2) => (Date.parse(value1.date) > Date.parse(value2.date)) ? 1 : -1);
	return sort;
}

// 2. Create a variable and assign it the list of products by date from recent to old
const marketplace_sorted_by_date = sort_by_date(marketplace);

// 3. Log the variable
console.table(marketplace_sorted_by_date);

console.log(MarketplaceSortedByDate);

// 🎯 TODO: Filter a specific price range
// 1. Filter the list of products between 50€ and 100€
var list_price = []; 
marketplace_sorted_by_price.forEach(value => {list_price.push(value.price)});
var temp;

for(var a = 0; a < list_price.length; a++)
{
    for(var b = a + 1; b < list_price.length; b++)
    {
      if(list_price[a] > list_price[b])
      {
          temp = list_price[a];
          list_price[a] = list_price[b];
          list_price[b] = temp;
      }
    }
}

marketplace_sorted_by_price = sort_by_price(marketplace);

var index50 = (list_price.indexOf(50));
var index100 = (list_price.indexOf(100));

var marketplace_sorted_by_price_50_100;

marketplace_sorted_by_price_50_100 = marketplace_sorted_by_price.slice(index50,index100+1);

// 2. Log the list
console.table(marketplace_sorted_by_price_50_100);

console.log(FilteredMarketplace);


// 🎯 TODO: Average Basket
// 1. Determine the average basket of the marketplace
let sum = 0; 
list_price.forEach(value => {sum += value});
var average_basket = sum / marketplace.length;

// 2. Log the average
console.log("Average basket price :", average_basket, "€")

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

const brands = {};
brands_name.forEach(value => {brands[value] = []});
marketplace.forEach(value => {brands[value.brand].push(value)});

// 2. Log the variable
console.log(brands);

// 3. Log the number of products by brands

Object.keys(brands).forEach(key => { 
  console.log(key+' : '+brands[key].length)
})


// 🎯 TODO: Sort by price for each brand
// 1. For each brand, sort the products by price, from highest to lowest
brands_name.forEach(value => {brands[value] = sort_by_price(brands[value])});

// 2. Log the sort
for (const key of Object.keys(brands)) 
{
  console.table(brands[key])
}

console.log(brands)

// 🎯 TODO: Sort by date for each brand
// 1. For each brand, sort the products by date, from old to recent
brands_name.forEach(value => {brands[value] = sort_by_date(brands[value])});

// 2. Log the sort
for (const key of Object.keys(brands)) 
{
  console.table(brands[key])
}

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
brands_name.forEach(value => {let numberOfValue = Math.round(brands[value].length*0.1);
  let p90 = brands[value][numberOfValue].price; 
  console.log(value + " : " + p90);
});

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
let test_price = true;
COTELE_PARIS.forEach(value => {if(value.price > 100){test_price = false}});
console.log("Coteleparis is a reasonable shop :", test_price);


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
let specific_product = "";
COTELE_PARIS.forEach(value => {if(value.uuid == `b56c6d88-749a-5b4c-b571-e5b5c6483131`) {specific_product = value}});

// 2. Log the product
console.log(specific_product)


console.log(product)

// 🎯 TODO: Delete a specific product
// 1. Delete the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
for(let i = 0; i < COTELE_PARIS.length; i++){
  if(COTELE_PARIS[i].uuid == `b56c6d88-749a-5b4c-b571-e5b5c6483131`) {COTELE_PARIS.splice(i,1)}
}

// 2. Log the new list of product
console.log(COTELE_PARIS);



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
console.log(blueJacket);
console.log(jacket);

// 2. What do you notice?
// Both variables have a new attribute 'favorite : true'

/*We can see that setting the property 'favorite' to true on the jacket
also adds it to the bluejacket*/

blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// 3. Update `jacket` property with `favorite` to true WITHOUT changing blueJacket properties
blueJacket.favorite = false;

jacket = JSON.parse(JSON.stringify(blueJacket));
jacket.favorite=true;

console.log(blueJacket);
console.log(jacket);



/**
 * 🎬
 * The End
 * 🎬
 */

// 🎯 TODO: Save in localStorage
// 1. Save MY_FAVORITE_BRANDS in the localStorage
window.localStorage.setItem('MY_FAVORITE_BRANDS_SAVE', JSON.stringify(MY_FAVORITE_BRANDS));

// 2. log the localStorage
console.log(localStorage)
