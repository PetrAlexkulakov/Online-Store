import { showModalWindow } from "./purchase-window/startPurchaseWindow";

export function purchaseWindowClick() {
  const btnBuyNow = document.querySelector<HTMLElement>(".btn__buy-now");
  // const detailsBuyNow = document.querySelector<HTMLElement>('.details__buy-now');

  btnBuyNow?.addEventListener("click", () => {
    const cartBodyId = document.getElementById('cart');
    if (!cartBodyId) return;
    cartBodyId.id = 'cartModalWindow';
    showModalWindow();
  });
  // detailsBuyNow?.addEventListener('click', () => {
  //   localStorage.setItem('isModaleOpen', 'true');
  //   window.location.href = "./index-cart.html";
  // });
}
