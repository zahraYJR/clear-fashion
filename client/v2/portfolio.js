// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};

globalThis.liste_favoris = [];
// inititiqte selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const selectBrand = document.querySelector('#brand-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
//const spancountRecentlyReleased = document.querySelector('#count-recently-released');
//const Price_under50 = document.querySelector('#price-less50');
//const Recently_released = document.querySelector('#recently-released');
const spanp50 =document.querySelector('#p50');
const spanp90 =document.querySelector('#p90');
const spanp95 =document.querySelector('#p95');
const selectSort = document.querySelector('#sort-select');
const spanlast = document.querySelector('#last');
const favoris = document.querySelector('#favori');
const selectPrice = document.querySelector('#prix-select');
const selectlimite = document.querySelector('#limite-select');

// Let's go mega

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
 * @param  {String}  [brand=""] - brand to filter
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12, brand = "", sorted = "No", price ="1000",limit="") => {
  try {
    const response = await fetch(
      `https://server-iota-gold.vercel.app/Liste_Products/search?page=${page}&size=${size}&brand=${brand}&price=${price}&limit=${limit}`
      //`https://clear-fashion-api.vercel.app?page=${page}&size=${size}&brand=${brand}`
    );
    let body = await response.json();
    if (body.length == 0) {
      console.error(body);
      return {currentProducts, currentPagination};
    }
    let meta = {"CurrentPage":page,"count":body.length,"pageCount":size*page,"pageSize":size, "Brand":brand,"Price":price,"Limit":limit, "Sorted":sorted};
    //var shuffle_body = shuffle(body);
    //let result = await reduceProducts(body,size,page);
    let result = body;
    let res = {result,meta};
    body = res;
    console.log('reeess',body);
    /*
    if(less50 != "No")
    {
      return price_less_than_50(body);
    }
    if(recent != "No")
    {
      return recent_products_30(body);
    }*/
    if(sorted != "No")
    {
      if(sorted == 'price-asc')
      {
        body.result  = SortAsc(body.result);
      }
      else if(sorted == 'price-desc')
      {
        body.result  = SortDesc(body.result);
      }
      else if(sorted == 'date-asc')
      {
        body.result  = SortDateAsc(body.result);
      }
      else
      {
        body.result  = SortDateDesc(body.result);
      }

      return body;
    }
    return body;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

const price_less_than_50 = (body) =>
{
  let listeprod = [];
  for(let i =0; i<body.result.length;i++)
  {
    if(body.result[i].price<=50)
    {
      listeprod.push(body.result[i]);
    }
  }
  body.result = listeprod;
  return body;
}

const recent_products_30 = (body) =>
{
  var today = new Date();
  let listeprod = [];
  for(let i =0; i<body.result.length;i++)
  {
    var date_produit = new Date(body.result[i].released);
    var nbjours = Math.floor((today-date_produit)/(1000*60*60*24));
    if(nbjours<=30)
    {
      listeprod.push(body.result[i]);
    }
  }
  body.result = listeprod;
  return body;
}

const products_sorted = (body) =>
{
  var today = new Date();
  let listeprod = [];
  for(let i =0; i<body.result.length;i++)
  {
    var date_produit = new Date(body.result[i].released);
    var nbjours = Math.floor((today-date_produit)/(1000*60*60*24));
    if(nbjours<=30)
    {
      listeprod.push(body.result[i]);
    }
  }
  body.result = listeprod;
  return body;
}

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
      <div class="product" id=${product._id}>*
        <input type="checkbox" onclick="add_fav('${product.brand}','${product.price}','${product.name}','${product._id}')">Favori</button>
        <span style="color :blue; ">| ${product.brand} |</span>
        <a>${product.name}</a>
        <span style="color :red; ">${product.price}</span>
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
/** create a function that uptade the favorite product */

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;

  spanNbProducts.innerHTML = count;
};

const renderNewProducts = products => {
  let count = 0;
  var today = new Date();
  for(let i =0;i<products.length;i++)
  {
    var date_produit = new Date(products[i].released);
    var nbjours = Math.floor((today-date_produit)/(1000*60*60*24));
    if(nbjours<=30)
    {
      count = count + 1;
    }
    spancountRecentlyReleased.innerHTML = count;
  }
}
const renderp50 = products => {
  var index=parseInt(products.length*0.5);
  var sortedAsc = SortAsc(products);
  var count = sortedAsc[index].price;
  spanp50.innerHTML=count;
}

const renderp90 = products => {
  var index=parseInt(products.length*0.9);
  var sortedAsc = SortAsc(products);
  var count = sortedAsc[index].price;
  spanp90.innerHTML=count;
}

const renderp95 = products => {
  var index=parseInt(products.length*0.95);
  var sortedAsc = SortAsc(products);
  var count = sortedAsc[index].price;
  spanp95.innerHTML=count;
}

const renderlast = products => {
  let date_trie = SortDateDesc(products);
  spanlast.innerHTML = date_trie[0].released;
}

const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
  //renderNewProducts(products);
  renderp50(products);
  renderp90(products);
  renderp95(products);
  //renderlast(products);
};

