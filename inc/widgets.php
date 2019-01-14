<?php
/**
 * Register widget area.
 *
 * @package _yourthemename
 * @since 1.0.0
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */

function _yourthemename_widgets_init() {
	$config = array(
		'description'   => esc_html__( 'Add widgets here.', '_yourthemename' ),
		'before_widget' => '<section class="widget %1$s %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	);
	register_sidebar(
		array(
			'name' => esc_html__( 'Sidebar', '_yourthemename' ),
			'id'   => 'wp-widgets-sidebar',
		) + $config
	);
	register_sidebar(
		array(
			'name' => esc_html__( 'Footer', '_yourthemename' ),
			'id'   => 'wp-widgets-footer',
		) + $config
	);
}
add_action( 'widgets_init', '_yourthemename_widgets_init' );
