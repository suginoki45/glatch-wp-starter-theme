<?php
/**
 * The Header template.
 *
 * @package   _yourthemename
 * @copyright Copyright (c) 2018 Glatch
 * @since     _yourthemename 1.0
 */

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<header class="fd-section p-header">
		<div class="l-header">
			<?php get_template_part( 'tmp/site-branding' ); ?>
		</div>
	</header>
	<!-- /header -->