const SortAsc = (liste_a_trier) =>
{
	let sort = liste_a_trier.sort((value1,value2) => (value1.price > value2.price) ? 1 : -1);
	return sort;
};

const SortDesc = (liste_a_trier) =>
{
	let sort = liste_a_trier.sort((value1,value2) => (value1.price < value2.price) ? 1 : -1);
	return sort;
};

const SortDateAsc = (liste_a_trier) =>
{
	let sort = liste_a_trier.sort((value1,value2) => (value1.released > value2.released) ? 1:-1);
	return sort;
};

const SortDateDesc = (liste_a_trier) =>
{
	let sort = liste_a_trier.sort((value1,value2) => (value1.released < value2.released) ? 1:-1);
	return sort;
};

//const sortedActivities = activities.sort((a, b) => b.date - a.date)

/**
 * Declaration of all Listeners
 */

// {"link" : "${product.link}","brand":"${product.brand}","price":"${product.price}","name":"${product.name}","uuid":"${product.uuid}","released":"${product.released}"})">Favori</button>

const add_fav = (brand,price,name,id) =>
{
  globalThis.liste_favoris.push({"brand":brand,"price":price,"name":name,"id":id});
  console.log(liste_favoris);
};
/**
 * Select the number of products to display
 * @type {[type]}
 */
selectShow.addEventListener('change', event => {
  fetchProducts(currentPagination.currentPage, parseInt(event.target.value), currentPagination.brand)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});

selectPage.addEventListener('change', event => {
  fetchProducts(parseInt(event.target.value), currentPagination.pageSize, currentPagination.brand)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});

selectBrand.addEventListener('change', event => {
  fetchProducts(currentPagination.currentPage, currentPagination.pageSize, event.target.value, currentPagination.Sorted,currentPagination.Price,currentPagination.Limit)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});

document.addEventListener('DOMContentLoaded', () =>
  fetchProducts()
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination))
);

selectSort.addEventListener('change', event => {
  fetchProducts(currentPagination.currentPage, currentPagination.pageSize, currentPagination.Brand, event.target.value, currentPagination.Price,currentPagination.Limit)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});


selectPrice.addEventListener('change', event => {
  fetchProducts(currentPagination.currentPage, currentPagination.pageSize, currentPagination.Brand, currentPagination.Sorted,event.target.value, currentPagination.Limit)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});

selectlimite.addEventListener('change', event => {
  fetchProducts(currentPagination.currentPage, currentPagination.pageSize, currentPagination.Brand, currentPagination.Sorted,currentPagination.Price, event.target.value)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});

//(page = 1, size = 12, brand = "", sorted = "No", price ="1000",limit="") => {


favoris.addEventListener('change', event => {
  if(event.target.value != 'No')
  {
    render(liste_favoris, currentPagination);
  }
  else{
    fetchProducts(currentPagination.currentPage, currentPagination.pageSize, currentPagination.Brand, currentPagination.Sorted,currentPagination.Price, currentPagination.Limit)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
  }

});