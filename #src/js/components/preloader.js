import { STATE_LIST, COMMON_VALUES } from "../data/values";
import { checkScreenWidth } from "../common/helpers";

window.onload = function () {
    document.body.classList.add(STATE_LIST.hide);
    document.body.style.overflow = 'hidden';
    this.setTimeout(() => {
        document.body.classList.add(STATE_LIST.loaded);
        document.body.classList.remove(STATE_LIST.hide);
        document.body.style.overflow = 'auto';
    }, 500);
}

// * Show little screen tip on pages which contain tables
const messageTip = document.querySelector(".message-tip");
if (messageTip) {
    document.addEventListener("DOMContentLoaded", (e) => {
        checkScreenWidth(messageTip, COMMON_VALUES.screenTipNum);
    });
}