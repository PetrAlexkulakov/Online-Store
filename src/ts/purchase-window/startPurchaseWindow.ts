const modalWindowWrap = document.querySelector<HTMLElement>(
  ".modal-window-wrapper"
);

export function showModalWindow() {
  if (!modalWindowWrap) return;
  modalWindowWrap.style.display = "flex";
}



modalWindowWrap?.addEventListener("click", hideModalWindow);

function hideModalWindow() {
  if (!modalWindowWrap) return;
  modalWindowWrap.style.display = "none";
  const cartModalWindow = document.getElementById('cartModalWindow');
  if (!cartModalWindow) return;
  cartModalWindow.id = 'cart';
}