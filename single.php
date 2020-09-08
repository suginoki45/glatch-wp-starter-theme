<?php
/**
 * The single page template
 *
 * @package _yourthemename
 * @author  Glatch
 */

get_header();
?>

<?php
while ( have_posts() ) :
	the_post();
	get_template_part( 'template-parts/content', 'single' );
endwhile;
?>

<?php get_template_part( 'template-parts/breadcrumbs' ); ?>

<?php
get_footer();
