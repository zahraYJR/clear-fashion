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
  return $('.productList-container .productList')
    .map((i, element) => {
      const link = `https://www.dedicatedbrand.com${$(element)
      .find('.productList-link')
      .attr('href')}`;
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
      const _id = uuidv5(link, uuidv5.URL)

      return {_id,name, price};
    })
    .get();
};

const nb_prod_total = data => {
  const $ = cheerio.load(data);

  return $('.category')
    .map((i, element) => {
      const nb_prod_tot = parseInt(
        $(element)
          .find('.js-allItems-total')
          .text());
      return (nb_prod_tot);
    })
    .get();
};

const nb_prod_current = data => {
  const $ = cheerio.load(data);

  return $('.category')
    .map((i, element) => {
      const nb_prod_cur = parseInt(
        $(element)
          .find('.js-items-current')
          .text());
      return (nb_prod_cur);
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
    let products_dedicated = [];
    if (response.ok) {
      let body = await response.text();
      let total_prod = nb_prod_total(body);
      //let meme = "";
      //Math.round(total_prod/40) +1
      
      for(let i=0;i<1;i++)
      {
        //console.log(url +`#page=${i}` );
        response = await fetch(url + `#page=${i}`);
        body = await response.text();
        let products = parse(body);
        products_dedicated.push(products);
        //console.log(i);
      }
      return products_dedicated;
    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
