'use strict';

const gulp = require( 'gulp' );
const runSequence = require( 'run-sequence' );
const plumber = require( 'gulp-plumber' );
const notify = require( 'gulp-notify' );
const rename = require( 'gulp-rename' );
const gulpif = require( 'gulp-if' );
const minimist = require( 'minimist' );
const envSettings = {
	string: 'env',
	default: {
		env: process.env.NODE_ENV || 'development'
	}
};
const options = minimist( process.argv.slice( 2 ), envSettings );
const production = 'production' === options.env;

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
	},
	envProduction: production
};

// Clean directory
gulp.task( 'clean', callback => {
	return del([ `${dir.dist.root}` ], callback );
});

/**
 * Build defaultTasks
 */
gulp.task( 'build', [ 'clean' ], callback => {
	return runSequence([ 'scss', 'babel', 'img' ], callback );
});

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
		.pipe( gulpif( ! config.envProduction, sourcemaps.init() ) )
		.pipe( gulpif( config.envProduction, sass({ outputStyle: 'compressed' }) ) )
		.pipe( gulpif( ! config.envProduction, sass({ outputStyle: 'expanded' }) ) )
		.pipe(
			autoprefixer({
				browsers: [ '.browserslistrc' ],
				sourceComments: true,
				cascade: false
			})
		)
		.pipe( gulpif( ! config.envProduction, sourcemaps.write( './maps/' ) ) )
		.pipe( gulp.dest( dir.dist.css ) );
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

gulp.task( 'watch', [ 'img', 'scss', 'babel' ], () => {
	gulp.watch( `${dir.src.js}/**/*.js`, [ 'babel' ]);
	gulp.watch( `${dir.src.css}/**/*.scss`, [ 'scss' ]);
	gulp.watch( `${dir.src.img}/**/*.+(jpg|jpeg|png|gif)`, [ 'img' ]);
});

gulp.task( 'default', [ 'watch' ]);
