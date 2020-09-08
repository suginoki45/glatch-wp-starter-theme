<?php
/**
 * The content single template
 *
 * @package _yourthemename
 * @author  Glatch
 */

$category = get_the_category();
?>

<article id="post-<?php the_ID(); ?>" <?php post_class( 'c-entry' ); ?>>
	<div class="inner">
		<ul class="c-meta">
			<li class="c-meta__item is-category">
				<a href="<?php echo esc_html( get_category_link( $category[0]->term_id ) ); ?>"><?php echo esc_html( $category[0]->category_nicename ); ?></a>
			</li>
			<li class="c-meta__item is-date">
				<time datetime="<?php the_time( 'Y-m-d' ); ?>"><?php the_time( 'Y.m.d' ); ?></time>
			</li>
		</ul>
		<?php the_title( '<h1 class="c-entry__heading">', '</h1>' ); ?>
		<?php
		if ( has_post_thumbnail() ) {
			?>
				<div class="c-entry__thumbnail">
					<?php echo get_the_post_thumbnail(); ?>
				</div>
			<?php
		} else {
			?>
			<div class="c-entry__thumbnail">
				<img src="<?php echo esc_url( get_theme_file_uri( '/dist/images/img_degault-thumbnail.png' ) ); ?>" alt="デフォルトのサムネイル">
			</div>
			<?php
		}
		?>
		<div class="c-entry__content">
			<?php the_content(); ?>
		</div>
	</div>
</article>
