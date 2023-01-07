import { personNameIn, phoneNumberIn, addressIn, emailIn } from "./startPurchaseWindow";

const validName = /^[^a-zа-яё]{1,}[\S]{2,}\s[^a-zа-яё]{1,}[\S]{2,}.*$/;
const validPhoneNumber = /[\\+][0-9]+/;
const validAddress = /^[\S]{5,}\s[\S]{5,}\s[\S]{5,}.*$/;
const validEmail = /^[\S]+@[\w-]+\.[A-Za-z]{2,4}$/;



export function checkPersonDateInput(this: HTMLInputElement, e: Event) {
    if (!personNameIn || !phoneNumberIn || !addressIn || !emailIn) return;
    let validValue = /0/;
    switch(this) {
                case personNameIn: {
                     validValue = validName;
                    break;
                }
                case phoneNumberIn: {
                    validValue = validPhoneNumber;
                    break;
                }
                case addressIn: {
                    validValue = validAddress;
                    break;
                }
                case emailIn: {
                    validValue = validEmail;
                    break;
                }
            }

    if (!validValue.test(this.value)) {
    if (this?.classList.contains('invalid')) return;
    this.classList.add('invalid');
    const errorDiv = document.createElement("div");
    errorDiv.classList.add("error-mes");
    errorDiv.innerText = "error";
    this.closest('.form-item')?.appendChild(errorDiv);
    } else {
        console.log(666);
        this.classList.remove('invalid');
        const target = e.target as HTMLElement;
        const err = target.nextElementSibling;
        if (err?.classList.contains('error-mes')) { err.remove();}
    }
}