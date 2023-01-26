export function goToIndex(){
    const logo = document.querySelector<HTMLDivElement>('.header__brand');

    logo?.addEventListener('click', () => {
        window.location.href = './index.html';
    });
}