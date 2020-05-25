<?php
/**
 * The Footer template.
 *
 * @package   _yourthemename
 * @copyright Copyright (c) 2018 Glatch
 * @license   GNU General Public License v2.0
 * @since     drip 1.0.0
 */

?>

<footer class="c-section p-footer">
	<?php if ( is_active_sidebar( 'wp-widgets-footer' ) ) { ?>
		<section class="c-section">
			<?php dynamic_sidebar( 'wp-widgets-footer' ); ?>
		</section>
	<?php } ?>
	<p class="c-copyright">
		<small>©
		<?php
			echo esc_html( date( 'Y' ) );
			bloginfo( 'name' );
		?>
		</small>
	</p>
	<a class="c-pagetop" href="#pagetop">Page Top</a>
</footer>

<?php wp_footer(); ?>
</body>
</html>
