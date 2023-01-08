export function createTotal(total: HTMLDivElement){
    let cartProducts = [];
    const localStor = localStorage.getItem('cartProducts');

    if (localStor){
        cartProducts = JSON.parse(localStor);
        const cartExample = cartProducts[0];
        const totalPrices: number = cartProducts.reduce(
            (sum: number, item: typeof cartExample) => sum + Number(item.price), 0);

        total.textContent = `Cart total: €${(totalPrices).toFixed(2)}`;
    }
}