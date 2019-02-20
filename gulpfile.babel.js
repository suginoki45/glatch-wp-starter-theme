'use strict';

import { src, dest, watch, series, parallel } from 'gulp';
import yargs from 'yargs';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import rename from 'gulp-rename';
import gulpif from 'gulp-if';
import info from './package.json';
import replace from 'gulp-replace';
import zip from 'gulp-zip';

// image
import imagemin from 'gulp-imagemin';

// css
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import cleanCss from 'gulp-clean-css';
import packageImporter from 'node-sass-package-importer';

// js
import webpack from 'webpack-stream';

// clean
import del from 'del';

// server
import browserSync from 'browser-sync';

const PRODUCTION = yargs.argv.prod;

// directory settings
const paths = {
	styles: {
		src: 'src/scss/bundle.scss',
		dest: 'dist/css'
	},
	images: {
		src: 'src/images/**/*.{jpg,jpeg,png,svg,gif}',
		dest: 'dist/images'
	},
	scrips: {
		src: 'src/js/bundle.js',
		dest: 'dist/js'
	},
	other: {
		src: [ 'src/**/*', '!src/{images,js,scss}', '!src/{images,js,scss}/**/*' ],
		dest: 'dist'
	},
	package: {
		src: [
			'**/*',
			'!node_modules{,/**}',
			'!bundled{,/**}',
			'!src{,/**}',
			'!.vscode{,/**}',
			'!.babelrc',
			'!.browserslistrc',
			'!.eslintrc',
			'!.stylelintrc',
			'!.editorconfig',
			'!.gitignore',
			'!gulpfile.babel.js',
			'!package.json',
			'!package-lock.json',
			'!phpcs.xml'
		],
		dest: 'packaged'
	}
};

const sassOptions = {
	importer: packageImporter({
		extensions: [ '.scss', '.css' ]
	})
};

// Clean directory
export const clean = () => {
	return del([ 'dist' ]);
};

/**
 * Build Server
 */
const server = browserSync.create();
export const serve = done => {
	server.init({
		proxy: 'http://glatchwpstartertheme.test'
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
	return src( paths.images.src )
		.pipe(
			plumber({ errorHandler: notify.onError( 'Error: <%= error.message %>' ) })
		)
		.pipe( gulpif( PRODUCTION, imagemin() ) )
		.pipe( dest( paths.images.dest ) );
};

/**
 * Copy files
 */
export const copy = () => {
	return src( paths.other.src )
		.pipe(
			plumber({ errorHandler: notify.onError( 'Error: <%= error.message %>' ) })
		)
		.pipe( dest( paths.other.dest ) );
};

/**
 * Build CSS
 */
export const styles = () => {
	return src( paths.styles.src )
		.pipe(
			plumber({ errorHandler: notify.onError( 'Error: <%= error.message %>' ) })
		)
		.pipe( gulpif( ! PRODUCTION, sourcemaps.init() ) )
		.pipe( sass( sassOptions ).on( 'error', sass.logError ) )
		.pipe( gulpif( PRODUCTION, postcss([ autoprefixer ]) ) )
		.pipe( gulpif( PRODUCTION, cleanCss() ) )
		.pipe( gulpif( ! PRODUCTION, sourcemaps.write() ) )
		.pipe( dest( paths.styles.dest ) )
		.pipe( server.stream() );
};

/**
 * Build JS
 */
export const scripts = () => {
	return src( paths.scrips.src )
		.pipe(
			plumber({ errorHandler: notify.onError( 'Error: <%= error.message %>' ) })
		)
		.pipe(
			webpack({
				module: {
					rules: [
						{
							test: /\.js$/,
							use: {
								loader: 'babel-loader',
								options: {
									presets: []
								}
							}
						}
					]
				},
				mode: PRODUCTION ? 'production' : 'development',
				devtool: ! PRODUCTION ? 'inline-source-map' : false,
				output: {
					filename: 'bundle.js'
				}
			})
		)
		.pipe( rename({ suffix: '.min' }) )
		.pipe( dest( paths.scrips.dest ) );
};

/**
 * Build zip
 */
export const compress = () => {
	return src( paths.package.src )
		.pipe(
			gulpif(
				file => 'zip' !== file.relative.split( '.' ).pop(),
				replace( '_yourthemename', info.name )
			)
		)
		.pipe( zip( `${info.name}.zip` ) )
		.pipe( dest( 'bundled' ) );
};

/**
 * Watch for changes
 */
export const watchForChanges = () => {
	watch( 'src/scss/**/*.scss', styles );
	watch( 'src/js/**/*.js', series( scripts, reload ) );
	watch( '**/*.php', reload );
	watch( paths.images.src, series( images, reload ) );
	watch( paths.other.src, series( copy, reload ) );
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
export const bundle = series( build, compress );
export default dev;
