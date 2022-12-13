import { STATE_LIST } from "../common/values";

window.onload = function () {
    document.body.classList.add(STATE_LIST.hide);
    document.body.style.overflow = 'hidden';
    window.setTimeout(function () {
        document.body.classList.add(STATE_LIST.loaded);
        document.body.classList.remove(STATE_LIST.hide);
        document.body.style.overflow = 'auto';
    }, 500);
}