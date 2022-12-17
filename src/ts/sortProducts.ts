export function createSorts(){
    _createViewSort();
    _createSortOptions();
}

function _createViewSort(){
    const smallMode = document.querySelector('.small-mode') as HTMLDivElement;
    const bigMode = document.querySelector('.big-mode') as HTMLDivElement;

    for (let i = 1; i <= 30; i++){
        const point = document.createElement('div');
        point.textContent = '.';
        point.classList.add('small-point');
        smallMode?.appendChild(point);
    }
    for (let i = 1; i <= 16; i++){
        const point = document.createElement('div');
        point.textContent = '.';
        point.classList.add('big-point');
        bigMode?.appendChild(point);
    }

    _clickModeEvent(smallMode, bigMode);
}

function _clickModeEvent(small: HTMLDivElement, big: HTMLDivElement) {
    small.addEventListener('click', () => {
        const allProducts = document.querySelectorAll('.product-item');
        const itemInfo = Array.from(document.getElementsByClassName('info__item-info') as HTMLCollectionOf<HTMLDivElement>);

        allProducts.forEach((product) => {
            product.classList.add('small-item');
        });
        itemInfo.forEach((item) => {
            item.style.display = 'none';
        });
    });
    big.addEventListener('click', () => {
        const allProducts = document.querySelectorAll('.product-item');
        const itemInfo = Array.from(document.getElementsByClassName('info__item-info') as HTMLCollectionOf<HTMLDivElement>);

        allProducts.forEach((product) => {
            product.classList.remove('small-item');
        });
        itemInfo.forEach((item) => {
            item.style.display = '';
        });
    });
}

function _createSortOptions(){
    const sortOption = document.querySelector('.sort-bar__select');
    
}