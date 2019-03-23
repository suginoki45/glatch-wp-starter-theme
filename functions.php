<?php
/**
 * _yourthemename functions and definitions.
 *
 * @package   _yourthemename
 * @copyright Copyright (c) 2018 Glatch
 * @license   GNU General Public License v2.0
 * @since     1.0.0
 */

/**
 *  Include files.
 */
$includes = array(
	'/inc',
);
foreach ( $includes as $include ) {
	foreach ( glob( __DIR__ . $include . '/*.php' ) as $file ) {
		$template_name = str_replace( array( trailingslashit( __DIR__ ), '.php' ), '', $file );
		get_template_part( $template_name );
	}
}

/**
* Uses composer autoloader
*/
require_once get_template_directory() . '/vendor/autoload.php';

/**
 *  Theme definitions.
 */
define( '_YOURTHEMENAME_VER', '0.0.0' );
