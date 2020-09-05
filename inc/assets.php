<?php
/**
 * Function to enqueue styles and scripts
 *
 * @package _yourthemename
 * @author  Glatch
 */

if ( ! function_exists( '_yourthemename_assets' ) ) {
	/**
	 *  Enqueue styles and scripts.
	 */
	function _yourthemename_assets() {
		if ( ! is_admin() ) {
			wp_enqueue_style( '_yourthemename-style', get_theme_file_uri( '/dist/css/bundle.css' ), array(), _YOURTHEMENAME_VER );

			wp_deregister_script( 'jquery' );
			wp_enqueue_script( '_yourthemename-scripts', get_theme_file_uri( '/dist/js/bundle.min.js' ), array(), _YOURTHEMENAME_VER, true );
		}
		if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
			wp_enqueue_script( 'comment-reply' );
		}
	}
}
add_action( 'wp_enqueue_scripts', '_yourthemename_assets' );
