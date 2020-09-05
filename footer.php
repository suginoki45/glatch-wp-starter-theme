<?php
/**
 * Template for displaying the footer
 *
 * @package _yourthemename
 * @author  Glatch
 */

?>

</main>

<footer class="c-section p-footer">
	<?php if ( is_active_sidebar( 'wp-widgets-footer' ) ) { ?>
		<section class="c-section">
			<?php dynamic_sidebar( 'wp-widgets-footer' ); ?>
		</section>
	<?php } ?>
	<p class="c-copyright">
		<small>©
		<?php
			echo esc_html( gmdate( 'Y' ) );
			bloginfo( 'name' );
		?>
		</small>
	</p>
	<a class="c-pagetop" href="#pagetop">Page Top</a>
</footer>

<?php wp_footer(); ?>
</body>
</html>
