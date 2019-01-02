'use strict';

const gulp = require( 'gulp' );
const plumber = require( 'gulp-plumber' );
const notify = require( 'gulp-notify' );
const rename = require( 'gulp-rename' );
const gulpif = require( 'gulp-if' );
const minimist = require( 'minimist' );

// image
const imagemin = require( 'gulp-imagemin' );
const imageminJpg = require( 'imagemin-jpeg-recompress' );
const imageminPng = require( 'imagemin-pngquant' );
const imageminGif = require( 'imagemin-gifsicle' );

// css
const sass = require( 'gulp-sass' );
const sourcemaps = require( 'gulp-sourcemaps' );
const autoprefixer = require( 'gulp-autoprefixer' );

// js
const babel = require( 'gulp-babel' );
const concat = require( 'gulp-concat' );
const uglify = require( 'gulp-uglify' );

// clean
const del = require( 'del' );

// server
import browserSync from 'browser-sync';

// directory settings
const dir = {
	src: {
		css: 'src/css',
		js: 'src/js',
		img: 'src/img',
		svg: 'src/svg'
	},
	dist: {
		root: 'dist',
		css: 'dist/css',
		js: 'dist/js',
		img: 'dist/img'
	}
};

const config = {
	sassOptions: {
		includePaths: [ 'node_modules/' ],
		outputStyle: 'compressed'
	}
};

// Clean directory
gulp.task( 'clean', callback => {
	return del([ `${dir.dist.root}` ], callback );
});

/**
 * Build defaultTasks
 */
gulp.task( 'build', gulp.series( gulp.parallel( 'clean' ), 'scss', 'babel', 'img' ) );

/**
 * Build Server
 */
const server = browserSync.create();
export const serve = done => {
	server.init({
		proxy: 'http://localhost/your-folder-name'
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
gulp.task( 'img', () => {
	return gulp
		.src( `${dir.src.img}/**/*.+(jpg|jpeg|png|gif)` )
		.pipe(
			imagemin([
				imageminPng(),
				imageminJpg(),
				imageminGif({
					interlaced: false,
					optimizationLevel: 3,
					colors: 180
				})
			])
		)
		.pipe( gulp.dest( dir.dist.img ) );
});

/**
 * Build CSS
 */
gulp.task( 'scss', () => {
	return gulp
		.src([ `${dir.src.css}/**/*.scss` ])
		.pipe(
			plumber({ errorHandler: notify.onError( 'Error: <%= error.message %>' ) })
		)
		.pipe( sass( config.sassOptions ) )
		.pipe(
			autoprefixer({
				browsers: [ '.browserslistrc' ],
				sourceComments: true,
				cascade: false
			})
		)
		.pipe( sourcemaps.write( './maps/' ) )
		.pipe( gulp.dest( dir.dist.css ) )
		.pipe( server.stream() );
});

/**
 * Build JS
 */
// Babel
gulp.task( 'babel', () => {
	return gulp
		.src([ `${dir.src.js}/**/*.js` ])
		.pipe(
			plumber({ errorHandler: notify.onError( 'Error: <%= error.message %>' ) })
		)
		.pipe( babel() )
		.pipe( gulp.dest( dir.dist.js ) );
});

// Uglify
gulp.task( 'uglify', () => {
	return gulp
		.src([ `${dir.src.js}/**/*.js` ])
		.pipe(
			plumber({ errorHandler: notify.onError( 'Error: <%= error.message %>' ) })
		)
		.pipe( uglify() )
		.on( 'error', function( e ) {
			console.log( e );
		})
		.pipe( rename({ suffix: '.min' }) )
		.pipe( gulp.dest( dir.dist.js ) );
});

gulp.task( 'watch', () => {
	gulp.watch( `${dir.src.js}/**/*.js`, gulp.task( 'babel' ) );
	gulp.watch( `${dir.src.css}/**/*.scss`, gulp.task( 'scss' ) );
	gulp.watch( `${dir.src.img}/**/*.+(jpg|jpeg|png|gif)`, gulp.task( 'img' ) );
	gulp.watch( '**/*.php', gulp.task( reload ) );
});

gulp.task( 'default', gulp.parallel( 'watch' ) );
