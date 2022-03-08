const fs = require("fs")

const dedicated_products = require('./dedicated.json');
const adresse_paris1_products = require('./adresseparis1.json');
const adresse_paris2_products = require('./adresseparis2.json');
const montlimart_products = require('./montlimart.json');

for(product of dedicated_products)
{
    product["brand"] = "dedicatedbrand"
}

for(product of adresse_paris1_products) 
{
    product["brand"] = "adresseparis"
}
for(product of adresse_paris2_products) 
{
    product["brand"] = "adresseparis"
}

for(product of montlimart_products) 
{
    product["brand"] = "montlimart"
}

var all_products = dedicated_products.concat(adresse_paris1_products, adresse_paris2_products, montlimart_products)
CreateJSONFile(all_products, "./all_products.json")


// Function to store a list into a JSON file 
function CreateJSONFile(products, path) 
{
  products = JSON.stringify(products);
  fs.writeFile(path, products, (err) => {
      if (err) 
      {
        console.error(err);
      } 
      
      else 
      {
        console.log('JSON file successfully written.');
      }
  });
}