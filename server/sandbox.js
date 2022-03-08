/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const montlimartbrand = require('./sources/montlimartbrand');
const adresseParisbrand = require('./sources/adresseParisbrand');
var fs = require('fs');

async function sandbox (eshop = 'https://www.dedicatedbrand.com/en/men/news') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);
    let brand_name="Montlimart";
    let products = await montlimartbrand.scrape(eshop);
    if(eshop.includes("dedicatedbrand")){
      products = await dedicatedbrand.scrape(eshop);
      brand_name="Dedicated";
    }
    if(eshop.includes("adresse")){
      products = await adresseParisbrand.scrape(eshop);
      brand_name="Adresse";
    }
    

    console.log('done');

    const brands = {};
    count = 0;
  
    products.forEach(product => {
      count=count+1;
      const brand = {product: {id:count}};
      brands[brand_name+' '+brand.product.id] = {
      name: product.name,
      price: product.price,
      };
    })

    fs.writeFileSync('./sources/file.json', JSON.stringify(brands), { flag: "a+" });

    process.exit(0);
    
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;


sandbox(eshop);