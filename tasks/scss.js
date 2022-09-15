const { src, dest } = require("gulp");

const path = require("../config/path.js");
const app = require("../config/app.js");

// * Plugins

const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const size = require("gulp-size");
const groupCssMediaQueries = require("gulp-group-css-media-queries");
const webpCss = require("gulp-webpcss");
const sass = require("gulp-sass")(require("sass"));
const gulpIf = require("gulp-if");

// * SCSS

const scss = () => {
    return src(path.scss.src, { sourcemaps: app.isDev })
        .pipe(sass())
        .pipe(webpCss())
        .pipe(autoprefixer())
        .pipe(gulpIf(app.isProd, groupCssMediaQueries()))
        .pipe(gulpIf(app.isProd, size({
            title: "CSS before compress",
        })))
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulpIf(app.isProd, csso()))
        .pipe(gulpIf(app.isProd, size({
            title: "CSS after compress",
        })))
        .pipe(dest(path.scss.dest, { sourcemaps: app.isDev }));
}

module.exports = scss;