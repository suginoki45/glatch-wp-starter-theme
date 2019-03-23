<?php
/**
 * The Single Page template.
 *
 * @package   _yourthemename
 * @copyright Copyright (c) 2018 Glatch
 * @license   GNU General Public License v2.0
 * @since     _yourthemename 1.0.0
 */

get_header();
?>
<main class="c-main">
<?php
while ( have_posts() ) {
	the_post();
	get_template_part( 'tmp/content', 'single' );
}
?>
</main>

<?php get_template_part( 'tmp/breadcrumbs' ); ?>

<?php
get_footer();
