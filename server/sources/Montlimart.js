const fetch = require('node-fetch');
const cheerio = require('cheerio');
const {'v5': uuidv5} = require('uuid');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);
  return $('.category-products .item')
    .map((i, element) => {
      const link = `https://www.montlimart.com${$(element)
      .find('.product-info .product-name')
      .attr('href')}`;
      const brand = 'Montlimart';
      const name = $(element)
        .find('h2.product-name a')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      const price = parseInt(
        $(element)
          .find('span.price')
          .text()
      );
      const _id = uuidv5(link, uuidv5.URL)
      //item = JSON.parse(`{"_id":"${_id}","brand":"Montlimart","name":"${name}","price":${price}}`);
      //console.log("HEEERRR", item);
      //return item;
        //console.log(name,price);
      return {brand,name,price};
    })
    .get();
};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async url => {
  try {
    let response = await fetch(url);
    if (response.ok) {
        console.log('response ok');
        let body = await response.text();
        let products = parse(body);
        console.log('prooooooooooooo');
        //const items_json = JSON.stringify(products);
      return products;
    }
    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
