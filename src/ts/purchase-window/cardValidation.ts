import {
  cardDateInput,
  cardNumberInput,
  cvvInput,
} from "./startPurchaseWindow";

const cardDetails = document.querySelector(".card-details");
const cardDataImg = document.querySelector<HTMLImageElement>(".card-data__img");

export function checkCardInput(this: HTMLInputElement, e: Event) {
  const errorDiv = document.createElement("div");
  if (e.target === cardNumberInput) {
    if (this.value.length < 19 || this.value.length === 0) {
      if (cardNumberInput?.classList.contains("invalid")) return;
      errorDiv.classList.add("card-err-num");
      errorDiv.innerText = "Card number - error";
      cardDetails?.appendChild(errorDiv);
      cardNumberInput?.classList.add("invalid");
    } else {
      const errorDiv = document.querySelector(".card-err-num");
      errorDiv?.remove();
      cardNumberInput?.classList.remove("invalid");
    }
  }
  if (e.target === cardDateInput) {
    const month = +this.value.slice(0, 2);
    if (this.value.length < 5 || this.value.length === 0 || month > 12 || month < 1) {
      if (cardDateInput?.classList.contains("invalid")) return;
      errorDiv.classList.add("card-err-date");
      errorDiv.innerText = "Card valid thru - error";
      cardDetails?.appendChild(errorDiv);
      cardDateInput?.classList.add("invalid");
    } else {
      const errorDiv = document.querySelector(".card-err-date");
      errorDiv?.remove();
      cardDateInput?.classList.remove("invalid");
    }
  }
  if (e.target === cvvInput) {
    if (this.value.length < 3 || this.value.length === 0) {
      if (cvvInput?.classList.contains("invalid")) return;
      errorDiv.classList.add("card-err-cvv");
      errorDiv.innerText = "Card CVV - error";
      cardDetails?.appendChild(errorDiv);
      cvvInput?.classList.add("invalid");
    } else {
      const errorDiv = (e.target as HTMLElement)?.closest(".card-err-cvv");
      errorDiv?.remove();
      cvvInput?.classList.remove("invalid");
    }
  }
}

export function formatCardNumber(this: HTMLInputElement) {
  this.value = this.value.replace(/[^\d]/g, "").substring(0, 16);
  const resultCardNum = this.value.match(/.{1,4}/g)?.join(" ");
  if (!resultCardNum || !cardDataImg) return;
  this.value = resultCardNum;

  const typeOfPaymentSys = this.value.slice(0, 1);
  console.log(typeOfPaymentSys);

  switch (typeOfPaymentSys) {
    case "3":
      cardDataImg.src =
        "https://www.aexp-static.com/cdaas/one/statics/axp-static-assets/1.8.0/package/dist/img/logos/dls-logo-stack.svg";
      break;
    case "4":
      cardDataImg.src =
        "https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png";
      break;
    case "5":
      cardDataImg.src =
        "https://www.mastercard.hu/content/dam/public/mastercardcom/eu/hu/images/mc-logo-52.svg";
      break;
    case "6":
      cardDataImg.src =
        "https://m.unionpayintl.com/imp_file/global/wap/en/static/images/logo.png";
      break;
    default:
      cardDataImg.src =
        "https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71";
  }

  if (this.value.length === 19) {
    const errorDiv = document.querySelector(".card-err-num");
    cardNumberInput?.classList.remove("invalid");
    errorDiv?.remove();
  }
}

export function formatCardDate(this: HTMLInputElement) {
  this.value = this.value.replace(/[^\d]/g, "").substring(0, 6);
  const resultCardDate = this.value.match(/.{1,2}/g)?.join("/");
  if (!resultCardDate) return;
  this.value = resultCardDate;

  const month = +this.value.slice(0, 2);
  if (!month) return;
  if (this.value.length === 5 && month < 13 && month > 0) {
    const errorDiv = document.querySelector(".card-err-date");
    errorDiv?.remove();
    cardDateInput?.classList.remove("invalid");
  }
}

export function formatCardCvv(this: HTMLInputElement) {
  this.value = this.value.replace(/[^\d]/g, "");
  if (+this.value.length === 3) {
    const errorDiv = document.querySelector(".card-err-cvv");
    errorDiv?.remove();
    cvvInput?.classList.remove("invalid");
  }
}
