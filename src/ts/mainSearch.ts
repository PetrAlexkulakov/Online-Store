import { addQuery } from "./Router";
import { dataProducts } from "./dataProducts";

export function createSearch(){
    const searchDOM = document.querySelector<HTMLInputElement>('.search-bar__input');
    const oldSearch = window.location.search.slice(1,);
    const oldSearchArray = oldSearch.split('&');
    const ourFilter = oldSearchArray.find(item => item.includes('search'))?.replace(/search=/,'');

    if (ourFilter != undefined){
        const products = document.querySelectorAll('.product-item');

        if (searchDOM != null)searchDOM.value = ourFilter;
        searchDOM?.focus();
        products.forEach((product) => {
            const productInData = dataProducts.products.find((item) => item.id == +product.id);
            const exampleProperty = productInData;
            let isTrue = false;

            for (const i in productInData){
                const property: keyof typeof exampleProperty = i as keyof typeof exampleProperty;
                if (String(productInData[property]).toLowerCase().match(String(ourFilter).toLowerCase())){
                    isTrue = true;
                    break;
                }
            }

            if (!isTrue) product.classList.add('hide');
        });
    }

    searchDOM?.addEventListener('input', () => {
        addQuery('search', searchDOM.value);
    });
}