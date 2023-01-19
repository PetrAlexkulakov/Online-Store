import { CartLocalStore } from "./cart-page/cartTypes";

export function implicateCartNumber(){
    const cartNumber = document.querySelector('.header__cart__number__content') as HTMLDivElement;
    let cartProducts: CartLocalStore[] = [];
    const localStore = localStorage.getItem('cartProducts');
    if (localStore){
        cartProducts = JSON.parse(localStore);
        const cartExample = cartProducts[0];
        const productNumbers: number = cartProducts.reduce(
            (sum: number, item: typeof cartExample) => sum + item.count, 0);

        cartNumber.textContent = String(productNumbers);
    } else {
        cartNumber.textContent = String(cartProducts.length);
    }
}