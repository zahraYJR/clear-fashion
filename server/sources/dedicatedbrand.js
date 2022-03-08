const fetch = require('node-fetch');
const cheerio = require('cheerio');

// /**
//  * Parse webpage e-shop
//  * @param  {String} data - html response
//  * @return {Array} products
//  */
// const parse = data => {
//   const $ = cheerio.load(data);

//   return $('.productList-container .productList')
//     .map((i, element) => {
//       const name = $(element)
//         .find('.productList-title')
//         .text()
//         .trim()
//         .replace(/\s/g, ' ');
//       const price = parseInt(
//         $(element)
//           .find('.productList-price')
//           .text()
//       );

//       return {name, price};
//     })
//     .get();
// };

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


const dedicatedbrand = require('dedicatedbrand');

const products = dedicatedbrand.scrape('https://www.dedicatedbrand.com/en/men/news');

products.forEach(product => {
  console.log(products.name);
})

const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);

  return $('.productList-container .productList')
    .map((i, element) => {
      const name = $(element)
        .find('.productList-title')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      const price = parseInt(
        $(element)
          .find('.productList-price')
          .text()
      );
      let link = $(element).find('.productList-link').attr('href');
        const prefix = 'https://www.dedicatedbrand.com';
        link = prefix + link;

      return {name, price, link};
    })
    .get();
};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async url => {
  try 
  {
    const response = await fetch(url);

    if (response.ok) {
      const body = await response.text();

      return parse(body);
    }

    console.error(response);

    return null;
  } 
  
  catch (error) {
    console.error(error);
    return null;
  }
};








/*
const fetch = require('node-fetch');
const cheerio = require('cheerio');
*/

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */

/*
const parse = data => {
  const $ = cheerio.load(data);

  return $('.productList-container .productList')
    .map((i, element) => {
      const name = $(element)
        .find('.productList-title')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      const price = parseInt(
        $(element)
          .find('.productList-price')
          .text()
      );

      return {name, price};
    })
    .get();
};

*/



/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */

/*
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

*/
