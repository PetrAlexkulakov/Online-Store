import { showNotEmptyCart } from "./cart-page/displayCart";
import {
  cardNumberInput,
  cardDateInput,
  cvvInput,
  personNameIn,
  phoneNumberIn,
  addressIn,
  emailIn,
  modalWindowWrap,
  modalWindow,
} from "./purchase-window/startPurchaseWindow";

export function confirmBtnClick() {
  const confirmBtn = document.querySelector<HTMLElement>(".btn__confirm");

  confirmBtn?.addEventListener("click", () => {
    if (cardNumberInput?.value.length === 0) {
      const myevent = new Event("change");
      cardNumberInput.dispatchEvent(myevent);
    }
    if (cardDateInput?.value.length === 0) {
      const myevent = new Event("change");
      cardDateInput.dispatchEvent(myevent);
    }
    if (cvvInput?.value.length === 0) {
      const myevent = new Event("change");
      cvvInput.dispatchEvent(myevent);
    }
    if (personNameIn?.value.length === 0) {
      const myevent = new Event("input");
      personNameIn.dispatchEvent(myevent);
    }
    if (phoneNumberIn?.value.length === 0) {
      const myevent = new Event("input");
      phoneNumberIn.dispatchEvent(myevent);
    }
    if (addressIn?.value.length === 0) {
      const myevent = new Event("input");
      addressIn.dispatchEvent(myevent);
    }
    if (emailIn?.value.length === 0) {
      const myevent = new Event("input");
      emailIn.dispatchEvent(myevent);
    }

    const invalidInputs = document.querySelectorAll(".invalid");
    if (invalidInputs.length === 0) {
      if (!modalWindow || !modalWindowWrap) return;
      localStorage.removeItem("cartProducts");
      localStorage.removeItem("OSpromoCodes");
      showNotEmptyCart();
      modalWindow.style.display = "none";
      const thankDiv = document.createElement("div");
      thankDiv.classList.add(".thankDiv");
      const thankDivSpan = document.createElement("span");
      thankDivSpan.classList.add(".thankDivSpan");
      thankDiv.innerHTML = `Thank you for your order. Redirect to the store in <span class="thankDivSpan">5</span> sec`;
      modalWindowWrap.appendChild(thankDiv);

      const startTime = new Date().getSeconds();
      setInterval(() => {
        const div = document.querySelector<HTMLElement>(".thankDivSpan");
        if (!div) return;
        div.innerText = `${5 - (new Date().getSeconds() - startTime)}`;
      }, 1000);

      setTimeout(() => {
        (window.location.href = "index.html"), thankDiv.remove();
      }, 6000);
    }
  });
}
