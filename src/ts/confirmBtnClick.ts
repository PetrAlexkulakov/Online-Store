

export function confirmBtnClick() {
    const confirmBtn = document.querySelector<HTMLElement>('.btn__confirm');
    
    confirmBtn?.addEventListener("click", () => {
    const error = document.querySelectorAll('.invalid');
    if (error) return;
  });
}