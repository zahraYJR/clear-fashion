const fetch = require('node-fetch');
const cheerio = require('cheerio');
/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */

const parse = data => {
    const $ = cheerio.load(data);
    return $('.product_list.grid.row')
        .map((i, element) => {
        const name = $(element)
            .find('div.product-container .product-name-container.versionpc a')
            .text()
            .trim()
            .replace(/\s/g, ' ');
        const price = (
            $(element)
            .find('div.product-container .prixright')
            .text()
            .trim()
            .replace(/\s/g, '')
            .replace('€',' ')
        );

        return {name, price};
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
