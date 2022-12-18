import { dataProducts } from "./dataProducts";

export function createFilters(){
    const categoryFilterList = <HTMLDivElement>document.querySelector('.category__filter-list');
    const brandFilterList = <HTMLDivElement>document.querySelector('.brand__filter-list');
    const categories: Set<string> = new Set();
    const brand: Set<string> = new Set();

    dataProducts.products.forEach((product) => {
        categories.add(String(product.category));
        brand.add(String(product.brand));
    });
    _makeFilter(categoryFilterList, categories);
    _makeFilter(brandFilterList, brand);
}

function _makeFilter(parentNode: HTMLElement, filters: Set<string>){
    filters.forEach((filter) => {
        const filterNode = document.createElement('div');
        filterNode.classList.add('filter-list');
        parentNode.append(filterNode);

        const filterInput = document.createElement('input');
        filterInput.classList.add('filter-input');
        filterInput.type = 'checkbox';
        filterInput.id = filter;
        filterNode.append(filterInput);

        const filterLabel = document.createElement('label');
        filterLabel.classList.add('filter-label');
        filterLabel.textContent = ' ' + filter;
        filterNode.append(filterLabel);
    });
}