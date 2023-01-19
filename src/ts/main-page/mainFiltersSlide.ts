import { addQuery } from "../Router";
import { dataProducts } from "../dataProducts";

interface ourPrice extends HTMLDivElement{
  price: string
  stock: string
}

export function createFiltersSlide() {
    _addFilterWork('stock');
    _addFilterWork('price');
}

function _addFilterWork(type: string){
  let fromSlider: HTMLInputElement;
  let toSlider: HTMLInputElement;
  let fromInput: HTMLDivElement;
  let toInput: HTMLDivElement;
  const values = _findNeedable(type);
  const ratio = values.third || 1;

  if (type === 'price'){
    fromSlider = document.querySelector<HTMLInputElement>('.price__range-input1') as HTMLInputElement;
    toSlider = document.querySelector<HTMLInputElement>('.price__range-input2') as HTMLInputElement;
    fromInput = document.querySelector<HTMLDivElement>('.prive__from-data') as HTMLDivElement;
    toInput = document.querySelector<HTMLDivElement>('.prive__to-data') as HTMLDivElement;

  }else{
    fromSlider = document.querySelector<HTMLInputElement>('.stock__range-input1') as HTMLInputElement;
    toSlider = document.querySelector<HTMLInputElement>('.stock__range-input2') as HTMLInputElement;
    fromInput = document.querySelector<HTMLDivElement>('.stock__from-data') as HTMLDivElement;
    toInput = document.querySelector<HTMLDivElement>('.stock__to-data') as HTMLDivElement;
  }
  
  _setToggleAccessible(toSlider);

  fromSlider.oninput = () => _controlFromSlider(fromSlider, toSlider, fromInput, ratio, type);
  toSlider.oninput = () => _controlToSlider(fromSlider, toSlider, toInput, ratio, type);
  fromInput.oninput = () => _controlFromInput(fromSlider, fromInput, toInput, ratio, type);
  toInput.oninput = () => _controlToInput(toSlider, fromInput, toInput, ratio, type);

  _setFromQuery(fromInput, toInput, type);
  _controlFromInput(fromSlider, fromInput, toInput, ratio, type);
  _controlToInput(toSlider, fromInput, toInput, ratio, type);
  _filterFiltraite(type, fromInput, toInput);
}

function _setFromQuery(fromInput: HTMLDivElement, toInput: HTMLDivElement, type: string){
  const oldSearch = window.location.search.slice(1,);
  const oldSearchArray = oldSearch.split('&');
  const ourReg = `${type}=`;
  const ourFilter = oldSearchArray.find(item => item.includes(type))?.replace(ourReg,'');
  const firstAndSecond = ourFilter?.split('%E2%86%95');

  if (firstAndSecond !== undefined && type === 'price'){
    fromInput.textContent = '€' + firstAndSecond[1];
    toInput.textContent = '€' + firstAndSecond[0];
  }else if (firstAndSecond !== undefined){
    fromInput.textContent = firstAndSecond[1];
    toInput.textContent = firstAndSecond[0];
  }
}

function _findNeedable(type: string){
  let allItems, min, max, ratio;

  if (type === 'price'){
    allItems = Array.from(document.querySelectorAll('.product-item')) as ourPrice[];
    if (allItems !== undefined){

      min = Number(allItems.reduce(function (item: ourPrice, min: ourPrice){
        if (Number(item.getAttribute('price')) < Number(min.getAttribute('price'))){
          return item;
        }
        return min;
      }).getAttribute('price'));
      max = Number(allItems.reduce(function (item: ourPrice, max: ourPrice){
        if (Number(item.getAttribute('price')) > Number(max.getAttribute('price'))){
          return item;
        }
        return max;
      }).getAttribute('price'));
    }
  } else{
    allItems = Array.from(document.querySelectorAll('.product-item')) as ourPrice[];
    if (allItems !== undefined){

      min = Number(allItems.reduce(function (item: ourPrice, min: ourPrice){
        if (Number(item.getAttribute('stock')) < Number(min.getAttribute('stock'))){
          return item;
        }
        return min;
      }).getAttribute('stock'));
      max = Number(allItems.reduce(function (item: ourPrice, max: ourPrice){
        if (Number(item.getAttribute('stock')) > Number(max.getAttribute('stock'))){
          return item;
        }
        return max;
      }).getAttribute('stock'));
    }
  }
  if (min != undefined && max != undefined)
  ratio = Math.floor((max - min) / 48);

  return {
    first: min,
    second: max,
    third: ratio
  };
}

