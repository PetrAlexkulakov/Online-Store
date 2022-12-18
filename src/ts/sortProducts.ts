import { dataProducts } from "./dataProducts";

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

    sortOption?.addEventListener('change', function(e) {
        
        if(e.target instanceof HTMLSelectElement) _sortBySortOption(e.target.value);
        

    });
}

function _sortBySortOption(option: string){
    const productExample = dataProducts.products[0];
    const sortType: keyof typeof productExample = 
    option.replace(/Sort by|-DESC|-ASC/i,'') == 'discount' ? 'discountPercentage' as keyof typeof productExample : option.replace(/Sort by|-DESC|-ASC/i,'') as keyof typeof productExample;
    const sortUp = option.match(/ASC/) !== null ? true : false;
    const nav = <HTMLElement>document.querySelector('.products__items-products');

    if (sortUp){
        for (let i = 0; i < nav?.children.length; i++){
            for (let j = i; j < nav?.children.length; j++){
                const firsItem = 
                dataProducts.products.find(product => String(product.id) === nav.children[i].getAttribute('id'));
                const secondItem = 
                dataProducts.products.find(product => String(product.id) === nav.children[j].getAttribute('id'));
                if (firsItem !== undefined && secondItem !== undefined){
                    if (+firsItem[sortType] > +secondItem[sortType]) {
                        const replacedNode = nav.replaceChild(nav.children[j], nav.children[i]);
                        _insertAfter(replacedNode, nav.children[i]);
                    }
                }
            }
        }
    } else{
        for (let i = 0; i < nav?.children.length; i++){
            for (let j = i; j < nav?.children.length; j++){
                const firsItem = 
                dataProducts.products.find(product => String(product.id) === nav.children[i].getAttribute('id'));
                const secondItem = 
                dataProducts.products.find(product => String(product.id) === nav.children[j].getAttribute('id'));
                if (firsItem !== undefined && secondItem !== undefined){
                    if (+firsItem[sortType] < +secondItem[sortType]) {
                        const replacedNode = nav.replaceChild(nav.children[j], nav.children[i]);
                        _insertAfter(replacedNode, nav.children[i]);
                    }
                }
            }
        }
    }
}

function _insertAfter(elem: Element, refElem: Element){
    if (refElem.parentNode !== null) return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}