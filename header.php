<?php
/**
 * The Header template.
 *
 * @package   glatch-wp-starter-kit
 * @copyright Copyright (c) 2018 Glatch
 * @since     glatch-wp-starter-kit 1.0
 */

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
	<meta charset="UTF-8">
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
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<div class="l-container p-header">
		<?php get_template_part( 'tmp/site-branding' ); ?>
	<!-- /header --></div>
