<?php

if ( ! function_exists( '_yourthemename_assets' ) ) {
	/**
	 *  Enqueue styles and scripts.
	 */
	function _yourthemename_assets() {
		if ( ! is_admin() ) {
			wp_enqueue_style( 'fontawesome-style', 'https://use.fontawesome.com/releases/v5.0.13/css/all.css', array(), _YOURTHEMENAME_VER );
			wp_enqueue_style( '_yourthemename-style', get_theme_file_uri() . '/dist/css/bundle.css', array(), _YOURTHEMENAME_VER );

			wp_deregister_script( 'jquery' );
			// wp_enqueue_script( 'jquery', 'https://cdn.jsdelivr.net/npm/jquery@3.3.1/dist/jquery.min.js', array(), '3.3.1', true );
			// wp_enqueue_script( '_yourthemename-scripts', get_theme_file_uri() . '/dist/js/bundle.js', array( 'jquery' ), _YOURTHEMENAME_VER, true );
		}
		if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
			wp_enqueue_script( 'comment-reply' );
		}
	}
}
add_action( 'wp_enqueue_scripts', '_yourthemename_assets' );
