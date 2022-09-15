const pathSrc = "#src";
const pathDest = "z_dist";

module.exports = {
    root: pathDest,

    html: {
        src: [pathSrc + "/html/**/*.*", "!" + pathSrc + "/html/**/_*.html"],
        watch: pathSrc + "/html/**/*.*",
        dest: pathDest
    },
    scss: {
        src: pathSrc + "/scss/style.scss",
        watch: pathSrc + "/scss/**/*.scss",
        dest: pathDest + "/css"
    },
    js: {
        src: pathSrc + "/js/**/*.js",
        watch: pathSrc + "/js/**/*.js",
        dest: pathDest + "/js"
    },
    img: {
        src: pathSrc + "/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}",
        watch: pathSrc + "/img/**/*.{png,jpg,jpeg,gif,svg}",
        dest: pathDest + "/img"
    },
    fonts: {
        src: pathSrc + "/fonts/*.{eot,otf,ttf,woff,woff2,svg}",
        watch: pathSrc + "/fonts/*.{woff,woff2,svg}",
        dest: pathDest + "/fonts"
    },
    json: {
        src: pathSrc + "/json/**/*.json",
        watch: pathSrc + "/json/**/*.json",
        dest: pathDest + "/json"
    },
}