import { dataProducts } from "./dataProducts";
import { createSorts } from "./sortProducts";

type productType = typeof dataProducts.products[1];
interface productInLocal{
    id: string,
    count: string,
    price: string
}

export function putProducts(){
    const products = dataProducts.products;
    const founds = document.querySelector('.founds') as HTMLDivElement;

    founds.textContent = `Founds: ${dataProducts.total}`;
    products.forEach((product) => _putProduct(product));
    createSorts();
    
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
    const cartNumber = document.querySelector('.header__cart__number__content') as HTMLDivElement;
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
    if (productInCart != undefined){
        total.textContent = `Cart total: €${Number(product.price) + Number(total.textContent?.replace('Cart total: €', ''))}`;
        addCart.textContent = 'DROP FROM CART';
        cartNumber.textContent = String(Number(cartNumber.textContent) + 1);
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
        if (addCart.textContent === 'ADD TO CART'){
            let cartProducts = [];
            const localStor = localStorage.getItem('cartProducts');
            if (localStor){
                cartProducts = JSON.parse(localStor);
            }
            const nwProduct = {
                id: product.id,
                count: 1,
                price: product.price
            };
            cartProducts.push(nwProduct);
            localStorage.setItem('cartProducts', JSON.stringify(cartProducts));

            total.textContent = `Cart total: €${Number(product.price) + Number(total.textContent?.replace('Cart total: €', ''))}`;
            addCart.textContent = 'DROP FROM CART';
            cartNumber.textContent = String(Number(cartNumber.textContent) + 1);
        }
        else{
            let cartProducts = [];
            const localStor = localStorage.getItem('cartProducts');
            if (localStor){
                cartProducts = JSON.parse(localStor);
            }
            const productInCart = cartProducts.find((item: productInLocal) => String(item.id) === String(product.id));
            cartProducts.splice(cartProducts.indexOf(productInCart),1);

            localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
            // const nowCart = localStorage.getItem('cartProducts')?.split(',').splice(0,1);
            // if (nowCart != undefined)
            // localStorage.setItem('cartProducts',nowCart?.splice(nowCart.indexOf(String(product.id)),1).join(','));
            total.textContent = `Cart total: €${Number(total.textContent?.replace('Cart total: €', '')) - Number(product.price)}`;
            addCart.textContent = 'ADD TO CART';
            cartNumber.textContent = String(Number(cartNumber.textContent) - 1);
        }
    });
}