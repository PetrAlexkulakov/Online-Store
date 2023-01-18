import { addToCart } from "./addToCart";
import { ourProduct } from "./addToCart";

export function addButtonEvent(addCart: HTMLButtonElement, total: HTMLDivElement, cartNumber: HTMLDivElement, product: ourProduct){
    if (addCart.textContent === 'ADD TO CART'){
        let cartProducts = [];
        const localStore = localStorage.getItem('cartProducts');
        if (localStore){
            cartProducts = JSON.parse(localStore);
        }
        const nwProduct = {
            id: product.id,
            count: 1,
            price: product.price
        };
        cartProducts.push(nwProduct);
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));

        total.textContent = `Cart total: €${(Number(product.price) + Number(total.textContent?.replace('Cart total: €', ''))).toFixed(2)}`;
        addCart.textContent = 'DROP FROM CART';
        cartNumber.textContent = String(Number(cartNumber.textContent) + 1);
    }
    else{
        addToCart(product);
        total.textContent = `Cart total: €${(Number(total.textContent?.replace('Cart total: €', '')) - Number(product.price)).toFixed(2)}`;
        addCart.textContent = 'ADD TO CART';
        cartNumber.textContent = String(Number(cartNumber.textContent) - 1);
    }
}