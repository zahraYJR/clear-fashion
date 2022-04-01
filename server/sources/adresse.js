const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);

  return $('.ajax_block_product .product-container')
    .map((i, element) => {
      const name = $(element)
        .find('.product-name')
        .attr('title');
      const brand = 'adresse paris';
      const price = parseFloat($(element)
        .find('.price')
        .text());
      const url = $(element)
        .find('.product-name')
        .attr('href');
      const image = $(element)
      .find('.product_img_link')
      .find('img')
      .attr('data-original');

      return {name, brand, price, image, url};
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
    const response = await fetch(url);

    if (response.ok) {
      const body = await response.text();

      return parse(body);
    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
