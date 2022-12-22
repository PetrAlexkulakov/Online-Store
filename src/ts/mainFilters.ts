import { dataProducts } from "./dataProducts";
import { addQuery } from "./Router";
interface CustomHtmlDiv extends HTMLDivElement  {
    type?: string;
}

export function createFilters(){
    const categoryFilterList = <HTMLDivElement>document.querySelector('.category__filter-list');
    const brandFilterList = <HTMLDivElement>document.querySelector('.brand__filter-list');
    const categories: Set<string> = new Set();
    const brand: Set<string> = new Set();

    dataProducts.products.forEach((product) => {
        categories.add(String(product.category));
        brand.add(String(product.brand));
    });
    _makeFilter(categoryFilterList, categories, 'categories');
    _makeFilter(brandFilterList, brand, 'brand');
    _createFiltersWork();
}

function _makeFilter(parentNode: HTMLElement, filters: Set<string>, type: string){
    filters.forEach((filter) => {
        const filterNode: CustomHtmlDiv = document.createElement('div');
        filterNode.classList.add('filter-list');
        filterNode.id = filter;
        filterNode.type= type;
        parentNode.append(filterNode);

        const filterInput = document.createElement('input');
        filterInput.classList.add('filter-input');
        filterInput.type = 'checkbox';
        filterNode.append(filterInput);

        const filterLabel = document.createElement('label');
        filterLabel.classList.add('filter-label');
        filterLabel.textContent = ' ' + filter;
        filterNode.append(filterLabel);
    });
}

function _createFiltersWork(){
    const allInputs: CustomHtmlDiv[] = Array.from(document.querySelectorAll('.filter-list'));

    allInputs.forEach((input: CustomHtmlDiv) => {
        input.addEventListener('click', (e) => {
            const target: HTMLElement = <HTMLElement>e.target;
            const filterList: CustomHtmlDiv | null = target.closest(".filter-list");

            if (filterList !== null) addQuery(String(filterList.type), filterList.id);
            
        });
    });
}

export function filtraite(){
    const products = document.querySelectorAll('.product-item');
    const filters = window.location.search.replace(/&.*=/, '&').replace(/^.*=/, '').split(/%E2%86%95|&/);
    const allFiltersHTML = document.querySelectorAll('.filter-list');
    let hasCategory = false;
    let hasBrand = false;

    dataProducts.products.forEach((item) => {
        if (filters.indexOf(item.category) !== -1) hasCategory = true;
        if (filters.indexOf(item.brand) !== -1) hasBrand = true;
    });

    allFiltersHTML.forEach((filter) => {
        if (filters.includes(filter.id)){
            const input = filter.querySelector<HTMLInputElement>(".filter-input");
            if (input != null)
            input.checked = !input.checked;
        }
    });

    products.forEach((product) => {
        const productInData = dataProducts.products.find((item) => item.id == +product.id);

        if (productInData != undefined && filters != undefined){

            if (hasCategory && hasBrand){
                if (filters.indexOf(productInData.category) !== -1 && filters.indexOf(productInData.brand) !== -1)
                product.classList.remove('hide');
                else product.classList.add('hide');
            } else if (hasCategory){
                if (filters.indexOf(productInData.category) !== -1)
                product.classList.remove('hide');
                else product.classList.add('hide');
            }else if (hasBrand){
                if (filters.indexOf(productInData.brand) !== -1)
                product.classList.remove('hide');
                else product.classList.add('hide');
            }
        }
        else product.classList.remove('hide');
        if (filters[0] === '') product.classList.remove('hide');
    });
}

