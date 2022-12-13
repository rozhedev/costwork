import { STATE_LIST } from "../common/values";

const accordTriggers = document.querySelectorAll(".accordion__trigger"),
    accordItems = document.querySelectorAll(".accordion");

function openAccordion(activeItem, items) {
    const parent = activeItem.parentNode;

    if (parent.classList.contains(STATE_LIST.active)) {
        parent.classList.remove(STATE_LIST.active);
    } else {
        items.forEach((child) => {
            child.classList.remove(STATE_LIST.active);
        });

        parent.classList.add(STATE_LIST.active);
    }
}

accordTriggers.forEach((item) => {
    item.addEventListener("click", () => {
        openAccordion(item, accordItems);
    });
});