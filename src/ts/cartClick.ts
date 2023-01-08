export function cartClick(){
    const headerCart = document.querySelector<HTMLElement>('.header__cart');

    headerCart?.addEventListener('click', () => {
        window.location.href = './index-cart.html';
    });
}