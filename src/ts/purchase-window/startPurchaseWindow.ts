import {
  formatCardNumber,
  formatCardDate,
  formatCardCvv,
  checkCardInput,
} from "./cardValidation";
import { checkPersonDateInput } from "./personDataValidation";


export const cardNumberInput = document.querySelector<HTMLInputElement>(
  ".card-number__input"
);
export const cardDateInput =
  document.querySelector<HTMLInputElement>(".card-date__input");
export const cvvInput = document.querySelector<HTMLInputElement>(".cvv__input");
export const personNameIn = document.querySelector<HTMLInputElement>('.person-name__input');
export const phoneNumberIn = document.querySelector<HTMLInputElement>('.phone-number__input');
export const addressIn = document.querySelector<HTMLInputElement>('.address__input');
export const emailIn = document.querySelector<HTMLInputElement>('.email__input');

export const modalWindowWrap = document.querySelector<HTMLElement>(
  ".modal-window-wrapper"
);
export const modalWindow = document.querySelector<HTMLElement>(".modal-window");


modalWindowWrap?.addEventListener("click", hideModalWindow);
cardNumberInput?.addEventListener("input", formatCardNumber);
cardDateInput?.addEventListener("input", formatCardDate);
cvvInput?.addEventListener("input", formatCardCvv);
cardNumberInput?.addEventListener("change", checkCardInput);
cardDateInput?.addEventListener("change", checkCardInput);
cvvInput?.addEventListener("change", checkCardInput);
personNameIn?.addEventListener('input', checkPersonDateInput);
phoneNumberIn?.addEventListener('input', checkPersonDateInput);
addressIn?.addEventListener('input', checkPersonDateInput);
emailIn?.addEventListener('input', checkPersonDateInput);


export function showModalWindow() {
  if (!modalWindowWrap) return;
  modalWindowWrap.style.display = "flex";
}

function hideModalWindow(e: Event) {
  const target = e.target as HTMLElement;
  if (!modalWindowWrap || !target) return;
  if (target.closest(".modal-window") === modalWindow) return;
  modalWindowWrap.style.display = "none";
  const cartModalWindow = document.getElementById("cartModalWindow");
  if (!cartModalWindow) return;
  cartModalWindow.id = "cart";
}