function _controlFromInput(fromSlider: HTMLInputElement, fromInput: HTMLDivElement, toInput: HTMLDivElement, ratio: number, type: string ) {
  const [from, to] = _getParsed(fromInput, toInput);

  if(from !== undefined && to !== undefined){
    if (from > to) {
      fromSlider.value = String(Math.floor(to / ratio));
      if (type === 'price')
      fromInput.textContent = '€' + String(to);
      else fromInput.textContent =String(to);
    } else {
      fromSlider.value = String(Math.floor(from/ ratio));
    }
  }
}
  
function _controlToInput(toSlider: HTMLInputElement, fromInput: HTMLDivElement, toInput: HTMLDivElement, ratio: number, type: string) {
  const [from, to] = _getParsed(fromInput, toInput);

  _setToggleAccessible(toInput);
  if(from !== undefined && to !== undefined){
    if (from <= to) {
        toSlider.value = String(Math.floor(to / ratio));
        if (type === 'price')
        toInput.textContent = '€' + String(to);
        else toInput.textContent = String(to);
      } else {
        if (type === 'price')
        toInput.textContent = '€' + String(to);
        else toInput.textContent = String(to);
      }
  }
}

function _controlFromSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement, fromInput: HTMLDivElement, ratio: number, type: string) {
  const [from, to] = _getParsed(fromSlider, toSlider);

  if(from !== undefined && to !== undefined){
    if (from > to) {
      fromSlider.value = String(to);
      if (type === 'price')
      fromInput.textContent = '€' + String(to * ratio);
      else fromInput.textContent = String(to * ratio);
    } else {
      if (type === 'price')
      fromInput.textContent = '€' + String(to * ratio);
      else fromInput.textContent = String(to * ratio);
    }
    addQuery(type, `${(to * ratio)}%E2%86%95${(from * ratio)}`);
  }
}

function _controlToSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement, toInput: HTMLDivElement, ratio: number, type: string) {
  const [from, to] = _getParsed(fromSlider, toSlider);

  _setToggleAccessible(toSlider);
  if(from !== undefined && to !== undefined){
    if (from <= to) {
      toSlider.value = String(to);
      if (type === 'price')
      toInput.textContent = '€' + String(to * ratio);
      else toInput.textContent = String(to * ratio);
    } else {
      if (type === 'price')
      toInput.textContent = '€' + String(to * ratio);
      else toInput.textContent = String(to * ratio);
      toSlider.value = String(from);
    }
    addQuery(type, `${(to * ratio)}%E2%86%95${(from * ratio)}`);
  }
}

function _getParsed(currentFrom: HTMLInputElement | HTMLDivElement, currentTo: HTMLInputElement | HTMLDivElement) {
  let from, to;

  if (currentFrom instanceof HTMLInputElement) from = parseInt(currentFrom.value, 10);
  else {
    if (currentFrom.textContent !== null)
    from = parseInt(currentFrom.textContent.replace('€', ''), 10);
  }
  if (currentTo instanceof HTMLInputElement) to = parseInt(currentTo.value, 10);
  else {
    if (currentTo.textContent !== null)
    to = parseInt(currentTo.textContent.replace('€', ''), 10);
  }
  
  return [from, to];
}

function _setToggleAccessible(currentTarget: HTMLInputElement | HTMLDivElement) {
  const toSlider = document.querySelector<HTMLInputElement>('.price__range-input2') as HTMLInputElement;
  let value;

  if (currentTarget instanceof HTMLInputElement) value = Number(currentTarget.value);
  else value = Number(currentTarget.textContent);

  if (value <= 0 ) {
    toSlider.style.zIndex = '2';
  } else {
    toSlider.style.zIndex = '0';
  }
}

function _filterFiltraite(type: string, fromInput: HTMLDivElement, toInput: HTMLDivElement){
  const products = document.querySelectorAll('.product-item');

  products.forEach((product) => {
    const productInData = dataProducts.products.find((item) => item.id == +product.id);
    const property: keyof typeof productInData = type as keyof typeof productInData;
    const from = Number(fromInput.textContent?.replace('€', ''));
    const to = Number(toInput.textContent?.replace('€', ''));

    if (productInData !== undefined){
      if (productInData[property] < from || productInData[property] > to)
        product.classList.add('hide');
    }
  });
}