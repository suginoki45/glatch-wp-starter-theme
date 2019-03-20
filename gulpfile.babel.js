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

// svg sprite
import path from 'path';
import svgmin from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import cheerio from 'gulp-cheerio';

// css
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import cleanCss from 'gulp-clean-css';
import magicImporter from 'node-sass-magic-importer';

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
	svg: {
		src: 'src/icon/**/*.svg',
		dest: 'dist/icon'
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
			'!composer.json',
			'!composer.lock',
			'!phpcs.xml'
		],
		dest: 'packaged'
	}
};

const sassOptions = {
	importer: magicImporter()
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
 * SVG sprite
 */
export const svgsprite = () => {
	return src( paths.svg.src )
		.pipe(
			svgmin( file => {
				const prefix = path.basename(
					file.relative,
					path.extname( file.relative )
				);
				return {
					plugins: [
						{
							cleanupIDs: {
								prefix: prefix + '-',
								minify: true
							}
						}
					]
				};
			})
		)
		.pipe( svgstore({ inlineSvg: true }) )
		.pipe(
			cheerio({
				run: function( $ ) {
					$( 'svg' ).attr( 'style', 'display:none' );
				},
				parserOptions: { xmlMode: true }
			})
		)
		.pipe( dest( paths.svg.dest ) );
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
		.pipe( gulpif( PRODUCTION, postcss([ autoprefixer({ grid: true }) ]) ) )
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
	watch( paths.svg.src, series( svgsprite, reload ) );
	watch( paths.other.src, series( copy, reload ) );
};

/**
 * Config Task
 */
export const dev = series(
	clean,
	parallel( styles, images, svgsprite, copy, scripts ),
	serve,
	watchForChanges
);
export const build = series(
	clean,
	parallel( styles, images, svgsprite, copy, scripts )
);
export const bundle = series( build, compress );
export default dev;
