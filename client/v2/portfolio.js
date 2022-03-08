// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// all products
let products = [];

// all brands
let brands = [];

// favorites
let favoriteSelectors = [];
let favoriteProducts;
if (localStorage.getItem('favoriteProducts') == null) {
	favoriteProducts = [];
}
else {
	favoriteProducts = JSON.parse(localStorage.getItem('favoriteProducts'));
}

// current products on the page
let currentProducts = [];
let currentPagination = {};
let currentBrandIndex = 0;
let recentlyReleased = false;
let reasonablePrice = false;
let currentSort = 0;

// initiate selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const selectBrand = document.querySelector('#brand-select');
const selectSort = document.querySelector('#sort-select');
const sectionProducts = document.querySelector('#products');
const sectionFavorites = document.querySelector('#favorites');
const spanNbProducts = document.querySelector('#nbProducts');
const spanNbNewProducts = document.querySelector('#nbNewProducts');
const spanP50 = document.querySelector('#p50');
const spanP90 = document.querySelector('#p90');
const spanP95 = document.querySelector('#p95');
const spanLastReleased = document.querySelector('#lastReleased');
const checkReleased = document.querySelector('#released-check');
const checkPrice = document.querySelector('#price-check');

/**
 * Set global value
 * @param {Number} size - number of products per page
 */
const setCurrentProducts = (size) => {
	const page = currentPagination.currentPage;
	let temp;
	if (recentlyReleased) {
		temp = products.filter(product => {
			const rel = new Date(product.released);
			const today = new Date();
			return (today - rel)/(1000*60*60*24) < 14.0;
		});
	}
	else {
		temp = products;
	}
	
	if (reasonablePrice) {
		temp = temp.filter(product => {
			return product.price < 50;
		});
	}
	
	if (currentBrandIndex != 0) {
		temp = temp.filter(product => {
			return product.brand == brands[currentBrandIndex];
		});
	}
	
	switch (currentSort) {
		case 0: //price-asc
			temp.sort((product1, product2) => {
				return product1.price-product2.price;
			});
			break;
		
		case 1: //price-desc
			temp.sort((product1, product2) => {
				return product2.price-product1.price;
			});
			break;
			
		case 2: //date-asc
			temp.sort((product1, product2) => {
				const date1 = new Date(product1.released);
				const date2 = new Date(product2.released);
				return date2-date1;
			});
			break;
		
		case 3: //date-desc
			temp.sort((product1, product2) => {
				const date1 = new Date(product1.released);
				const date2 = new Date(product2.released);
				return date1-date2;
			});
			break;
			
		case 4: //fav
			temp.sort((product1, product2) => {
				if ((favoriteProducts.includes(product1.uuid) && favoriteProducts.includes(product2.uuid))
					|| !(favoriteProducts.includes(product1.uuid) || favoriteProducts.includes(product2.uuid))) {
					return 0;
				}
				else if (favoriteProducts.includes(product1.uuid)) {
					return -1;
				}
				else {
					return 1;
				}
			});
			break;
	}
	
	currentPagination.pageCount = Math.ceil(temp.length/currentPagination.pageSize);
	currentProducts = temp.slice((page-1)*size, page*size);;
};

/**
 * Get all the products and brands
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setAllLists = ({result, meta}) => {
	products = result;
	brands = ["N/A"].concat(Array.from(new Set(result.map(product => {return product.brand;}))));
};

/**
 * Fetch products from api
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (size = 12) => {
	try {
		const response = await fetch(
			`https://clear-fashion-api.vercel.app?size=${size}`
		);
		const body = await response.json();

		if (body.success !== true) {
			console.error(body);
			return {currentProducts, currentPagination};
		}

		return body.data;
	} 
	catch (error) {
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
	let template = `
	<table>
		<thead>
			<tr>
				<th>Picture</th>
				<th>Name</th>
				<th>Price</th>
				<th>Brand</th>
				<th>Release date</th>
				<th>Favorite</th>
			</tr>
		</thead>
		<tbody>`;
	products.map(product => {
		let fav = '';
		if (favoriteProducts.includes(product.uuid)) {
			fav = 'checked';
		}
		template += `
		<tr>
			<td><img src="${product.photo}" width="150"></td>
			<td><a href="${product.link}" target="_blank">${product.name}</a></td>
			<td>${product.price}€</td>
			<td>${product.brand}</td>
			<td>${product.released}</td>
			<td><input type="checkbox" id="check-${product.uuid}" ${fav}></td>
		</tr>`;
    });
	
	template += `
		</tbody>
	</table>`;

	div.innerHTML = template;
	fragment.appendChild(div);
	sectionProducts.innerHTML = '<h2>Products</h2>';
	sectionProducts.appendChild(fragment);
	
	favoriteSelectors.forEach(selector => {
		selector.removeEventListener('change', favEventListener);
		selector.parentElement.removeChild(selector);
	});
	favoriteSelectors = [];
	products.map(product => {
		const selector = document.querySelector(`#check-${product.uuid}`);
		selector.addEventListener('change', favEventListener);
		favoriteSelectors.push(selector);
	});
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
 * Render indicators
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
	let temp;
	
	spanNbProducts.innerHTML = products.length;
	
	temp = products.filter(product => {
		const rel = new Date(product.released);
		const today = new Date();
		return (today - rel)/(1000*60*60*24) < 14.0;
	});
	spanNbNewProducts.innerHTML = temp.length;
	
	temp = products;
	temp.sort((product1, product2) => {
		return product1.price-product2.price;
	});
	spanP50.innerHTML = String(temp[Math.ceil(temp.length*0.50)].price) + '€';
	spanP90.innerHTML = String(temp[Math.ceil(temp.length*0.90)].price) + '€';
	spanP95.innerHTML = String(temp[Math.ceil(temp.length*0.95)].price) + '€';
	
	temp.sort((product1, product2) => {
		const date1 = new Date(product1.released);
		const date2 = new Date(product2.released);
		return date2-date1;
	});
	spanLastReleased.innerHTML = temp[0].released;
};

/**
 * Render brand selector
 * @param  {Object} brands
 */
