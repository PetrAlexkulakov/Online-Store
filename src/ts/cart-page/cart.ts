import { dataProducts } from "../dataProducts";

interface CartLocalStor {
  id: number;
  count: number;
  price: number;
}

localStorage.setItem(
  "cartProducts",
  JSON.stringify([
    { id: 1, count: 1, price: 100 },
    { id: 2, count: 1, price: 200 },
    { id: 3, count: 1, price: 300 },
    { id: 4, count: 1, price: 400 },
    { id: 5, count: 1, price: 500 },
    { id: 6, count: 1, price: 600 },
    { id: 7, count: 1, price: 700 },
    { id: 8, count: 1, price: 800 },
    { id: 9, count: 1, price: 900 },
    { id: 10, count: 1, price: 1000 },
  ])
);

let cartProducts: CartLocalStor[] = [];
const localStor = localStorage.getItem("cartProducts"); //данные local storage
if (localStor) {
  cartProducts = JSON.parse(localStor);
}

const productsItems = document.querySelector(".cart-products__items"); //parent div
const productAmountInput = document.querySelector<HTMLInputElement>(
  ".products-amount__input"
); // изменяем кол-во отображаемых товаров на стр

const pageNumber = document.querySelector<HTMLElement>(".page-number");
let productPerPage = Number(productAmountInput?.value); //кол-во продуктов на стр
let pageCounts = Math.ceil(cartProducts.length / productPerPage);
let page = 1;

const pageForwardBtn = document.querySelector<HTMLElement>(".page-btn-forward");
const pageBackBtn = document.querySelector<HTMLElement>(".page-btn-back");

let itemCounts = 0;
let itemSum = 0;

productAmountInput?.addEventListener("input", changeProductAmount);
productsItems?.addEventListener("click", clickHandler); // изменяем кол-во товаров
pageForwardBtn?.addEventListener("click", changePage);
pageBackBtn?.addEventListener("click", changePage);

function changeProductAmount() {
  if (!productAmountInput) return;
  productPerPage = Number(productAmountInput.value);
  productAmountInput.setAttribute("max", `${cartProducts.length}`);
  pageCounts = Math.ceil(cartProducts.length / productPerPage);
  if (page > pageCounts) {
    if (!pageNumber) return;
    page = pageCounts;
    pageNumber.innerHTML = `${page}`;
  }
  displayCartProductItems(cartProducts, productPerPage, page);
}

function changePage(e: Event) {
  const target = e.target as HTMLElement;
  if (!pageNumber) return;
  if (target === pageForwardBtn) {
    if (page === pageCounts) return;
    page++;
    pageNumber.innerHTML = `${page}`;
  } else if (target === pageBackBtn) {
    if (page === 1) return;
    page--;
    pageNumber.innerHTML = `${page}`;
  }

  displayCartProductItems(cartProducts, productPerPage, page);
}

function displayCartProductItems(
  arrData: CartLocalStor[],
  rowPerPage: number,
  page: number
): Element | undefined {
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
                <span class = "item__number-control_count">${item.count}</span>
                <button class="item__number-control_btn btn__remove">-</button>
            </div>
            <div class="item__price">€${productPrice}.00</div>
            </div>
        </div>`;
    productsItems.appendChild(cartProductItemWrap);
  });
}

/*******************КОЛИЧЕСТВО И ОБЩАЯ СТОИМОСТЬ *****************/

const totalItems = document.querySelector<HTMLElement>(".total-items"); //общее кол-во продуктов
const totalMoney = document.querySelector<HTMLElement>(".total-money");
const headerItems = document.querySelector<HTMLElement>(
  ".header__cart__number__content"
);
const headerMoney = document.querySelector<HTMLElement>(".total-price__price");

function changeTotalItemsAndMoney(arrData: CartLocalStor[]) {
  if (!totalItems || !totalMoney || !headerItems || !headerMoney) return;
  itemCounts = 0;
  itemSum = 0;
  arrData.forEach((item) => {
    itemCounts = itemCounts + item.count;
    itemSum = itemSum + item.price * item.count;
  });

  totalItems.innerHTML = `${itemCounts}`;
  headerItems.innerHTML = `${itemCounts}`;
  totalMoney.innerHTML = `€${itemSum}`;
  headerMoney.innerHTML = `Cart total: €${itemSum}.00`;
}

/*******************КНОПКИ ДОБАВЛЕНИЯ И УДАЛЕНИЯ ТОВАРА*****************/

function clickHandler(e: Event) {
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
    });
  }
}

displayCartProductItems(cartProducts, productPerPage, page); //ПЕРВОЕ создание карточек
changeTotalItemsAndMoney(cartProducts); //ПЕРВЫЙ пересчет кол-ва и суммы
