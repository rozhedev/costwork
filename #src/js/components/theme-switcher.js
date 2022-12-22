import { STATE_LIST } from "../data/values";

const ATTR_LIST = {
    src: "src",
    srcset: "srcset",
    href: "href",
}

const IMG_PATHS = {
    light: {
        switch: "img/icons/icons.svg#lune",
        logo: "img/vector_img/logo.svg",
        hero: "../img/vector_img/main-img.svg",
        mockup: "../img/photos/light-mockup.png",
        mockupWebp: "../img/photos/light-mockup.webp",
    },
    dark: {
        switch: "img/icons/icons.svg#sun",
        logo: "img/vector_img/dark-logo.svg",
        hero: "../img/vector_img/dark-main-img.svg",
        mockup: "../img/photos/dark-mockup.png",
        mockupWebp: "../img/photos/dark-mockup.webp",
    },
}

const IMG_ELEM = {
    hero: document.querySelector(".main__img"),
    heroWebp: document.querySelector('source[srcset="../img/vector_img/main-img.svg"]'),
    mockup: document.querySelector(".about__img"),
    mockupWebp: document.querySelector('source[srcset="../img/photos/light-mockup.webp"]'),
    themeSwitcher: document.querySelector(".theme-switcher svg use"),
    nodes: {
        logo: document.querySelectorAll(".logo img"),
        logoWebp: document.querySelectorAll('source[srcset="img/vector_img/logo.svg"]'),
    },
}
const themeSwitcher = document.querySelector(".theme-switcher");


function replaceImages(nodeList, attr, attrValue) {
    for (let item of nodeList) {
        item.setAttribute(attr, attrValue);
    }
}

function replaceImg(img, attr, attrValue) {
    if (img) {
        img.setAttribute(attr, attrValue);
    }
}

if (themeSwitcher) {
    themeSwitcher.addEventListener("click", function () {
        this.classList.toggle(STATE_LIST.setTheme);
        document.body.classList.toggle(STATE_LIST.setTheme);
        IMG_ELEM.themeSwitcher.setAttribute(ATTR_LIST.href, IMG_PATHS.dark.switch);

        replaceImages(IMG_ELEM.nodes.logo, ATTR_LIST.src, IMG_PATHS.dark.logo);
        replaceImages(IMG_ELEM.nodes.logoWebp, ATTR_LIST.srcset, IMG_PATHS.dark.logo);

        replaceImg(IMG_ELEM.hero, ATTR_LIST.src, IMG_PATHS.dark.hero);
        replaceImg(IMG_ELEM.heroWebp, ATTR_LIST.srcset, IMG_PATHS.dark.hero);
        replaceImg(IMG_ELEM.mockup, ATTR_LIST.src, IMG_PATHS.dark.mockup);
        replaceImg(IMG_ELEM.mockupWebp, ATTR_LIST.srcset, IMG_PATHS.dark.mockupWebp);

        if (!this.classList.contains(STATE_LIST.setTheme)) {
            IMG_ELEM.themeSwitcher.setAttribute(ATTR_LIST.href, IMG_PATHS.light.switch);

            replaceImages(IMG_ELEM.nodes.logo, ATTR_LIST.src, IMG_PATHS.light.logo);
            replaceImages(IMG_ELEM.nodes.logoWebp, ATTR_LIST.srcset, IMG_PATHS.light.logo);

            replaceImg(IMG_ELEM.hero, ATTR_LIST.src, IMG_PATHS.light.hero);
            replaceImg(IMG_ELEM.heroWebp, ATTR_LIST.srcset, IMG_PATHS.light.hero);
            replaceImg(IMG_ELEM.mockup, ATTR_LIST.src, IMG_PATHS.light.mockup);
            replaceImg(IMG_ELEM.mockupWebp, ATTR_LIST.srcset, IMG_PATHS.light.mockupWebp);
        }
    });
}