const renderBrands = (currentBrandIndex) => {
	let options = '';
	brands.map(brand => {
		options += `<option value="${brand}">${brand}</option>`;
	});
	
	selectBrand.innerHTML = options;
	selectBrand.selectedIndex = currentBrandIndex;
};

/**
 * Render favorite products
 * 
 */
 const renderFavorites = () => {
	const fragment = document.createDocumentFragment();
	const div = document.createElement('div');
	let template = `
	<table>
		<thead>
			<tr>
				<th>Picture</th>
				<th>Name</th>
				<th>Brand</th>
				<th>Price</th>
				<th>Release date</th>
			</tr>
		</thead>
		<tbody>`;
	favoriteProducts.map(uuid => {
		const product = products.filter(p => {return p.uuid == uuid;})[0];
		template += `
		<tr>
			<td><img src="${product.photo}" width="150"></td>
			<td><a href="${product.link}" target="_blank">${product.name}</a></td>
			<td>${product.brand}</td>
			<td>${product.price}€</td>
			<td>${product.released}</td>
		</tr>`;
    });

	template += `
		</tbody>
	</table>`;

	div.innerHTML = template;
	fragment.appendChild(div);
	sectionFavorites.innerHTML = '<h2>Favorite Products</h2>';
	sectionFavorites.appendChild(fragment); 
 };

/**
 * General rendering function
 * @param  {Object} products
 * @param  {Object} pagination
 */
const render = (products, pagination) => {
	renderProducts(products);
	renderPagination(pagination);
	renderIndicators(pagination);
	renderBrands(currentBrandIndex);
	renderFavorites();
};

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 * @type {[type]}
 */
selectShow.addEventListener('change', event => {
	currentPagination.currentPage = 1;
	currentPagination.pageSize = parseInt(event.target.value);
	setCurrentProducts(parseInt(event.target.value));
	render(currentProducts, currentPagination);
});

/**
 * Select the page to display
 * @type {[type]}
 */
selectPage.addEventListener('change', event => {
	currentPagination.currentPage = parseInt(event.target.value);
	setCurrentProducts(currentPagination.pageSize);
    render(currentProducts, currentPagination);
});

/**
 * Select the brand
 * @type {[type]}
 */
selectBrand.addEventListener('change', event => {
	currentPagination.currentPage = 1;
	currentBrandIndex = event.target.selectedIndex;
	setCurrentProducts(currentPagination.pageSize);
    render(currentProducts, currentPagination);
});

/**
 * Filter by recently released (less than 2 weeks)
 * @type {[type]}
 */
checkReleased.addEventListener('change', event => {
	recentlyReleased = event.target.checked;
	currentPagination.currentPage = 1;
	setCurrentProducts(currentPagination.pageSize);
    render(currentProducts, currentPagination);
});

/**
 * Filter by reasonable price (less than 50€)
 * @type {[type]}
 */
checkPrice.addEventListener('change', event => {
	reasonablePrice = event.target.checked;
	currentPagination.currentPage = 1;
	setCurrentProducts(currentPagination.pageSize);
    render(currentProducts, currentPagination);
});

/**
 * Select the sorting method
 * @type {[type]}
 */
selectSort.addEventListener('change', event => {
	currentSort = event.target.selectedIndex;
	currentPagination.currentPage = 1;
	setCurrentProducts(currentPagination.pageSize);
    render(currentProducts, currentPagination);
});

/**
 * Favorite event listener function
 * @type {Object}
 */
const favEventListener = (ev) => {
	if (ev.target.checked) {
		favoriteProducts.push(ev.target.id.split('-').splice(1).join('-'));
	}
	else {
		favoriteProducts.splice(favoriteProducts.indexOf(ev.target.id.split('-').splice(1).join('-')), 1);
	}
	localStorage.setItem('favoriteProducts', JSON.stringify(favoriteProducts));
	setCurrentProducts(currentPagination.pageSize);
	render(currentProducts, currentPagination);
};

/**
 * On first load
 * @type {[type]}
 */
document.addEventListener('DOMContentLoaded', () => {
	let productsCount;
	fetchProducts()
		.then(({result, meta}) => {productsCount = meta.count;})
		.then(() => {
			fetchProducts(productsCount)
				.then(setAllLists)
				.then(() => {
					currentPagination = {"currentPage":1, "pageCount":Math.ceil(productsCount/12), "pageSize":12};
					setCurrentProducts(12);
					render(currentProducts, currentPagination);
				});
		});
});
