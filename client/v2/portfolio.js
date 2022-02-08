// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

/**
 * Done checked :
 * F0 x
 * F1 
 * F2
 * F3
 * F4
 * F5 x
 * F6 x
 * F7
 * F8
 * F9
 * F10
 * F11
 * F12
 */


// current products on the page
let currentProducts = [];
let currentPagination = {};

// inititiqte selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const selectSort = document.querySelector('#sort-select');
const spanp50Products=document.querySelector('#p50Products');
const spanp90Products=document.querySelector('#p90Products');
const spanp95Products=document.querySelector('#p95Products');

/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  currentProducts = result;
  currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12) => {
  try {
    const response = await fetch(
      `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
    );
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};



/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('table');
  const template = `
  <table border="10"> 
  <tr>
    <th>BRAND</th>
    <th>LINK</th>
    <th>PRICE</th>
  </tr>`+products
    .map(product => {
      return `
      <tr>
        <td>${product.brand}</td>
        <td> <a href="${product.link}">${product.name}</a> </td>
        <td>${product.price}</td>
      </tr>
    `;
    })
    .join('')+`</table>`;


  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;

  spanNbProducts.innerHTML = count;
};

const renderPCalculator = products => {
  currentProducts.sort((x,y) => x.price - y.price);
  spanp50Products.innerHTML = (products[products.length*(50/100)-1].price+products[products.length*(50/100)].price)/2;
  spanp90Products.innerHTML = (products[Math.round(products.length*(90/100)+0.5)-1].price+products[Math.round(products.length*(90/100)-0.5)-1].price)/2;
  spanp95Products.innerHTML = (products[Math.round(products.length*(95/100)+0.5)-1].price+products[Math.round(products.length*(95/100)-0.5)-1].price)/2;

};

const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
  renderPCalculator(currentProducts)
};

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 * @type {[type]}
 */
selectShow.addEventListener('change', event => {
  fetchProducts(currentPagination.currentPage, parseInt(event.target.value))
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});

document.addEventListener('DOMContentLoaded', () =>
  fetchProducts()
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination))
);

selectPage.addEventListener('change',event => {
  fetchProducts(parseInt(event.target.value), currentPagination.currentShow)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});

selectSort.addEventListener('change', event => {
  console.log(event.target.value);
  const srt = event.target.value;
  if(srt === 'price-asc'){
    currentProducts.sort((x,y) => x.price - y.price);
  }
  else if(srt === 'price-desc'){
    currentProducts.sort((x,y) => y.price - x.price);
  }
  else if(srt === 'date-asc'){
    currentProducts.sort((x,y) => Date.parse(y.released) - Date.parse(x.released));
  }
  else if(srt === 'date-desc'){
    currentProducts.sort((x,y) => Date.parse(x.released) - Date.parse(y.released));
  }
  console.log(currentProducts);
  render(currentProducts,currentPagination);  //
});
