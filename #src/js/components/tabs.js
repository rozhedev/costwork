

const tabsNav = document.querySelectorAll(".tabs__nav-item");
const tabsContent = document.querySelectorAll(".tabs__content-item");

function setActiveItem(e, navItems, tabs) {
    e.preventDefault();
    let activeTabAttr = e.target.getAttribute("data-tab");

    for (let j = 0; j < navItems.length; j++) {
        let contentAttr = tabs[j].getAttribute("data-tab-content");

        if (activeTabAttr === contentAttr) {
            navItems[j].classList.add("active");
            tabs[j].classList.add("active");
        } else {
            navItems[j].classList.remove("active");
            tabs[j].classList.remove("active");
        }
    }
}

for (let i = 0; i < tabsNav.length; i++) {
    tabsNav[i].addEventListener("click", function (e) {
        setActiveItem(e, tabsNav, tabsContent);
    });
}