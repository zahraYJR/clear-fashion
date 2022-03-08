/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const montlimart = require('./sources/Montlimart');
const adresseParis = require('./sources/adresseParis');
const fs = require('fs');
const shop1='https://www.dedicatedbrand.com/en/men/all-men';
const shop2='https://www.montlimart.com/toute-la-collection.html';
const shop3='https://adresse.paris/630-toute-la-collection';

async function sandbox (eshop,web) {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await web.scrape(eshop);
    for(let i=0;i<products.length;i++){
      if(isNaN(products[i].price)){
        products.splice(i,1);
      }
      else{
        if(i!=products.length-1){
          for(let j=i+1;j<products.length;j++){
            if(products[i].name==products[j].name){
              products.splice(j,1);
            }
          }
        }
      }
      if(eshop.toString().includes("dedicatedbrand")){
        products[i].brand="dedicatedbrand";
      }else{
        if(eshop.toString().includes("montlimart")){
          products[i].brand="montlimart";
        }else{
          products[i].brand="adresseParis";
        }
      }
    }
    fs.writeFileSync('./sources/test.json', JSON.stringify(products,null,'\t'),'utf8',0o666,'as');
    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

const [,,eshop] = process.argv;

sandbox(shop1,dedicatedbrand);
