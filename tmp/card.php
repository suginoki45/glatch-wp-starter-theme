<?php
/**
 * The card UI template
 *
 * @package _yourthemename
 * @author  Glatch
 */

$category = get_the_category();
?>
<li class="c-card__item">
	<a href="<?php the_permalink(); ?>">
		<p class="c-card__category"><?php echo esc_html( $category[0]->category_nicename ); ?></p>
		<?php
		if ( has_post_thumbnail() ) {
			?>
				<div class="c-card__thumbnail">
					<?php echo get_the_post_thumbnail(); ?>
				</div>
			<?php
		} else {
			?>
				<div class="c-card__thumbnail">
					<img src="<?php echo esc_url( get_theme_file_uri( '/dist/images/img_degault-thumbnail.png' ) ); ?>" alt="デフォルトのサムネイル">
				</div>
			<?php
		}
		?>
		<p class="c-card__date">
			<time datetime="<?php the_time( 'Y-m-d' ); ?>"><?php the_time( 'Y.m.d' ); ?></time>
		</p>
		<p class="c-card__title">
		<?php
		if ( mb_strlen( $post->post_title, 'UTF-8' ) > 40 ) {
			$post_title = mb_substr( $post->post_title, 0, 40, 'UTF-8' );
			echo esc_html( $post_title . '...' );
		} else {
			echo esc_html( $post->post_title );
		}
		?>
		</p>
	</a>
</li>
