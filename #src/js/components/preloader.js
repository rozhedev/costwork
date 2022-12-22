import { STATE_LIST } from "../data/values";

window.onload = function () {
    document.body.classList.add(STATE_LIST.hide);
    document.body.style.overflow = 'hidden';
    this.setTimeout(() => {
        document.body.classList.add(STATE_LIST.loaded);
        document.body.classList.remove(STATE_LIST.hide);
        document.body.style.overflow = 'auto';
    }, 500);
}