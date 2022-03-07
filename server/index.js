const parseDomain = require('parse-domain');
const sources = require('require-all')(`${__dirname}/sources`);

module.exports = async link => {
  const {'domain': source} = parseDomain(link);
  const products = await sources[source].scrape(link);

  return products;
};