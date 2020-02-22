'use strict';

const gulp = require('gulp'),
	sass = require('gulp-sass'),
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	browserSync = require('browser-sync').create(),
	cleanCSS = require('gulp-clean-css'),
	sourcemaps = require('gulp-sourcemaps'),
	path = './assets/';

const paths = {
	styles: {
		src: path + 'sass/**/*.sass',
		dest: path + 'dist/css',
	},
}

const style = () => (
	gulp
		.src(paths.styles.src)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.on('error', sass.logError)
		.pipe(postcss([autoprefixer()]))
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(browserSync.stream())
)

const reload = (done) => {
	browserSync.reload();
	done();
}

const watch = () => {
	browserSync.init({
		server: {
			baseDir: '.',
		},
	});
	gulp.watch(paths.styles.src, style);
	gulp.watch('*.html', reload);
}

exports.watch = watch;
exports.style = style;
const build = gulp.parallel(style, watch);
gulp.task('default', build);