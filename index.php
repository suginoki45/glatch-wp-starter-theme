<?php
/**
 * The Index Page template.
 *
 * @package   _yourthemename
 * @copyright Copyright (c) 2018 Glatch
 * @license   GNU General Public License v2.0
 * @since     _yourthemename 1.0.0
 */

get_header();

?>

<main>
	<section class="c-section">
		<div class="c-section__inner">
		<?php
		$args      = array(
			'posts_per_page'   => 3,
		);
		$the_query = new WP_Query( $args );
		?>
		<?php
		if ( $the_query->have_posts() ) {
			?>
		<ul class="c-card is-column3">
			<?php
			while ( $the_query->have_posts() ) {
				$the_query->the_post();
				get_template_part( 'tmp/card' );
			}
			?>
		</ul>
			<?php
			wp_reset_postdata();
		}
		?>
		</div>
	</section>
</main>

<?php
get_footer();
