<?php
/**
 * Function to set up content width
 *
 * @package _yourthemename
 * @author  Glatch
 */

if ( ! function_exists( '_yourthemename_content_width' ) ) {
	/**
	 * Set the content width in pixels, based on the theme's design and stylesheet.
	 *
	 * @global int $content_width
	 */
	function _yourthemename_content_width() {
		$GLOBALS['content_width'] = apply_filters( '_yourthemename_content_width', 730 );
	}
}
add_action( 'after_setup_theme', '_yourthemename_content_width', 0 );
