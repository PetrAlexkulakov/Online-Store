export function implicateCartNumber(){
    const cartNumber = document.querySelector('.header__cart__number__content') as HTMLDivElement;
    let cartProducts = [];
    const localStor = localStorage.getItem('cartProducts');
    if (localStor){
        cartProducts = JSON.parse(localStor);
    }

    cartNumber.textContent = String(cartProducts.length);
}