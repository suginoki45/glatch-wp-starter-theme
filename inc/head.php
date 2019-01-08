<?php
/**
 * Sets up content of the head element.
 */

function _youtrthemename_render_tag_in_head() {
	?>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="format-detection" content="telephone=no, email=no, address=no">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<meta property="og:title" content="">
	<meta property="og:description" content="">
	<meta property="og:url" content="">
	<meta property="og:image" content="">
	<meta property="og:site_name" content="">
	<meta property="og:type" content="">
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:creator" content="@">
	<link rel="apple-touch-icon" href="">
	<link rel="icon" href="">
	<link rel="profile" href="http://gmpg.org/xfn/11">
		<?php if ( is_singular() && pings_open( get_queried_object() ) ) : ?>
		<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<?php endif; ?>
	<?php get_template_part( 'tmp/ga' ); ?>
	<?php
}

add_action( 'wp_head', '_youtrthemename_render_tag_in_head', 1 );
