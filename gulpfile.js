// Style
var styleSRC                = "./source/scss/style.scss";
var styleDestination        = "./assets/css/";

// JS Vendor
var jsVendorSRC             = ["node_modules/jquery/dist/jquery.js"];
var jsVendorDestination     = "./assets/js/";
var jsVendorFile            = "vendors";

// JS Custom
var jsCustomSRC             = "./source/js/*.js";
var jsCustomDestination     = "./assets/js/";
var jsCustomFile            = "custom";

// Images
var imagesSRC               = "./source/img/**/*.{png,jpg,gif,svg}";
var imagesDestination       = './assets/img/';

// Watch files paths
var styleWatchFiles         = "./source/scss/**/*.scss";
var vendorJSWatchFiles      = "./source/js/vendor/*.js";
var customJSWatchFiles      = "./source/js/*.js";
var projectHTMLWatchFiles    = "./**/*.html";

const AUTOPREFIXER_BROWSERS = [
  "last 2 version",
  "> 1%",
  "ie >= 9",
  "ie_mob >= 10",
  "ff >= 30",
  "chrome >= 34",
  "safari >= 7",
  "opera >= 23",
  "ios >= 7",
  "android >= 4",
  "bb >= 10"
];

var gulp         = require("gulp");

// CSS
var sass         = require("gulp-sass");
var minifycss    = require("gulp-uglifycss");
var autoprefixer = require("gulp-autoprefixer");
var mmq          = require("gulp-merge-media-queries");

// JS
var concat       = require("gulp-concat");
var uglify       = require("gulp-uglify");

// Image
var imagemin     = require("gulp-imagemin");

// Utility
var wait         = require("gulp-wait");
var rename       = require("gulp-rename");
var lineec       = require("gulp-line-ending-corrector");
var filter       = require("gulp-filter");
var sourcemaps   = require("gulp-sourcemaps");
var notify       = require("gulp-notify");
var browserSync  = require("browser-sync").create();
var reload       = browserSync.reload;



// Browser Sync
gulp.task("server", function() {
  browserSync.init({
    server: {
      baseDir: ['./'],
    },

    open: true,

    injectChanges: true
  });
});



// Styles
gulp.task("styles", function() {
  gulp
    .src(styleSRC)
    .pipe(wait(250))
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        errLogToConsole: true,
        // outputStyle: "compact",
        // outputStyle: 'compressed',
        // outputStyle: 'nested',
        outputStyle: 'expanded',
        precision: 10
      })
    )
    .on("error", console.error.bind(console))
    .pipe(sourcemaps.write({ includeContent: false }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))

    .pipe(sourcemaps.write("./"))
    .pipe(lineec())
    .pipe(gulp.dest(styleDestination))

    .pipe(filter("**/*.css"))
    .pipe(mmq({ log: true }))

    .pipe(browserSync.stream())

    .pipe(rename({ suffix: ".min" }))
    .pipe(
      minifycss({
        maxLineLen: 10
      })
    )
    .pipe(lineec())
    .pipe(gulp.dest(styleDestination))

    .pipe(filter("**/*.css"))
    .pipe(browserSync.stream())
    .pipe(notify({ message: 'TASK: "styles" Completed! 💯', onLast: true }));
});



// Vendor JS
gulp.task("vendorsJs", function() {
  gulp
    .src(jsVendorSRC)
    .pipe(concat(jsVendorFile + ".js"))
    .pipe(lineec())
    .pipe(gulp.dest(jsVendorDestination))
    .pipe(
      rename({
        basename: jsVendorFile,
        suffix: ".min"
      })
    )
    .pipe(uglify())
    .pipe(lineec())
    .pipe(gulp.dest(jsVendorDestination))
    .pipe(notify({ message: 'TASK: "vendorsJs" Completed! 💯', onLast: true }));
});



// Custom JS
gulp.task("customJS", function() {
  gulp
    .src(jsCustomSRC)
    .pipe(concat(jsCustomFile + ".js"))
    .pipe(lineec())
    .pipe(gulp.dest(jsCustomDestination))
    .pipe(
      rename({
        basename: jsCustomFile,
        suffix: ".min"
      })
    )
    .pipe(uglify())
    .pipe(lineec())
    .pipe(gulp.dest(jsCustomDestination))
    .pipe(notify({ message: 'TASK: "customJs" Completed! 💯', onLast: true }));
});



// Images
gulp.task("images", function() {
  gulp
    .src(imagesSRC)
    .pipe(
      imagemin({
        progressive: true,
        optimizationLevel: 5,
        interlaced: true,
        svgoPlugins: [{ removeViewBox: false }]
      })
    )
    .pipe(gulp.dest(imagesDestination))
    .pipe(notify({ message: 'TASK: "images" Completed! 💯', onLast: true }));
});



// Default
gulp.task("default", ["styles", "vendorsJs", "customJS", "images", "server"], function() {
    gulp.watch(styleWatchFiles, ["styles"]);
    gulp.watch(projectHTMLWatchFiles, reload);
    gulp.watch(vendorJSWatchFiles, ["vendorsJs", reload]);
    gulp.watch(customJSWatchFiles, ["customJS", reload]);
  }
);
