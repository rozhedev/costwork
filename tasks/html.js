const { src, dest } = require("gulp");

const path = require("../config/path.js");
const app = require("../config/app.js");

// * Plugins

const fileInclude = require("gulp-file-include");
const htmlmin = require("gulp-htmlmin");
const size = require("gulp-size");
const webpHtml = require("gulp-webp-html");
const gulpIf = require("gulp-if");

// * HTML

const html = () => {
    return src(path.html.src)
        .pipe(fileInclude())
        .pipe(webpHtml())
        .pipe(gulpIf(app.isProd, size({
            title: "HTML before compress",
        })))
        .pipe(gulpIf(app.isProd, htmlmin(app.htmlmin)))
        .pipe(gulpIf(app.isProd, size({
            title: "HTML after compress",
        })))
        .pipe(dest(path.html.dest));
}

module.exports = html;