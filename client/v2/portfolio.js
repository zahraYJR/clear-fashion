// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};
let ReasonablePrice=false;
let RecentProduct=false;
let FavoriteProduct = false;
let favoritesProducts =[];
let allProducts = [];
let newProducts = [];


// Inititiate selectors to sort or filter, found in the html page
// To show 12, 24 or 48 products
const selectShow = document.querySelector('#show-select');
// To select the page to be displayed
const selectPage = document.querySelector('#page-select');
// To display recent products or products with a reasonnable price
const selectFilter = document.querySelector('#filter-select');
// To display products of a specific brand
const selectBrand = document.querySelector('#brand-select');
// To sort products by price or by released date
const selectSort = document.querySelector('#sort-select');

// Initiate products and infos about products, found in the html page
// Section to display all the products, following the chosen sorting and/or filtering parameters
const sectionProducts = document.querySelector('#products');
// Displays the number of products available on the website
const spanNbProducts = document.querySelector('#nbProducts');
// Displays the number of recent products
const spanNbNewProducts = document.querySelector('#nbNewProducts');
// Displays the p50, p90, p95 price values indicator
const spanP50PriceValue = document.querySelector('#p50PriceValue');
const spanP90PriceValue = document.querySelector('#p90PriceValue');
const spanP95PriceValue = document.querySelector('#p95PriceValue');
// Displays the date of the latest release on the website
const spanLastReleasedDate = document.querySelector('#lastReleasedDate');

// To add a product to the list of favorite products
const onclick  = document.querySelector('#favorite-product');



/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  currentProducts = result;
  currentPagination = meta;
  console.log("Set Current products", currentProducts, currentPagination);
};

/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
 const setAllProducts = ({result, meta}) => {
  allProducts = result;
  currentPagination = meta;
  console.log("Set All products", allProducts, currentPagination);
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
// Function to seek the products through the API
const fetchProducts = async (page = 1, size = 12,brand='') => {
  console.log("Fetch products");
  try {
    const response = await fetch(
      `https://clear-fashion-api.vercel.app?page=${page}&size=${size}&brand=${brand}`
    );
    const body = await response.json();
    
    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }
    console.log("FP", body.data);
    return body.data;

  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

const fetchAllProducts = (page = 1, size = 139, brand = '') => {
  console.log("Fetch all products");
  console.log("FAP", currentPagination, currentProducts);
  const {count} = currentPagination;
  console.log("FAP2", count);
  fetchProducts(1, count, '')
  .then(setAllProducts)
  .then(renderIndicatorsAllProducts);
};

const renderIndicatorsAllProducts = ()=>{
  console.log("Verif", currentPagination, allProducts);
  newProducts = recent_product(allProducts);
  console.log("New products", newProducts);
  spanNbNewProducts.innerHTML = newProducts.length;
  spanP50PriceValue.innerHTML = p50_value(allProducts) + " €";
  spanP90PriceValue.innerHTML = p90_value(allProducts) + " €";
  spanP95PriceValue.innerHTML = p95_value(allProducts) + " €";
  spanLastReleasedDate.innerHTML = last_released_date(allProducts);
}

/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  console.log("Render products");
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
          <input type="checkbox" onclick="checkFavorite('${product.uuid}')" >
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
  console.log("Render products");
};

// function checkFavorite(_uuid)
// {
//   favoritesProducts.push(_uuid);
//   for (let i = 0; i < favoritesProducts.length; i++) 
//   {
//    if(favoritesProducts.includes(_uuid)){favoritesProducts.remove(_uuid);} 
//     console.log(favoritesProducts[i]);
//   }
// }

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  console.log("Render Pagination");
  const {currentPage, pageCount} = pagination;
  console.log(pagination);
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');
  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
  console.log("Render Pagination");
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  console.log("Render Indicators");
  const {count} = pagination;
  spanNbProducts.innerHTML = count;
  console.log("Render Indicators");
};

const render = (products, pagination) => {
  console.log("Render");
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
  console.log("Render");
};



// USEFUL FUNCTIONS
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
    //console.log("Released",arr[i].released)
    date=addDaysToDate(date,20);
    var date2=new Date();
    if(date>date2){
      list.push(arr[i]);
    }
  }
  return list;
}

/**
 * @param {Array} arr
 */
function last_released_date(arr){
  let dates=[];
  let maxDate=null;
  arr.forEach(obj=>{
    dates.push(obj.released);
  })
  dates.forEach(date=>{
    if(maxDate==null){
      maxDate=date;
    } else {
      if(date>maxDate){
        maxDate=date;
      }
    }
  })
  return(maxDate);
}

function sort_by_price_asc(array_to_sort){
  var sort_by_price = array_to_sort.sort((a, b) => a.price - b.price);
  var product_list = [];
  sort_by_price.forEach(element => product_list.push(element.price));
  return product_list;
}

function p50_value(arr){
  let products_by_price = sort_by_price_asc(arr);
  var index = Math.round(products_by_price.length*0.5);
  return(products_by_price[index]);
}

function p90_value(arr){
  let products_by_price = sort_by_price_asc(arr);
  var index = Math.round(products_by_price.length*0.9);
  return(products_by_price[index]);
}

function p95_value(arr){
  let products_by_price = sort_by_price_asc(arr);
  var index = Math.round(products_by_price.length*0.95);
  return(products_by_price[index]);
}



/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 * @type {[type]}
 */
selectShow.addEventListener('change', event => {
    fetchProducts(currentPagination.currentPage, parseInt(event.target.value), selectBrand.value)
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



// Permits to initialize products and possibly other components when the XML is loading
document.addEventListener('DOMContentLoaded', () =>{
  console.log("Document Loaded");
  fetchProducts()
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination))
    .then(fetchAllProducts);
});

