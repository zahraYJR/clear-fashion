/* eslint-disable no-console, no-process-exit */

const fs = require("fs") //to store into a JSON file 


async function sandbox(eshop, brand) {
  try 
  {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await brand.scrape(eshop);

    console.log(products);
    console.log('done');
    return products;
    //process.exit(0);
  } 
  
  catch (e) 
  {
    console.error(e);
    //process.exit(1);
  }
}

function Scraping() {
  ScrapingDedicated();

  ScrapingAdresseParis();

  ScrapingMontlimart();
}


//Scraping Dedicated (with JSON API)
function ScrapingDedicated() {
  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  
  var req = new XMLHttpRequest();
  req.open('GET', 'https://www.dedicatedbrand.com/en/loadfilter', false);
  req.send(null);

  var json_file = JSON.parse(req.responseText)
  var json_file_dedicated = []
  for (document of json_file.products) 
  {
    if (document.uri != undefined) 
    {
      var product = {};
      product.name = document.name;
      product.price = parseInt(document.price.price);
      product.image = document.image[0];
      product.link = "https://www.dedicatedbrand.com/en/" + document.canonicalUri;
      json_file_dedicated.push(product)
    }
  }

  CreateJSONFile(json_file_dedicated, "./dedicated.json")
}



//Scraping Adresse Paris -> we store the products in two separated json files
function ScrapingAdresseParis() {
  const adresseparis = require('./sources/adresseparisbrand.js');
  
  var products_p1 = []
  let link1 = "https://adresse.paris/630-toute-la-collection"
  
  products1 = sandbox(link1, adresseparis).then(products1 => {
    for (var p of products1) 
    {
      products_p1.push(p)
    }
    
    CreateJSONFile(products_p1, "./adresseparisp1.json")
  })


  var products_p2 = []
  let link2 = "https://adresse.paris/630-toute-la-collection?p=2"
  products2 = sandbox(link2, adresseparis).then(products2 => {
    for (var p of products2) 
    {
      products_p2.push(p)
    }

    CreateJSONFile(products_p2, "./adresseparisp2.json")
  })
}



//Scraping Montlimart
function ScrapingMontlimart() {
  const montlimart = require('./sources/montlimartbrand');
  var all_products = []

  // We get into each page (8 pages) with a loop
  for (let i = 1; i <= 8; i++) 
  {
    let link = "https://www.montlimart.com/toute-la-collection.html" + "?p=" + i.toString()
    
    products = sandbox(link, montlimart).then(products => {
      for (var p of products) 
      {
        all_products.push(p)
      }

      CreateJSONFile(all_products, "./montlimart.json")
    })
  }
}



// Function to store the list into a JSON file 
function CreateJSONFile(products, path) {
  console.log("enter JSON function");
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



Scraping();