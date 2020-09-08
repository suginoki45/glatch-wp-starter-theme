<?php
/**
 * Template for displaying the header
 *
 * @package _yourthemename
 * @author  Glatch
 */

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<?php wp_body_open(); ?>
	<header class="c-section p-header">
		<div class="l-header">
			<?php get_template_part( 'template-parts/site-branding' ); ?>
		</div>
	</header>
	<?php get_template_part( 'template-parts/menu', 'primary' ); ?>
	<!-- /header -->
	<?php get_template_part( 'template-parts/hero' ); ?>

	<main>
