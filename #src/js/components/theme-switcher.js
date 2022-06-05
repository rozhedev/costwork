const themeSwitcher = document.querySelector(".theme-switcher");
const themeSwitcherIcon = document.querySelector(".theme-switcher svg use");

const logo = document.querySelectorAll(".logo img");
const logoWebp = document.querySelectorAll('source[srcset="img/vector_img/logo.svg"]');
const mainImg = document.querySelector(".main__img");
const mainImgWebp = document.querySelector('source[srcset="../img/vector_img/main-img.svg"]');

if (themeSwitcher) {
    themeSwitcher.addEventListener("click", function (e) {
        this.classList.toggle("_dark");
        document.body.classList.toggle("_dark");

        // * IMAGE REPLACE
        themeSwitcherIcon.setAttribute("href", "img/icons/icons.svg#sun");
        mainImg.setAttribute("src", "img/vector_img/dark-main-img.svg");
        mainImgWebp.setAttribute("srcset", "../img/vector_img/dark-main-img.svg");

        for (logoItem of logo) {
            logoItem.setAttribute("src", "img/vector_img/dark-logo.svg");
        }
        for (logoWebpItem of logoWebp) {
            logoWebpItem.setAttribute("srcset", "img/vector_img/dark-logo.svg");
        }

        if (!themeSwitcher.classList.contains("_dark")) {
            themeSwitcherIcon.setAttribute("href", "img/icons/icons.svg#lune");
            mainImg.setAttribute("src", "img/vector_img/main-img.svg");
            mainImgWebp.setAttribute("srcset", "../img/vector_img/main-img.svg");

            for (logoItem of logo) {
                logoItem.setAttribute("src", "img/vector_img/logo.svg");
            }
            for (logoWebpItem of logoWebp) {
                logoWebpItem.setAttribute("srcset", "img/vector_img/logo.svg");
            }
        }
    });
}