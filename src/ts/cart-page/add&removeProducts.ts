import { dataProducts } from "../dataProducts";
import { getCartProducts } from "./cartConst";
import { changeTotalItemsAndMoney, changePromoCodeMoney } from "./changeMoney";
import { displayCartProductItems } from "./displayCart";
import { productPerPage, page, changeProductAmount } from "./changeAmount&Page";

const cartProducts = getCartProducts();

export function clickHandler(e: Event) {
  if ((e.target as HTMLElement).classList.contains("btn__add")) {
    addProducts(e.target as HTMLElement);
  } else if ((e.target as HTMLElement).classList.contains("btn__remove")) {
    removeProducts(e.target as HTMLElement);
  }
}

function addProducts(target: HTMLElement) {
  const clickedItem = target.closest(".cart-products__item_wrapper");
  const clickedItemSpan = clickedItem?.querySelector<HTMLElement>(
    ".item__number-control_count"
  );
  if (clickedItem && clickedItemSpan) {
    cartProducts.forEach((item) => {
      if (item.id === +clickedItem.id) {
        const stock = dataProducts.products[item.id - 1].stock;
        if (item.count === stock) {
          return;
        } else {
          item.count++;
        }
        clickedItemSpan.innerHTML = `${item.count}`;
        localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
      }

      changeTotalItemsAndMoney(cartProducts);
      changePromoCodeMoney();
    });
  }
}

function removeProducts(target: HTMLElement) {
  const clickedItem = target.closest(".cart-products__item_wrapper");
  const clickedItemSpan = clickedItem?.querySelector<HTMLElement>(
    ".item__number-control_count"
  );

  if (clickedItem && clickedItemSpan) {
    cartProducts.forEach((item, i) => {
      if (item.id === +clickedItem.id) {
        if (item.count === 1) {
          cartProducts.splice(i, 1);
          clickedItem.remove();
        } else {
          item.count = item.count - 1;
        }
        clickedItemSpan.innerHTML = `${item.count}`;
        localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
        changeProductAmount();
      }

      displayCartProductItems(cartProducts, productPerPage, page);
      changeTotalItemsAndMoney(cartProducts);
      changePromoCodeMoney();
    });
  }
}
