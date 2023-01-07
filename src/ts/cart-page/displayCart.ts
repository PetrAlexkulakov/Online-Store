import { dataProducts } from "../dataProducts";
import { CartLocalStor } from "./cartTypes";
import { productsItems } from "./cartConst";

export function displayCartProductItems(
  arrData: CartLocalStor[],
  rowPerPage: number,
  page: number
): Element | undefined {
  showNotEmptyCart();
  if (!arrData || !rowPerPage || !page || !productsItems) return;
  productsItems.innerHTML = "";
  page--;
  const start = rowPerPage * page;
  const end = start + rowPerPage;

  const paginatedCartProducts = arrData.slice(start, end);

  paginatedCartProducts.forEach((item, i) => {
    const lastElemProductImg =
      dataProducts.products[item.id - 1].images.length - 1; //индекс послед картинка
    const productImg =
      dataProducts.products[item.id - 1].images[lastElemProductImg];
    const productTitle = dataProducts.products[item.id - 1].title;
    const productDescript = dataProducts.products[item.id - 1].description;
    const productRating = dataProducts.products[item.id - 1].rating;
    const productDiscount =
      dataProducts.products[item.id - 1].discountPercentage;
    const productStock = dataProducts.products[item.id - 1].stock;
    const productPrice = dataProducts.products[item.id - 1].price;

    const cartProductItemWrap = document.createElement("div");
    cartProductItemWrap.classList.add("cart-products__item_wrapper");
    cartProductItemWrap.setAttribute("id", `${item.id}`);
    cartProductItemWrap.innerHTML = `<div class="cart-product__item">
          <div class="item__i">${page * rowPerPage + i + 1}</div>
          <div class="item__info">
              <img class="item__info_img" src="${productImg}" alt="product image">
              <div class="item__info_detail">
                  <div class="item__title">
                      <h3>${productTitle}</h3>
                  </div>
                  <div class="item__description">
                      <span>${productDescript}</span>
                  </div>
                  <div class="item__other">
                      <p>Rating: ${productRating}</p>
                      <p>Discount: ${productDiscount}%</p>
                  </div>
              </div>
          </div>
          <div class="item__number-control">
              <div class="item__stock-control">
                  <span>Stock: ${productStock}</span>
              </div>
              <div class="item__number-control_btns">
                  <button class="item__number-control_btn btn__add">+</button>
                  <span class = "item__number-control_count">${
                    item.count
                  }</span>
                  <button class="item__number-control_btn btn__remove">-</button>
              </div>
              <div class="item__price">€${productPrice}.00</div>
              </div>
          </div>`;
    productsItems?.appendChild(cartProductItemWrap);
  });
}

export function showNotEmptyCart() {
  const cartWrap = document.querySelector<HTMLElement>(".cart-wrapper");
  const emptyCart = document.querySelector<HTMLElement>(".empty-cart");
  if (!cartWrap || !emptyCart) return;
  let cartProducts: CartLocalStor[] = [];
  const localStor = localStorage.getItem("cartProducts");
  if (localStor) {
    cartProducts = JSON.parse(localStor);
  }
  if (cartProducts.length === 0) {
    cartWrap.style.display = "none";
    emptyCart.style.display = "block";
    localStorage.removeItem("cartProducts");
    localStorage.removeItem("OSpromoCodes");
  } else {
    cartWrap.style.display = "flex";
    emptyCart.style.display = "none";
  }
}
