export function implicateCartNumber(){
    const cartNumber = document.querySelector('.header__cart__number__content') as HTMLDivElement;
    let cartProducts = [];
    const localStor = localStorage.getItem('cartProducts');
    if (localStor){
        cartProducts = JSON.parse(localStor);
        const cartExample = cartProducts[0];
        const productNumbers: number = cartProducts.reduce(
            (sum: number, item: typeof cartExample) => sum + item.count, 0);

        cartNumber.textContent = String(productNumbers);
    } else {
        
        cartNumber.textContent = String(cartProducts.length);
    }
}