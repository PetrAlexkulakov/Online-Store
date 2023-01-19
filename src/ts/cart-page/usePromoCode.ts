import { AllPromoCodes } from "./cartTypes";
import { availablePromoCodes } from "./promoCodes";
import {
  startPrice,
  resultPrice,
  resultPriceMoney,
  changeTotalItemsAndMoney,
  changePromoCodeMoney,
} from "./changeMoney";
import { CartLocalStore } from "./cartTypes";

const promoCodeInput =
  document.querySelector<HTMLInputElement>(".promo-code__input");
const appliedCodes = document.querySelector<HTMLElement>(".applied-codes");
const foundPromo = document.querySelector<HTMLElement>(".found-promo");

let cartProducts: CartLocalStore[] = [];
const localStore = localStorage.getItem("cartProducts");
if (localStore) {
  cartProducts = JSON.parse(localStore);
}

function showPromoCodes() {
  if (!promoCodeInput || !foundPromo) return;

  for (let i = 0; i < availablePromoCodes.length; i++) {
    if (promoCodeInput.value.toUpperCase() === availablePromoCodes[i].id) {
      foundPromo.style.display = "block";
      if (checkUsedPromoCode()) {
        foundPromo.innerHTML = `${availablePromoCodes[i].name} - ${availablePromoCodes[i].disc}%`;
        break;
      } else {
        foundPromo.innerHTML = `${availablePromoCodes[i].name} - ${availablePromoCodes[i].disc}%
        <span class="applied-codes__span found-promo__btn_add">ADD</span>`;
        break;
      }
    } else {
      foundPromo.style.display = "none";
    }
  }
}

function checkUsedPromoCode(): boolean | undefined {
  const localStorPromoCodes = localStorage.getItem("OSpromoCodes");
  if (!localStorPromoCodes) return;
  const usedPromoCodes: AllPromoCodes[] = JSON.parse(localStorPromoCodes);
  let isUsed = false;

  for (let i = 0; i < usedPromoCodes.length; i++) {
    if (usedPromoCodes[i].id === promoCodeInput?.value.toUpperCase()) {
      isUsed = true;
      break;
    }
  }
  return isUsed;
}

function addPromoCode(e: Event) {
  if ((e.target as HTMLElement).classList.contains("found-promo__btn_add")) {
    applyPromoCode(e.target as HTMLElement);
  }
}

function removePromoCode(e: Event) {
  if ((e.target as HTMLElement).classList.contains("promo__btn_drop")) {
    deletePromoCode(e.target as HTMLElement);
  }
}

function applyPromoCode(target: HTMLElement) {
  target.style.display = "none";
  if (
    !promoCodeInput ||
    !startPrice ||
    !resultPrice ||
    !resultPriceMoney ||
    !appliedCodes
  )
    return;

  const localStorPromoCodes = localStorage.getItem("OSpromoCodes");
  let usedPromoCodes: AllPromoCodes[] = [];
  if (localStorPromoCodes) {
    usedPromoCodes = JSON.parse(localStorPromoCodes);
  }

  availablePromoCodes.forEach((item) => {
    if (promoCodeInput.value.toUpperCase() === item.id) {
      usedPromoCodes.push(item);
      localStorage.setItem("OSpromoCodes", JSON.stringify(usedPromoCodes));
    }
  });
  createAppliedPromo();
  changePromoCodeMoney();
}

export function createAppliedPromo() {
  const localStorPromoCodes = localStorage.getItem("OSpromoCodes");
  if (!appliedCodes || !localStorPromoCodes) return;

  appliedCodes.style.display = "block";
  appliedCodes.innerHTML = "";
  const title = document.createElement("h3");
  title.innerHTML = "Applied codes";
  appliedCodes.appendChild(title);

  const usedPromoCodes: AllPromoCodes[] = JSON.parse(localStorPromoCodes);

  usedPromoCodes.forEach((item) => {
    const appliedPromo = document.createElement("div");
    appliedPromo.classList.add("applied-promo");
    appliedPromo.setAttribute("id", `${item.id}`);
    appliedPromo.innerHTML = `${item.name} - ${item.disc}% - <span class="applied-codes__span promo__btn_drop">DROP</span>`;
    appliedCodes.appendChild(appliedPromo);
  });
}

function deletePromoCode(target: HTMLElement) {
  const parent = target.closest(".applied-promo");
  const parentId = parent?.getAttribute("id");
  const localStorPromoCodes = localStorage.getItem("OSpromoCodes");
  if (!localStorPromoCodes || !appliedCodes || !startPrice || !resultPrice)
    return;
  const usedPromoCodes: AllPromoCodes[] = JSON.parse(localStorPromoCodes);

  usedPromoCodes.forEach((item, i) => {
    if (item.id === parentId) {
      usedPromoCodes.splice(i, 1);
      if (usedPromoCodes.length === 0) {
        localStorage.removeItem("OSpromoCodes");
        appliedCodes.style.display = "none";
        appliedCodes.innerHTML = "";
        startPrice?.classList.remove("old-price");
        if (!resultPrice) return;
        resultPrice.style.display = "none";
        changeTotalItemsAndMoney(cartProducts);
      } else {
        localStorage.setItem("OSpromoCodes", JSON.stringify(usedPromoCodes));
        changePromoCodeMoney();
      }
    }
  });
  parent?.remove();
  showPromoCodes();
}

promoCodeInput?.addEventListener("input", showPromoCodes);
foundPromo?.addEventListener("click", addPromoCode);
appliedCodes?.addEventListener("click", removePromoCode);
