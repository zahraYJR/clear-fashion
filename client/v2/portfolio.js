// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};

// inititiqte selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const filterByPrice = document.querySelector('#filter-price');
const filterByDate = document.querySelector('#filter-date');
const selectsort = document.querySelector('#sort-select');
const selectBrand = document.querySelector('#brand-select');

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

const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
  renderBrandination(pagination);
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

selectPage.addEventListener('change', event => {
  fetchProducts(parseInt(event.target.value), currentPagination.size)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});

filterByPrice.onclick=function(){
  currentProducts=currentProducts.filter(a=>a.price<50);
  render(currentProducts,currentPagination);
};

filterByDate.onclick=function(){
  currentProducts=currentProducts.filter(a=>
    Math.abs(new Date(a.released.split('-')[0],a.released.split('-')[1],a.released.split('-')[2])-Date.now())>1209600000
  );
  render(currentProducts,currentPagination);
};

selectsort.addEventListener('change',event=>{
  switch(event.target.value){
    case 'price-asc':
      currentProducts.sort(function(a, b) {return a.price - b.price;});
      break;
    case 'price-desc':
      currentProducts.sort(function(a, b) {return a.price - b.price;}).reverse();
      break;
    case 'date-asc':
      currentProducts.sort(function(a, b) {return new Date(a.released.split('-')[0],a.released.split('-')[1],a.released.split('-')[2]) - new Date(b.released.split('-')[0],b.released.split('-')[1],b.released.split('-')[2]);});
      break;
    case 'date-desc':
      currentProducts.sort(function(a, b) {return new Date(a.released.split('-')[0],a.released.split('-')[1],a.released.split('-')[2]) - new Date(b.released.split('-')[0],b.released.split('-')[1],b.released.split('-')[2]);}).reverse();
      break;
    default:
      console.log('patate');
  }
  render(currentProducts, currentPagination);
});

const renderBrandination = products => {
  let brands=[];
  console.log(currentProducts[5]);
  for (let i=0;i<currentProducts.length;i++){
    brands.push(currentProducts[i].brand)
  }
  console.log(brands);
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  var unique_brands = brands.filter(onlyUnique);
  console.log(unique_brands);
  const options = Array.from(
    {'length': unique_brands.length},
    (value, index) => `<option value="${unique_brands[index]}">${unique_brands[index]}</option>`
  ).join('');

  selectBrand.innerHTML = options;
};

selectBrand.addEventListener('change', event=>{
  currentProducts=currentProducts.filter(a=>a.brand == event.target.value);
  render(currentProducts,currentPagination);
  console.log("Not equal");
});

document.addEventListener('DOMContentLoaded', () =>
  fetchProducts()
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination))
);
