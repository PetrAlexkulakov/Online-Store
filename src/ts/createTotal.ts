import { CartLocalStore } from "./cart-page/cartTypes";

export function createTotal(total: HTMLDivElement){
    const localStore = localStorage.getItem('cartProducts');

    if (localStore) {
        const cartProducts: CartLocalStore[] = JSON.parse(localStore);
        const cartExample = cartProducts[0];
        const totalPrices: number = cartProducts.reduce(
            (sum: number, item: typeof cartExample) => sum + item.price * item.count, 0);
            
        total.textContent = `Cart total: €${(totalPrices).toFixed(2)}`;
    }
}