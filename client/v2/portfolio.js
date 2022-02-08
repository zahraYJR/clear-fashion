// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};

// inititiqte selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts'); //Nb of products
const selectSort = document.querySelector('#sort-select');
const spanp50Products = document.querySelector('#p50'); //50 price value
const spanp90Products = document.querySelector('#p90'); //90 price value
const spanp95Products = document.querySelector('#p95'); //95 price value

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
  const div = document.createElement('div');
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
        <span>${product.price}</span>
      </div>
    `;
    })
    .join('');

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

//Caculator of the render of p50, p90 and p95
const renderPCalculator = products => {
  currentProducts.sort((x,y) => x.price - y.price); //sort du plus cher au moins cher
  spanp50Products.innerHTML = products[products.length*(0.5)].price;
  //p50 is the median value, 50% of the products will have a higher price/value than p50 and 50% will have a lower price/value
  spanp90Products.innerHTML = products[Math.round(products.length*(0.9)-0.5)].price // on met -0.5 pour arrondir en dessous ?
  //p90 is a value/price under which 90% of the products will be
  spanp95Products.innerHTML = products[Math.round(products.length*(0.95))].price
  //p95 is a value/price over which 95% of the products will be
}


const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
  renderPCalculator(currentProducts); //renderPCalculator
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

//Unables the user to select the page he wants to go to 
selectPage.addEventListener('change',event => {
  fetchProducts(parseInt(event.target.value), currentPagination.currentShow)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});

document.addEventListener('DOMContentLoaded', () =>
  fetchProducts()
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination))
);

//Sorting the products from the html file
selectSort.addEventListener('change', event => {
  if(event.target.value === 'cheaper'){//Sort from the cheapest to the most expensive product
    currentProducts.sort((x,y) => x.price - y.price);
  }
  else if(event.target.value === 'expensive'){//Sort from the most expensive to the cheapest product
    currentProducts.sort((x,y) => y.price - x.price);
  }
  else if(event.target.value === 'recently_released'){//Sort from the most recently released product to the most anciently released product
    currentProducts.sort((x,y) => Date.parse(y.released) - Date.parse(x.released));
  }
  else if(event.target.value === 'anciently_released'){//Sort from the most anciently released product to the most recently released product
    currentProducts.sort((x,y) => Date.parse(x.released) - Date.parse(y.released));
  }
  render(currentProducts,currentPagination);  
});