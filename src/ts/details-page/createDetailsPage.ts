import { dataProducts } from "../dataProducts";
import { ourProduct } from "../addToCart";
import { addButtonEvent } from "../addButtonEvent";
import { createTotal } from "../createTotal";
import { implicateCartNumber } from "../implicateCartNumber";
import { productInLocal } from "../main-page/products";

export function createDetails(){
    const idInLocal = Number(localStorage.getItem('productDetails'));
    const product = dataProducts.products.find((item) => item.id === idInLocal);
    const total = document.querySelector('.total-price__price') as HTMLDivElement;

    localStorage.setItem('isModaleOpen', 'false');
    if (product !== undefined){
        createTotal(total);
        implicateCartNumber();
        _createNavigation(product);
        _createProductDetails(product);
    }
}

function _createNavigation(product: ourProduct){
    const detailsNavigator = document.querySelector<HTMLDivElement>('.details-navigator');

    if (detailsNavigator !== null){
        _addLinkToNav('store', detailsNavigator, true);
        detailsNavigator.append('>>');
        _addLinkToNav(product.category, detailsNavigator, false);
        detailsNavigator.append('>>');
        _addLinkToNav(product.brand, detailsNavigator, false);
        detailsNavigator.append('>>');
        _addLinkToNav(product.title, detailsNavigator, false);
    }
}
function _addLinkToNav(name: string, domNav: HTMLDivElement, isLink = false){
    const link = document.createElement('a');
    
    if (isLink) {
        link.href = '/';
        link.style.cursor = 'pointer';
    }
    link.textContent = name.toUpperCase();
    link.classList.add('nav-link');

    domNav.append(link);
}

function _createProductDetails(product: ourProduct){
    const productTitle = document.querySelector<HTMLDivElement>('.product-title');
    const productSlides = document.querySelector<HTMLDivElement>('.product-slides');

    if (productTitle !== null)
    productTitle.textContent = product.title;

    product.images.forEach((img, index) => {
        if (productSlides !== null)
        _createSlidesAndMainImage(productSlides, img, index);
    });

    _createTextInformation(product);
    _createButtonsBlock(product);
}
function _createSlidesAndMainImage(parent: HTMLElement, img: string, index: number){
    const image = document.createElement('img');
    image.src = img;
    image.classList.add('img-slide');
    parent.append(image);

    if (index === 0){
        _createMainImg(img);
    }
}

function _createMainImg(img: string){
    const productPhoto = document.querySelector<HTMLDivElement>('.product-photo');
    const mainImage = document.createElement('img');

    mainImage.src = img;
    productPhoto?.append(mainImage);
}

function _createTextInformation(product: ourProduct){
    const productInfo = document.querySelector<HTMLElement>('.product-info');

    if (productInfo !== null){
        _createTextBlock(productInfo, 'Description', product.description);
        _createTextBlock(productInfo, 'Discount Percentage', product.discountPercentage);
        _createTextBlock(productInfo, 'Rating', product.rating);
        _createTextBlock(productInfo, 'Stock', product.stock);
        _createTextBlock(productInfo, 'Brand', product.brand);
        _createTextBlock(productInfo, 'Category', product.category);
    }
}
function _createTextBlock(parent: HTMLElement, titleText: string, descriptionText: string | number){
    const productDetailItem = document.createElement('div');
    const title = document.createElement('h3');
    const description = document.createElement('p');

    productDetailItem.classList.add('product-detail-item');
    title.textContent = titleText;
    productDetailItem.append(title);
    description.textContent = String(descriptionText);
    productDetailItem.append(description);
    parent.append(productDetailItem);
}

function _createButtonsBlock(product: ourProduct){
    const cartButtons = document.querySelector<HTMLElement>('.cart-buttons');

    if (cartButtons !== null){
        const add = document.createElement('button');
        const buy = document.createElement('button');
        let cartProducts = [];
        const localStore = localStorage.getItem('cartProducts');
        if (localStore){
            cartProducts = JSON.parse(localStore);
        }
        const productInCart = cartProducts.find((item: productInLocal) => String(item.id) === String(product.id));

        if (productInCart == undefined)
        add.textContent = 'ADD TO CART';
        else add.textContent = 'DROP FROM CART';
        buy.textContent = 'BUY NOW';
        buy.classList.add('details__buy-now');

        cartButtons.append(`€${product.price}`);
        cartButtons.append(add);
        cartButtons.append(buy);

        _buttonsEvents(add, buy, product);
    }
}
function _buttonsEvents(add: HTMLButtonElement, buy: HTMLButtonElement, product: ourProduct){
    const total = document.querySelector('.total-price__price') as HTMLDivElement;
    const cartNumber = document.querySelector('.header__cart__number__content') as HTMLDivElement;

    add.addEventListener('click', () => {
        addButtonEvent(add, total, cartNumber, product);
    });
    buy.addEventListener('click', () => {
        if (add.textContent === 'ADD TO CART') addButtonEvent(add, total, cartNumber, product);
        localStorage.setItem('isModaleOpen', 'true');
        window.location.href = "./index-cart.html";
        //нужно добавить переброс на страницу с корзиной
    });
}
