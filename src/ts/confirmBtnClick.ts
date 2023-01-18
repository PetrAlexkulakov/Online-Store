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
      cardNumberInput.dispatchEvent(new Event("change"));
    }
    if (cardDateInput?.value.length === 0) {
      cardDateInput.dispatchEvent(new Event("change"));
    }
    if (cvvInput?.value.length === 0) {
      cvvInput.dispatchEvent(new Event("change"));
    }
    if (personNameIn?.value.length === 0) {
      personNameIn.dispatchEvent(new Event("input"));
    }
    if (phoneNumberIn?.value.length === 0) {
      phoneNumberIn.dispatchEvent(new Event("input"));
    }
    if (addressIn?.value.length === 0) {
      addressIn.dispatchEvent(new Event("input"));
    }
    if (emailIn?.value.length === 0) {
      emailIn.dispatchEvent(new Event("input"));
    }

    const invalidInputs = document.querySelectorAll(".invalid");
    if (invalidInputs.length === 0) {
      if (!modalWindow || !modalWindowWrap) return;
      localStorage.removeItem("cartProducts");
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
        (window.location.href = "index.html");
        thankDiv.remove();
      }, 6000);
    }
  });
}
