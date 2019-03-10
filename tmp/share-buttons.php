<?php
new Inc2734\WP_Share_Buttons\Bootstrap();

add_filter(
	'inc2734_wp_share_buttons_facebook_official_button_share', function( $boolean ) {
		return true;
	}
);
?>

<ul class="c-share-buttons">
	<li class="c-share-buttons__item">
		<?php
		echo do_shortcode(
			sprintf(
				'[wp_share_buttons_%1$s type="%2$s" post_id="%3$d"]',
				'twitter',
				'official',
				get_the_ID()
			)
		);
		?>
	</li>
	<li class="c-share-buttons__item">
		<?php
		echo do_shortcode(
			sprintf(
				'[wp_share_buttons_%1$s type="%2$s" post_id="%3$d"]',
				'facebook',
				'official',
				get_the_ID()
			)
		);
		?>
	</li>
</ul>

