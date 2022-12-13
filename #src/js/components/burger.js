// * DEVICE CHECK

import { STATE_LIST } from "../common/values";

const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.iOS() ||
            isMobile.Opera()
        );
    }
};

// * SUBMENU

if (isMobile.any()) {
    let menuArrows = document.querySelectorAll(".menu__arrow");
    if (menuArrows.length > 0) {
        for (let index = 0; index < menuArrows.length; index++) {
            const menuArrow = menuArrows[index];
            menuArrow.addEventListener("click", function (e) {
                menuArrow.parentElement.classList.toggle(STATE_LIST.active);
            });
        }
    }
} else {
    document.body.classList.add(STATE_LIST.pc);
}

// * BURGER

const iconMenu = document.querySelector(".menu__icon");
const menuBody = document.querySelector(".menu__body");
if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle(STATE_LIST.lock);
        iconMenu.classList.toggle(STATE_LIST.active);
        menuBody.classList.toggle(STATE_LIST.active);
    });
}