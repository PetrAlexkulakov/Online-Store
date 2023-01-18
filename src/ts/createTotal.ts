export function createTotal(total: HTMLDivElement){
    let cartProducts = [];
    const localStore = localStorage.getItem('cartProducts');

    if (localStore){
        cartProducts = JSON.parse(localStore);
        const cartExample = cartProducts[0];
        const totalPrices: number = cartProducts.reduce(
            (sum: number, item: typeof cartExample) => sum + item.price * item.count, 0);
            
        total.textContent = `Cart total: €${(totalPrices).toFixed(2)}`;
    }
}