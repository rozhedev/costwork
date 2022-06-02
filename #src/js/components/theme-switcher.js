const themeSwitcher = document.querySelector(".theme-switcher");
const themeSwitcherIcon = document.querySelector(".theme-switcher svg use");

const logo = document.querySelector(".logo img");
const logoWebp = document.querySelector('source[srcset="img/vector_img/logo.svg"]');

if (themeSwitcher) {
    themeSwitcher.addEventListener("click", function (e) {
        this.classList.toggle("_dark");
        document.body.classList.toggle("_dark");

        // * IMAGE REPLACE
        themeSwitcherIcon.setAttribute("href", "img/icons/icons.svg#sun");
        logo.setAttribute("src", "img/vector_img/logo-dark.svg");
        logoWebp.setAttribute("srcset", "img/vector_img/logo-dark.svg");


        if (!themeSwitcher.classList.contains("_dark")) {
            themeSwitcherIcon.setAttribute("href", "img/icons/icons.svg#lune");
            logo.setAttribute("src", "img/vector_img/logo.svg");
            logoWebp.setAttribute("srcset", "img/vector_img/logo.svg");
        }
        
    });
}