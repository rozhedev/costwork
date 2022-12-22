import { STATE_LIST } from "../data/values";

const tabsWrappers = document.querySelectorAll(".tabs-wrapper");

tabsWrappers.forEach((e) => {
    const tabsNavItems = e.querySelectorAll(".tabs__nav-item");
    const tabsContentItems = e.querySelectorAll(".tabs__content-item");

    for (let i = 0; i < tabsNavItems.length; i++) {
        tabsNavItems[0].click();
        tabsNavItems[i].addEventListener("click", function () {

            tabsNavItems.forEach((e) => { e.classList.remove(STATE_LIST.active) });
            tabsContentItems.forEach((e) => { e.classList.remove(STATE_LIST.active) });
            this.classList.add(STATE_LIST.active);
            tabsContentItems[i].classList.add(STATE_LIST.active);
        });
    }
});