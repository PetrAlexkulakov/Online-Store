export function cartProductsClick() {
    const itemInfo = document.querySelectorAll<HTMLElement>(".item__info");
    itemInfo.forEach((item) => {
        item.addEventListener("click", goToDetailsPage);
    });
  }


function goToDetailsPage(e: Event) {
    const target = e.target as HTMLElement;
    const product = target?.closest(".cart-products__item_wrapper");
    if (product) {
      localStorage.setItem("productDetails", String(product.id));
      window.location.href = "./details.html";
    }
}