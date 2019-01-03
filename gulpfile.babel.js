'use strict';

import { src, dest, watch, series, parallel } from 'gulp';
import yargs from 'yargs';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import rename from 'gulp-rename';
import gulpif from 'gulp-if';

// image
import imagemin from 'gulp-imagemin';

// css
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import cleanCss from 'gulp-clean-css';

// js
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';

// clean
import del from 'del';

// server
import browserSync from 'browser-sync';

const PRODUCTION = yargs.argv.prod;

// directory settings
const dir = {
	src: {
		root: 'src',
		css: 'src/scss',
		js: 'src/js',
		img: 'src/images'
	},
	dist: {
		root: 'dist',
		css: 'dist/scss',
		js: 'dist/js',
		img: 'dist/images'
	}
};

// Clean directory
export const clean = () => {
	return del([ dir.dist.root ]);
};

/**
 * Build Server
 */
const server = browserSync.create();
export const serve = done => {
	server.init({
		proxy: 'http://localhost/glatch-wp-starter-kit'
	});
	done();
};
export const reload = done => {
	server.reload();
	done();
};

/**
 * Minify images
 */
export const images = () => {
	return src( `${dir.src.img}/*.{jpg,jpeg,png,svg,gif}` )
		.pipe(
			plumber({ errorHandler: notify.onError( 'Error: <%= error.message %>' ) })
		)
		.pipe( gulpif( PRODUCTION, imagemin() ) )
		.pipe( dest( dir.dist.img ) );
};

/**
 * Copy files
 */
export const copy = () => {
	return src([
		'src/**/*',
		'!src/{images,js,scss}',
		'!src/{images,js,scss}/**/*'
	])
		.pipe(
			plumber({ errorHandler: notify.onError( 'Error: <%= error.message %>' ) })
		)
		.pipe( dest( dir.dist.root ) );
};

/**
 * Build CSS
 */
export const styles = () => {
	return src([ `${dir.src.css}/**/*/*.scss` ])
		.pipe(
			plumber({ errorHandler: notify.onError( 'Error: <%= error.message %>' ) })
		)
		.pipe( gulpif( ! PRODUCTION, sourcemaps.init() ) )
		.pipe( sass().on( 'error', sass.logError ) )
		.pipe( gulpif( PRODUCTION, postcss([ autoprefixer ]) ) )
		.pipe( gulpif( PRODUCTION, cleanCss() ) )
		.pipe( gulpif( ! PRODUCTION, sourcemaps.write() ) )
		.pipe( dest( dir.dist.css ) )
		.pipe( server.stream() );
};

/**
 * Build JS
 */
export const scripts = () => {
	return src( `${dir.src.js}/**/*.js` )
		.pipe(
			plumber({ errorHandler: notify.onError( 'Error: <%= error.message %>' ) })
		)
		.pipe( babel() )
		.pipe( gulpif( PRODUCTION, uglify() ) )
		.pipe( rename({ suffix: '.min' }) )
		.pipe( dest( dir.dist.js ) );
};

/**
 * Watch for changes
 */
export const watchForChanges = () => {
	watch( dir.src.css, styles );
	watch( `${dir.src.img}/*.{jpg,jpeg,png,svg,gif}`, series( images, reload ) );
	watch(
		[ 'src/**/*', '!src/{images,js,scss}', '!src/{images,js,scss}/**/*' ],
		series( copy, reload )
	);
	watch( `${dir.src.js}/**/*.js`, series( scripts, reload ) );
	watch( '**/*.php', reload );
};

/**
 * Config Task
 */
export const dev = series(
	clean,
	parallel( styles, images, copy, scripts ),
	serve,
	watchForChanges
);
export const build = series( clean, parallel( styles, images, copy, scripts ) );
export default dev;
