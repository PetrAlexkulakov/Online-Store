import { CartLocalStore, AllPromoCodes } from "./cartTypes";

const totalItems = document.querySelector<HTMLElement>(".total-items");
const totalMoney = document.querySelector<HTMLElement>(".total-money");
const headerItems = document.querySelector<HTMLElement>(".header__cart__number__content");
const headerMoney = document.querySelector<HTMLElement>(".total-price__price");
export const startPrice = document.getElementById("startPrice");
export const resultPrice = document.getElementById("resultPrice");
export const resultPriceMoney = document.querySelector<HTMLElement>(".result-price__money");
let itemCounts = 0;
let itemSum = 0;

export function changeTotalItemsAndMoney(arrData: CartLocalStore[]) {
  if (!totalItems || !totalMoney || !headerItems || !headerMoney) return;
  itemCounts = 0;
  itemSum = 0;
  arrData.forEach((item) => {
    itemCounts = itemCounts + item.count;
    itemSum = itemSum + item.price * item.count;
  });

  totalItems.innerHTML = `${itemCounts}`;
  headerItems.innerHTML = `${itemCounts}`;
  totalMoney.innerHTML = `€${itemSum.toFixed(2)}`;
  headerMoney.innerHTML = `Cart total: €${itemSum.toFixed(2)}`;
}

export function changePromoCodeMoney() {
  if (!startPrice || !resultPrice || !resultPriceMoney || !headerMoney) return;

  const localStorPromoCodes = localStorage.getItem("OSpromoCodes");
  if (!localStorPromoCodes) return;
  const usedPromoCodes: AllPromoCodes[] = JSON.parse(localStorPromoCodes);

  startPrice.classList.add("old-price");
  resultPrice.style.display = "block";

  let itemDiscSum = 0;
  usedPromoCodes.forEach((item) => {
    itemDiscSum = itemDiscSum + +item.disc;
  });

  const resultSum = (itemSum * (1 - itemDiscSum / 100)).toFixed(2);
  resultPriceMoney.innerHTML = `€${resultSum}`;
}
