import { dataProducts } from "../dataProducts";
import { createSorts } from "./sortProducts";
import { addButtonEvent } from "../addButtonEvent";
import { createTotal } from "../createTotal";
import { implicateCartNumber } from "../implicateCartNumber";

type productType = typeof dataProducts.products[1];
export interface productInLocal{
    id: string,
    count: string,
    price: string
}

export function putProducts(){
    const products = dataProducts.products;

    localStorage.setItem('isModaleOpen', 'false');
    products.forEach((product) => _putProduct(product));
    createSorts();

    setTimeout(() => 
    {
        const founds = document.querySelector('.founds') as HTMLDivElement;
        const productsCount = Array.from(document.querySelectorAll('.product-item'))
        .filter((product) => product.classList.contains('hide') === false).length;
        founds.textContent = `Founds: ${productsCount}`;
        if (productsCount === 0) {
            const noMessage = document.querySelector<HTMLSpanElement>('.no-products');
            
            if (noMessage !== null)
            noMessage.style.display = "block";
        }
    }, 1);
}

function _putProduct(product: productType){
    const itemsProducts = document.querySelector('.products__items-products') as HTMLDivElement;

    const item = document.createElement('div');
    item.classList.add('product-item');
    item.style.background = `url(${product.images[0]}) 0% 0% / cover`;
    item.setAttribute('id', String(product.id));
    item.setAttribute('price', String(product.price));
    item.setAttribute('stock', String(product.stock));
    itemsProducts?.appendChild(item);

    const itemText = document.createElement('div');
    itemText.classList.add('item-text');
    item.appendChild(itemText);

    const itemTitle = document.createElement('div');
    itemTitle.classList.add('item-title');
    itemTitle.textContent = product.title;
    itemText.appendChild(itemTitle);

    const itemInfo = document.createElement('div');
    itemText.appendChild(itemInfo);

    const infoItemInfo = document.createElement('div');
    infoItemInfo.classList.add('info__item-info');
    itemInfo.appendChild(infoItemInfo);
    _putSmallDescription(infoItemInfo, product);

    _createItemButtons(item, product);
    _eventButtons(item, product);
}
function _putSmallDescription(element: HTMLDivElement, product: productType){
    const category = document.createElement('p');
    category.textContent = `Category: ${product.category}`;
    element.appendChild(category);

    const brand = document.createElement('p');
    brand.textContent = `Brand: ${product.brand}`;
    element.appendChild(brand);

    const price = document.createElement('p');
    price.textContent = `Price: €${product.price}`;
    element.appendChild(price);

    const discount = document.createElement('p');
    discount.textContent = `Discount: ${product.discountPercentage}%`;
    element.appendChild(discount);

    const rating = document.createElement('p');
    rating.textContent = `Rating: ${product.rating}`;
    element.appendChild(rating);

    const stock = document.createElement('p');
    stock.textContent = `Stock: ${product.stock}`;
    element.appendChild(stock);
}

function _createItemButtons(wrapper: HTMLDivElement, product: productType){
    const total = document.querySelector('.total-price__price') as HTMLDivElement;
    let cartProducts = [];
    const localStor = localStorage.getItem('cartProducts');
    if (localStor){
        cartProducts = JSON.parse(localStor);
    }
    const productInCart = cartProducts.find((item: productInLocal) => String(item.id) === String(product.id));
    const buttonsWrapper = document.createElement('div');
    buttonsWrapper.classList.add('items__wrapper-buttons');
    const addCart = document.createElement('button');
    addCart.classList.add('button-add');
    if (productInCart !== undefined){
        createTotal(total);
        implicateCartNumber();
        addCart.textContent = 'DROP FROM CART';
    } else
    addCart.textContent = 'ADD TO CART';
    buttonsWrapper.appendChild(addCart);

    const details = document.createElement('button');
    details.classList.add('button-details');
    details.textContent = 'DETAILS';
    buttonsWrapper.appendChild(details);

    wrapper.appendChild(buttonsWrapper);
}

function _eventButtons(item: HTMLDivElement, product: productType){
    const addCart = item.querySelector('.button-add') as HTMLButtonElement;
    const details = item.querySelector('.button-details') as HTMLButtonElement;
    const total = document.querySelector('.total-price__price') as HTMLDivElement;
    const cartNumber = document.querySelector('.header__cart__number__content') as HTMLDivElement;

    addCart.addEventListener('click', () => {
        addButtonEvent(addCart, total, cartNumber, product);
    });

    details.addEventListener('click', () => {
        localStorage.setItem('productDetails', String(product.id));
        window.location.href = './details.html';
    });
}