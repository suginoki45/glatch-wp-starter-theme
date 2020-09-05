<?php
/**
 * The index page template
 *
 * @package _yourthemename
 * @author  Glatch
 */

get_header();

?>

<section class="c-section">
	<div class="c-section__inner">
	<?php
	if ( have_posts() ) :
		?>
		<ul class="c-card is-column3">
			<?php
			while ( have_posts() ) :
				the_post();
				get_template_part( 'tmp/card' );
			endwhile;
			?>
		</ul>
		<?php
	endif;
	?>
	</div>
</section>

<?php
get_footer();
