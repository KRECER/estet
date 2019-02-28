var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');
var autoprefixer = require('autoprefixer');
var minify = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
var svgstore = require('gulp-svgstore');
var rename = require('gulp-rename');
var server = require('browser-sync').create();
var run = require('run-sequence');
var del = require("del");
var sassGlob = require('gulp-sass-glob');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cheerio = require('gulp-cheerio');

gulp.task("serve", function () {
	server.init({
		server: "build/"
	});

	gulp.watch("source/sass/**/*.scss", ["style"]);
	gulp.watch("source/*.html", ["html"]);
	gulp.watch("source/js/*.js", ["script"]);
	gulp.watch("source/img/**/*", ["copy:images"]);
});


gulp.task('copy:images', function () {
	return gulp.src('source/img/**/*')
		.pipe(gulp.dest('build/img'))
		.pipe(server.stream());
});

gulp.task("copy", function () {
	return gulp.src(["source/fonts/**/*.{woff,woff2}", "source/img/**"], {
			base: "source"
		})
		.pipe(gulp.dest("build"));
});

gulp.task("images", function () {
	return gulp.src("source/img/**/*.{png,jpg,svg}")
		.pipe(imagemin([
			imagemin.optipng({
				optimizationLevel: 3
			}),
			imagemin.jpegtran({
				progressive: true
			}),
			imagemin.svgo()
		]))
		.pipe(gulp.dest("source/img"));
});

gulp.task("webp", function () {
	return gulp.src("source/img/**/*.{png,jpg}")
		.pipe(webp())
		.pipe(gulp.dest("source/img"));
});

gulp.task('style', function () {
	gulp.src('source/sass/style.scss')
		.pipe(plumber())
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(postcss([autoprefixer()]))
		.pipe(gulp.dest('build/css'))
		.pipe(minify())
		.pipe(rename('style-min.css'))
		.pipe(gulp.dest('build/css'))
		.pipe(server.stream());
});

gulp.task('script', function () {
	return gulp.src('source/js/*.js')
		.pipe(concat('main.js'))
		.pipe(gulp.dest('build/js'))
		.pipe(server.stream());
});

gulp.task("sprite", function () {
	return gulp.src("source/img/**/icon-*.svg")
		.pipe(cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill');
				$('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');
			},
			parserOptions: {
				xmlMode: true
			}
		}))
		.pipe(svgstore({
			inlineSvg: true
		}))
		.pipe(rename("sprite.svg"))
		.pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
	return gulp.src("source/*.html")
		.pipe(posthtml([include()]))
		.pipe(gulp.dest("build"))
		.pipe(server.stream());
});

gulp.task("clean", function () {
	return del("build");
});

gulp.task("build", function (done) {
	run("clean", "copy", "style", "sprite", "html", "script", done);
});