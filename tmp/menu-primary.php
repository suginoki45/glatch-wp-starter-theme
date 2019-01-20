<nav class="p-global-navi">
	<?php
		wp_nav_menu(
			array(
				'theme_location' => 'global_navi',
				'container'      => false,
				'menu_class'     => 'fd-section c-nav-menu',
				'items_wrap'     => '<ul class="%2$s">%3$s</ul>',
			)
		);
		?>
</nav>
