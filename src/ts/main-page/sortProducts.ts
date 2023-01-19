import { dataProducts } from "../dataProducts";
import { addQuery } from "../Router";

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
    const allProducts = document.querySelectorAll('.product-item');
    const itemInfo = 
    Array.from(document.getElementsByClassName('info__item-info') as HTMLCollectionOf<HTMLDivElement>);
    let isBig = true;

    if (window.location.search.includes('big=false')) isBig = false;

    allProducts.forEach((product) => {
        if(!isBig)
        product.classList.add('small-item');
        else product.classList.remove('small-item');
    });
    itemInfo.forEach((item) => {
        if(!isBig)
        item.style.display = 'none';
        else item.style.display = '';
    });
    if (isBig) big.classList.add('active-view');
    else small.classList.add('active-view');

    small.addEventListener('click', () => {
        addQuery('big', false);
    });
    big.addEventListener('click', () => {
        addQuery('big', true);
    });
}

function _createSortOptions(){
    const sortOption = document.querySelector('.sort-bar__select');
    _sortBySortOption();

    sortOption?.addEventListener('change', function(e) {
        if(e.target instanceof HTMLSelectElement) {
            addQuery('sort',e.target.value);
        }
    });
}

function _sortBySortOption(){
    const oldSearch = window.location.search.slice(1,);
    const oldSearchArray = oldSearch.split('&');
    const option = oldSearchArray.find(item => item.includes('sort'))?.replace(/sort=/,'');
    if (option != undefined){
        const productExample = dataProducts.products[0];
        const sortType: keyof typeof productExample = 
        option.replace(/Sort by|-DESC|-ASC/i,'') == 'discount' ? 
        'discountPercentage' as keyof typeof productExample : 
        option.replace(/Sort by|-DESC|-ASC/i,'') as keyof typeof productExample;
        const sortUp = option.match(/ASC/) !== null;
        const nav = <HTMLElement>document.querySelector('.products__items-products');
        const sortDOM = document.querySelector<HTMLSelectElement>('.sort-bar__select');

        if (sortDOM != null) sortDOM.value = option;

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
    
}

function _insertAfter(elem: Element, refElem: Element){
    if (refElem.parentNode !== null) return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}