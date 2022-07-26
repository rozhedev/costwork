import { STATE_LIST } from "../common/values";

const tabsWrappers = document.querySelectorAll(".tabs-wrapper");

tabsWrappers.forEach((e) => {
    const tabsNavItems = e.querySelectorAll(".tabs__nav-item");
    const tabsContentItems = e.querySelectorAll(".tabs__content-item");

    for (let i = 0; i < tabsNavItems.length; i++) {
        tabsNavItems[0].click();
        tabsNavItems[i].onclick = () => {
            tabsNavItems.forEach((e) => { e.classList.remove(STATE_LIST.active) });
            tabsContentItems.forEach((e) => { e.classList.remove(STATE_LIST.active) });

            tabsNavItems[i].classList.add(STATE_LIST.active);
            tabsContentItems[i].classList.add(STATE_LIST.active);
        }
    }
});