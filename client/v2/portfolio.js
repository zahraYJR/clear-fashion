// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};
let ReasonablePrice=false;
let RecentProduct=false;
let FavoriteProduct = false;
let favoritesProducts =[];



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
        <div>
          <span>Brand : </span>
          <strong>${product.brand}</strong>
        </div>
        <div>
          <span>Link : </span>
          <a href="${product.link}" target="_blank">${product.name}</a>
        </div>
          <span>Price : </span>
          <strong>${product.price} €</strong>
        <div>
          <input type="checkbox" onclick="checkFavorite('${product.uuid}')" ${product.favorite ? "checked" : ""}>
          <label for="favorite-product">Add to favorite</label>
        </div>
      </div>
    `;
    })
    .join('');

    if(currentProducts.length != 0 )div.innerHTML = template;
    else div.innerHTML = "0 product correspond to these filters on this page";
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
    .then(()=>{
    switch(selectSort.value){
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
      default :
        currentProducts;
        break;
    }
    switch(selectFilter.value){
      case "filter-recent":
        currentProducts=recent_product(currentProducts);
       break;
      case "filter-reasonable-price":
         currentProducts=reasonable_price(currentProducts);
       break;
      default:
        currentProducts;
        break;
    }
   
  }).then(() => render(currentProducts, currentPagination));
});

selectPage.addEventListener('change', event => {
  fetchProducts(parseInt(event.target.value),selectShow.value,selectBrand.value)
    .then(setCurrentProducts)
    .then(()=>{
      switch(selectSort.value){
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
          default :
          currentProducts;
          break;
      }
      switch(selectFilter.value){
        case "filter-recent":
          currentProducts=recent_product(currentProducts);
         break;
        case "filter-reasonable-price":
           currentProducts=reasonable_price(currentProducts);
         break;
        default:
          currentProducts;
          break;
      }

    }).then(() => render(currentProducts, currentPagination));
});

selectBrand.addEventListener('change', event => {
  fetchProducts(currentPagination.currentPage, selectShow.value,event.target.value)
  .then(setCurrentProducts)
  .then(()=>{
    switch(selectSort.value){
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
        default :
        currentProducts;
        break;
    }
    switch(selectFilter.value){
      case "filter-recent":
        currentProducts=recent_product(currentProducts);
       break;
      case "filter-reasonable-price":
         currentProducts=reasonable_price(currentProducts);
       break;
      default:
        currentProducts;
        break;
    }
  }).then(() => render(currentProducts, currentPagination));

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

function reasonable_price(arr){
  var list = [];
  for (let i = 0; i < arr.length; i++) 
  {
    if(arr[i].price<100) { list.push(arr[i]); }
  }
  return list;
}

function addDaysToDate(date, days){
  var res = new Date(date);
  res.setDate(res.getDate() + days);
  return res;
}

function recent_product(arr)
{
  var list = [];
  for (let i = 0; i < arr.length; i++) 
  {
    var date = new Date(arr[i].released);
    date=addDaysToDate(date,20);
    var date2=new Date();
    if(date>date2){
      list.push(arr[i]);
    }
  }

  return list;
}




selectFilter.addEventListener('change',event =>{
  fetchProducts(currentPagination.currentPage, selectShow.value,selectBrand.value)
  .then(setCurrentProducts)
  const filter= event.target.value;
  switch(filter){
    case "filter-recent":
      currentProducts=recent_product(currentProducts);
     break;
    case "filter-reasonable-price":
       currentProducts=reasonable_price(currentProducts);
     break;
    default:
      currentProducts;
      break;
  }
  render(currentProducts, currentPagination);

});

document.addEventListener('DOMContentLoaded', () =>
  fetchProducts()
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination))
);


