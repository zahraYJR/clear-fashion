/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const montlimart = require('./sources/montlimart');
const adresse = require('./sources/adresse');
const fs = require('fs');

let all_products = [];

const dedicatedbrand_url = 'https://www.dedicatedbrand.com/en/men/all-men';
const montlimart_url = 'https://www.montlimart.com/toute-la-collection.html';
const adresse_url = 'https://adresse.paris/630-toute-la-collection';
all_url = [dedicatedbrand_url, montlimart_url, adresse_url];

let all_packages = {};
all_packages[dedicatedbrand_url] = dedicatedbrand;
all_packages[montlimart_url] = montlimart;
all_packages[adresse_url] = adresse;

async function sandbox () {
  try {
    for (const url of all_url)
    {
      let page = 1;
      let products = [];
      const actual_all_products_length = all_products.length;
      let done = false;

      do
      {
        console.log(`🕵️‍♀️  browsing ${url+`?p=${page}`} source`);
        products = await all_packages[url].scrape(url+`?p=${page}`);
        if (products == null)
        {
          console.log('error');
        }
        else
        {
          console.log('done');
          if ((products.length != 0) && 
          ((all_products.length == 0) || 
          ((products[products.length-1].name != all_products[all_products.length-1].name) && 
          (all_products.length <= actual_all_products_length+1 || products[1].name != all_products[actual_all_products_length+1].name)))) 
            products.forEach(product => all_products.push(product));
          else done = true;
          page++;
        }
      }
      while (!done);
    }

    for (let i = 0; i<all_products.length; i++)
    {
      if (all_products[i].name == undefined || all_products[i].name == '')
      {
        all_products.splice(i, 1);
        i--;
      }
    }
    
    const jsonStr = JSON.stringify(all_products, null, 2);

    fs.writeFileSync('all_products.json', jsonStr);
    console.log("All done, check all_products.json")
    
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

sandbox();