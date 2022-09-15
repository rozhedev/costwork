const { src, dest } = require("gulp");

const path = require("../config/path.js");
const app = require("../config/app.js");

// * Plugins

const newer = require("gulp-newer");
const fonter = require("gulp-fonter");
const ttf2woff2 = require("gulp-ttf2woff2");
const filter = require("gulp-filter");

// * FONTS

const fonts = () => {
    return src(path.fonts.src)
        .pipe(newer(path.fonts.dest))
        .pipe(fonter(app.fonter))
        .pipe(ttf2woff2())
        .pipe(filter(app.filter.fonts))
        .pipe(dest(path.fonts.dest));
}

module.exports = fonts;