const accordTriggers = document.querySelectorAll(".accordion__trigger"),
    accordItems = document.querySelectorAll(".accordion");

function openAccordion(activeItem, items) {
    const parent = activeItem.parentNode;

    if (parent.classList.contains("accordion-active")) {
        parent.classList.remove("accordion-active");
    } else {
        items.forEach((child) => {
            child.classList.remove("accordion-active");
        });

        parent.classList.add("accordion-active");
    }
}

accordTriggers.forEach((item) => {
    item.addEventListener("click", () => {
        openAccordion(item, accordItems);
    });
});