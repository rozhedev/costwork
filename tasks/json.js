const { src, dest } = require("gulp");

const path = require("../config/path.js");
const app = require("../config/app.js");

// * Plugins

const fileInclude = require("gulp-file-include");
const gulpIf = require("gulp-if");

// * JSON

const json = () => {
    return src(path.json.src)
        .pipe(fileInclude())
        // .pipe(gulpIf(!app.isProd, dest(path.json.dest)))
}

module.exports = json;