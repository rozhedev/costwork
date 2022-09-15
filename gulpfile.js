const { watch, series, parallel } = require("gulp");

const path = require("./config/path.js");
const app = require("./config/app.js");

// * Tasks

const browserSync = require("browser-sync").create();
const clear = require("./tasks/clear.js");
const html = require("./tasks/html.js");
const scss = require("./tasks/scss.js");
const js = require("./tasks/javascript.js");
const img = require("./tasks/img.js");
const fonts = require("./tasks/fonts.js");
const json = require("./tasks/json.js");

// * Browser-sync

const server = () => {
    browserSync.init({
        server: {
            baseDir: path.root,
        },
        notify: false,
        // tunnel: 'diploma-costwork', // Attempt to use the URL http://yanki-test.loca.lt
    });
}

// * Watcher

const watcher = () => {
    watch(path.html.watch, html).on("all", browserSync.reload);
    watch(path.scss.watch, scss).on("all", browserSync.reload);
    watch(path.js.watch, js).on("all", browserSync.reload);
    watch(path.img.watch, img).on("all", browserSync.reload);
    watch(path.fonts.watch, fonts).on("all", browserSync.reload);
    watch(path.json.watch, json).on("all", browserSync.reload);
}

// * Build

const build = series(
    clear,
    parallel(html, scss, js, img, fonts, json),
);

const dev = series(
    build,
    parallel(watcher, server),
);

// * Tasks

exports.html = html
exports.scss = scss
exports.js = js
exports.img = img
exports.fonts = fonts
exports.fonts = json

// * Dev Build

exports.default = app.isProd ? build : dev;