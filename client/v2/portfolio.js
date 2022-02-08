// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};
let favorite_products = [];
let currentSize = 12;


// instantiate the selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const sectionProducts = document.querySelector('#products');

//Filters
const selectFilterRecentProducts = document.querySelector('#filter-date-select')
const selectFilterReasonablePrice = document.querySelector('#filter-price-select')
const selectFilterPriceBetween50_100 = document.querySelector('#filter-price-between-50-and-100-select')
const selectFilterPriceAbove100 = document.querySelector('#filter-price-above-100-select')
const selectBrand = document.querySelector('#brand-select');

//Sort
const selectSort = document.querySelector('#sort-select');

//Indicators
const spanNbProducts = document.querySelector('#nbProducts');
const spanNbRecentProducts = document.querySelector('#nbNewProducts');
const spanp50 = document.querySelector('#p50');
const spanp90 = document.querySelector('#p90');
const spanp95 = document.querySelector('#p95');
const spanLastReleased = document.querySelector('#lastReleased');

//Favorite products
const check_if_favorite = document.getElementsByClassName("favorite_products");
const selectFilterFavorite = document.querySelector('#filter-favorite-select')


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
  try 
  {
    const response = await fetch(
      `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
    ); 
    const body = await response.json(); 

    if (body.success !== true) 
    {
      console.error(body);
      return {currentProducts, currentPagination};
    }

    return body.data;
  } 

  catch (error) 
  {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};


// Produits et leurs informations sous forme de tableau
/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  
  let template = `
  <table>
    <thead>
      <tr>
        <th>Brand</th>
        <th style="text-align: start;">|</th>
        <th>Product - link</th>
        <th style="text-align: start;"></th>
        <th>Price</th>
        <th style="text-align: start;"></th>
        <th>Released</th>
        <th style="text-align: start;"></th>
        <th>Favorite products</th>
      </tr>
  </thead>
  <tbody>`;

  template += products
    .map((product) => {
        if (favorite_products.includes(product.uuid)) 
        {
            return `
                <tr class="product" id=${product.uuid}>
                <th style="text-align: start;">${product.brand}</th>
                <th style="text-align: start;">|</th>
                <th style="text-align: start;"><a href="${product.link}">${product.name}</a></th>
                <th style="text-align: start;">|</th>
                <th style="text-align: start;">${product.price}€</th>
                <th style="text-align: start;">|</th>
                <th style="text-align: start;">${product.released}</th>
                <th style="text-align: start;">|</th>
                <th>
                <button style = "display:inline-block;
                padding:0.3em 1.2em;
                margin:0.5em 0.3em 0.3em 0;
                font-weight:300;
                font-size : 15px;
                color: white;
                background-color:#008CBA;
                text-align:center;
                transition: all 0.2s;"
                onclick= RemoveFavorite('${product.uuid}')>Remove</button>
            </th>
                </tr>
                `;
        }
        else 
        {
            return `
            <tr class="product" id=${product.uuid}>
            <th style="text-align: start;">${product.brand}</th>
            <th style="text-align: start;">|</th>
            <th style="text-align: start;"><a href="${product.link}">${product.name}</a></th>
            <th style="text-align: start;">|</th>
            <th style="text-align: start;">${product.price}€</th>
            <th style="text-align: start;">|</th>
            <th style="text-align: start;">${product.released}</th>
            <th style="text-align: start;">|</th>
            <th>
                <button style = "display:inline-block;
                padding:0.3em 1.2em;
                margin:0.5em 0.3em 0.3em 0;
                font-weight:300;
                font-size: 15px;
                color: white;
                background-color:#008CBA;
                text-align:center;
                transition: all 0.2s;"
                onclick= AddFavorite('${product.uuid}')>Add</button>
            </th>
            </tr>
            `;
        }
    })
    .join("");
  template += "</tbody></table>";

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


// Show the list of brand names for the filter
const renderBrands = products => {
    let brands = [... new Set(products.flatMap(x => x.brand))];

    selectBrand[0] = new Option("All");
    var i = 1;
    for (var b of brands) 
    {
        selectBrand[i] = new Option(b);
        i += 1;
    }
};



// INDICATORS

/**
 * Render page indicators
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
    const { count } = pagination;

    spanNbProducts.innerHTML = count;
    spanNbRecentProducts.innerHTML = CountRecentProducts();
    spanp50.innerHTML = Price_value(50) + " €";
    spanp90.innerHTML = Price_value(90) + " €";
    spanp95.innerHTML = Price_value(95) + " €";
    spanLastReleased.innerHTML = LastReleased();
};


/*
Feature 8 - Number of products indicator
As a user
I want to indicate the total number of products
So that I can understand how many products is available
-> juste au-dessus : spanNbProducts.innerHTML = count;
*/

/*
Feature 9 - Number of recent products indicator
As a user
I want to indicate the total number of recent products
So that I can understand how many new products are available
*/
function CountRecentProducts() 
{
    var count = 0
    for (var product of currentProducts) 
    {
        let today = new Date('2022-01-01') // ou new Date() pour récupérer date du jour
        let released = new Date(product.released);
        if (today - released < 14 * 24 * 60 * 60 * 1000) 
        {
            count += 1
        }
    }
    return count
}

/*Feature 10 - p50, p90 and p95 price value indicator
As a user
I want to indicate the p50, p90 and p95 price value
So that I can understand the price values of the products
*/
function Price_value(p)
{
    let sortedProducts = currentProducts.slice();
    sortedProducts.sort((product1, product2) =>
        product1.price < product2.price ? 1 : 
        product1.price === product2.price ? 0 : 
        -1
    );
    const index = Math.floor(sortedProducts.length * (p/100));
    return sortedProducts[index].price;
}

/*
Feature 11 - Last released date indicator
As a user
I want to indicate the last released date
So that I can understand if we have new products
*/
function LastReleased() {
    var sortedProducts = Sort_products(currentProducts, "date-asc")
    return sortedProducts[0].released
}

const render = (products, pagination) => {
    renderBrands(products);
    renderProducts(products);
    renderPagination(pagination);
    renderIndicators(pagination);
};





/**
 * Declaration of all Listeners
 */


/*
Feature 1 - Browse pages
As a user
I want to browse available pages
So that I can load more products
*/
selectPage.addEventListener('change', event => {
    fetchProducts(parseInt(event.target.value), currentPagination.pageSize)
        .then(setCurrentProducts) 
        .then(() => render(currentProducts, currentPagination));
});


/*
Feature 2 - Filter by brands
As a user
I want to filter by brands name
So that I can browse product for a specific brand
*/

selectBrand.addEventListener('change', event => {
    fetchProducts(currentPagination.currentPage, currentPagination.pageSize)
        .then(setCurrentProducts)
        .then(() => render(FilterByBrand(currentProducts, event.target.value), currentPagination));
})

function FilterByBrand(currentProducts, brandName) 
{
    var filteredProducts = []
    if (brandName == "All") 
    {
        filteredProducts = [...currentProducts]
    }
    for (var product of currentProducts) 
    {
        if (product.brand == brandName) 
        {
            filteredProducts.push(product)
        }
    } 
    return filteredProducts
}


/*
Feature 3 - Filter by recent products
As a user
I want to filter by recent products
So that I can browse the new released products (less than 2 weeks)
*/

selectFilterRecentProducts.addEventListener('change', event => {
    fetchProducts(currentPagination.currentPage, currentPagination.pageSize)
        .then(setCurrentProducts)
        .then(() => render(FilterByReleasedDate(currentProducts, event.target.value), currentPagination));
})

function FilterByReleasedDate(currentProducts, selector) {
    var filtered_products = []
    if (selector == "no_filter") {
        filtered_products = [...currentProducts]
    }
    else {
        for (var product of currentProducts) {
            let today = new Date('2022-01-01')  // ou new Date() pour date d'aujourd'hui
            let released = new Date(product.released);
            if (today - released < 14 * 24 * 60 * 60 * 1000) {
                filtered_products.push(product)
            }
        }
    }
    return filtered_products
}


/*
 Feature 4 - Filter by reasonable price
As a user
I want to filter by reasonable price
So that I can buy affordable product i.e less than 50 €
*/

selectFilterReasonablePrice.addEventListener('change', event => {
    fetchProducts(currentPagination.currentPage, currentPagination.pageSize)
        .then(setCurrentProducts)
        .then(() => render(FilterByReasonablePrice(currentProducts, event.target.value), currentPagination));
})

function FilterByReasonablePrice(currentProducts, instruction) {
    var filteredProducts = []
    if (instruction == "no_filter") 
    {
        filteredProducts = [...currentProducts]
    }
    else 
    {
        for (var product of currentProducts) 
        {
            //console.log(product.price);
            if (product.price <= 50) 
            {
                filteredProducts.push(product)
            }
        }
    }
    return filteredProducts
}



// Filter by prices between 50€ and 100€
selectFilterPriceBetween50_100.addEventListener('change', event => {
    fetchProducts(currentPagination.currentPage, currentPagination.pageSize)
        .then(setCurrentProducts)
        .then(() => render(FilterByPriceBetween50_100(currentProducts, event.target.value), currentPagination));
  })
  
function FilterByPriceBetween50_100(currentProducts, instruction) 
{
    var filtered_products = []
    if (instruction == "no_filter") 
    {
        filtered_products = [...currentProducts]
    }
    else 
    {
        for (var product of currentProducts) 
        {
            //console.log(product.price);
            if ((product.price > 50) && (product.price <= 100)) 
            {
                filtered_products.push(product)
            }
        }
    }
return filtered_products
}
 
  
  // Filter by prices above 100€
  selectFilterPriceAbove100.addEventListener('change', event => {
    fetchProducts(currentPagination.currentPage, currentPagination.pageSize)
        .then(setCurrentProducts)
        .then(() => render(FilterByPriceAbove100(currentProducts, event.target.value), currentPagination));
  })
  
  function FilterByPriceAbove100(currentProducts, instruction) 
  {
    var filtered_products = []
    if (instruction == "no") 
    {
      filtered_products = [...currentProducts]
    }
    else 
    {
      for (var product of currentProducts) 
      {
        console.log(product.price);
        if (product.price > 100) 
        {
          filtered_products.push(product)
        }
      }
    }
    return filtered_products
  }



/*
Feature 5 - Sort by price
As a user
I want to sort by price
So that I can easily identify cheapest and expensive products
*/

//AND 

/*
Feature 6 - Sort by date
As a user
I want to sort by price
So that I can easily identify recent and old products
*/

selectSort.addEventListener('change', event => {
    fetchProducts(currentPagination.currentPage, currentPagination.pageSize)
        .then(setCurrentProducts)
        .then(() => render(Sort_products(currentProducts, event.target.value), currentPagination));
})


function Sort_products(currentProducts, instruction) {
    let clone = [...currentProducts]
    var sorted_products = []
    if (instruction == "no_sort") 
    {
        sorted_products = [...currentProducts]
    }
    else if (instruction == "price-asc")
    {
        sorted_products = clone.sort((p1, p2) => p1.price - p2.price)
    }
    else if (instruction == "price-desc")
    {
        sorted_products = clone.sort((p1, p2) => p2.price - p1.price)
    }
    else if (instruction == "date-asc")
    {
        sorted_products = clone.sort((p1, p2) => {
            let date1 = new Date(p1.released);
            let date2 = new Date(p2.released);
            return date2 - date1;
        })
    }
    else if (instruction == "date-desc")
    {
        sorted_products = clone.sort((p1, p2) => {
            let date1 = new Date(p1.released);
            let date2 = new Date(p2.released);
            return date1 - date2;
        })
    }
    return sorted_products
}


/*
Feature 12 - Open product link
As a user
I want to open product link in a new page
So that I can buy the product easily
-> On peut cliquer sur le lien dans le tableau pour ouvrir la page du produit
*/




/*
Feature 13 - Save as favorite
As a user
I want to save a product as favorite
So that I can retreive this product later
*/
function AddFavorite(uuid) {
    favorite_products.push(uuid);
    render(currentProducts, currentPagination)

    refresh();
}

function RemoveFavorite(uuid) {
    favorite_products.pop(uuid);
    render(currentProducts, currentPagination)

    refresh();
}


/*
Feature 14 - Filter by favorite
As a user
I want to filter by favorite products
So that I can load only my favorite products
*/
selectFilterFavorite.addEventListener('change', event => {
    fetchProducts(currentPagination.currentPage, currentPagination.pageSize)
        .then(setCurrentProducts)
        .then(() => render(FilterByFavorite(currentProducts, event.target.value), currentPagination));
})

function FilterByFavorite(currentProducts, instruction) 
{
    var filteredProducts = []
    if (instruction == "no_filter") 
    {
        filteredProducts = [...currentProducts]
    }
    else 
    {
        for (var product of currentProducts) 
        {
            if (favorite_products.includes(product.uuid)) 
            {
                filteredProducts.push(product)
            }
        }
    }
    return filteredProducts
}


/**
 * Select the number of products to display
 */
 selectShow.addEventListener('change', async (event) => {
  const products = await fetchProducts(currentPagination.currentPage, parseInt(event.target.value));

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts();

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});


// Mettre à jour sur la page les modifications effectuées
const refresh = () => {
    fetchProducts(currentPagination.currentPage, currentPagination.pageSize)
      .then(setCurrentProducts)
      .then(() => render(currentProducts, currentPagination));
};


// Supprimer toutes les options sélectionnées
function ResetOptions()
{
    selectFilterRecentProducts.value = "no_filter";
    selectFilterReasonablePrice.value = "no_filter";
    selectFilterPriceBetween50_100.value = "no_filter";
    selectFilterPriceAbove100.value = "no_filter";
    selectBrand.value = "All";
    selectSort.value = "no_sort";  
    selectFilterFavorite.value = "no_filter";
}