<div class="c-toggle">
	<button type="button" class="c-hamburger" id="js-hamburger">
		<span></span>
		<span></span>
		<span></span>
	</button>
</div>
<nav class="p-global-navi">
	<?php
		wp_nav_menu(
			array(
				'theme_location' => 'global_navi',
				'container'      => false,
				'menu_class'     => 'c-nav-menu',
				'menu_id'        => 'js-nav-menu',
			)
		);
		?>
</nav>
