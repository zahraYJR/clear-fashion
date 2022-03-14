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
        //console.log(name,price);
      return {_id,name,price};
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
        let body = await response.text();
        let products = parse(body);
      return products;
    }
    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
