const fetch = require('node-fetch');
const cheerio = require('cheerio');
/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */

const parse = data => {
    const $ = cheerio.load(data);
    return $('.center_column .product_list.grid.row .product-container .right-block')
        .map((i, element) => {
        const brand = "Adresse Paris";
        const name = $(element)
            .find('.product-name-container.versionpc .product-name')
            .text()
            .trim()
            .replace(/\s/g, ' ');
        const price = parseInt(
            $(element)
            .find('.prixright')
            .text()
            .trim()
          );

        return {brand, name, price};
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
