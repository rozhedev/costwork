const { src, dest } = require("gulp");

const path = require("../config/path.js");
const app = require("../config/app.js");

// * Plugins

const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const webp = require("gulp-webp");
const gulpIf = require("gulp-if");
const filter = require("gulp-filter");

// * IMG

const img = () => {
    return src(path.img.src)
        .pipe(src(path.img.src))
        .pipe(newer(path.img.dest))
        .pipe(gulpIf(app.isProd, imagemin(app.imagemin)))
        .pipe(webp())
        .pipe(filter(app.filter.images))
        .pipe(dest(path.img.dest))
}

module.exports = img;