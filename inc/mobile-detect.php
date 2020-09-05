<?php
/**
 * Function to check if the accessed device is mobile
 *
 * @package greenspoon-magazine
 * @author  Glatch
 */

/**
 * Function to check if the accessed device is mobile.
 *
 * @return string
 */
function mobile_detect() {
	if ( isset( $_SERVER['HTTP_USER_AGENT'] ) ) {
		$ua = wp_unslash( $_SERVER['HTTP_USER_AGENT'] );
	}

	if (
		( strpos( $ua, 'Android' ) !== false ) && ( strpos( $ua, 'Mobile' ) !== false ) ||
		( strpos( $ua, 'iPhone' ) !== false ) ||
		( strpos( $ua, 'Windows Phone' ) !== false )
	) {
		return 'mobile';
	} elseif ( ( strpos( $ua, 'Android' ) !== false ) ||
		( strpos( $ua, 'iPad' ) !== false )
	) {
		return 'tablet';
	} else {
		return 'desktop';
	}
}
