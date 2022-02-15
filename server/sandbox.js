/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
var fs = require('fs');

async function sandbox (eshop = 'https://www.dedicatedbrand.com/en/men/news') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await dedicatedbrand.scrape(eshop);

    console.log('done');
    
    //var jsonData = '{"eshop":[';
  //   var jsonObj = {
  //     table: []
  //  };
    const brands = {};
    count = 0;
    products.forEach(product => {
      count=count+1;
      //jsonData = jsonData + JSON.stringify(product) + ",";
      // jsonObj.table.push(product);
      const brand = {product: {id:count}};
      brands[brand.product.id] = {
      name: product.name,
      price: product.price,
      };
    })
    fs.writeFileSync('./sources/money.json', JSON.stringify(brands));
    // jsonData = jsonData.slice(0, -1) + ' ';
    // jsonData=jsonData+']}';
    // var jsonObj = JSON.parse(jsonData);
    // var myJSON = JSON.stringify(jsonObj);
    // console.log(myJSON)
    // fs.writeFile("./sources/thing.json",myJSON, 'utf8' ,function(err, result) {
    //   if(err) console.log('error', err);
    // });

    
    
    process.exit(0);
    
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;


sandbox(eshop);