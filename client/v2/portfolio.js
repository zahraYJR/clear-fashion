// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};

// inititiqte selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const selectBrand = document.querySelector('#brand-select');
const selectFilter = document.querySelector('#filter-select');
const selectSort = document.querySelector('#sort-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');

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
const fetchProducts = async (page = 1, size = 12,brand='') => {
  try {
    const response = await fetch(
      `https://clear-fashion-api.vercel.app?page=${page}&size=${size}&brand=${brand}`
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

const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
};

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 * @type {[type]}
 */
selectShow.addEventListener('change', event => {
  fetchProducts(currentPagination.currentPage, parseInt(event.target.value),selectBrand.value)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});

selectPage.addEventListener('change', event => {
  fetchProducts(parseInt(event.target.value),selectShow.value,selectBrand.value)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});

selectBrand.addEventListener('change', event => {
  fetchProducts(currentPagination.currentPage, selectShow.value,event.target.value)
  .then(setCurrentProducts)
  .then(() => render(currentProducts, currentPagination));

});

selectSort.addEventListener('change',event =>{
  fetchProducts(currentPagination.currentPage, selectShow.value,selectBrand.value)
  .then(setCurrentProducts)
  const sort= event.target.value;
  switch(sort){
    case "price-asc":
      currentProducts.sort((p1, p2) => p1.price - p2.price);
      break;
    case "price-desc":
      currentProducts.sort((p1, p2) => p2.price - p1.price);
      break;
    case "date-asc":
      currentProducts.sort((p1, p2) => Date.parse(p2.released) - Date.parse(p1.released));
      break;
    case "date-desc":
      currentProducts.sort((p1, p2) => Date.parse(p1.released) - Date.parse(p2.released));
      break;
    case " ":
      break;

  }
  render(currentProducts, currentPagination);


});
function sort_50_100(arr){
  var list = [];
  for (let i = 0; i < arr.length; i++) 
  {
    if(arr[i].price<100 && arr[i].price>50) { list.push(arr[i]); }
  }
  return list;
}

selectFilter.addEventListener('change',event =>{
  fetchProducts(currentPagination.currentPage, selectShow.value,selectBrand.value)
  .then(setCurrentProducts)
  const filter= event.target.value;
  switch(filter){

    
  }


});

document.addEventListener('DOMContentLoaded', () =>
  fetchProducts()
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination))
);


