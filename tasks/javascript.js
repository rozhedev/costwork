const { src, dest } = require("gulp");

const path = require("../config/path.js");
const app = require("../config/app.js");

// * Plugins

const babel = require("gulp-babel");
const gulpIf = require("gulp-if");
const webpack = require("webpack-stream");
const rename = require("gulp-rename");

// * JS

const js = () => {
    return src(path.js.src, { sourcemaps: app.isDev })
    .pipe(gulpIf(app.isProd, babel()))
    .pipe(webpack(app.webpack))
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest(path.js.dest, { sourcemaps: app.isDev }));
}

module.exports = js;