<?php
/**
 * Register navigation menus
 *
 * @package _yourthemename
 * @since 1.0.0
 * @link https://developer.wordpress.org/reference/functions/register_nav_menus/
 */

register_nav_menus(
	array(
		'global_navi' => __( 'Global Navigation', '_yourthemename' ),
		'footer_navi' => __( 'Footer Navigation', '_yourthemename' ),
	)
);
