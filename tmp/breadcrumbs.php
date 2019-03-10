<?php
$breadcrumbs = new Inc2734\WP_Breadcrumbs\Breadcrumbs();
$items       = $breadcrumbs->get();
?>
<div class="c-section c-breadcrumbs">
	<div class="inner">
		<ol class="c-breadcrumbs__list" itemscope itemtype="http://schema.org/BreadcrumbList">
			<?php foreach ( $items as $key => $item ) : ?>
			<li class="c-breadcrumbs__item" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
				<?php if ( empty( $item['link'] ) ) : ?>
				<span itemscope itemtype="http://schema.org/Thing" itemprop="item">
					<span itemprop="name"><?php echo esc_html( $item['title'] ); ?></span>
				</span>
				<?php elseif ( 'TOP' === $item['title'] ) : ?>
				<a itemscope itemtype="http://schema.org/Thing" itemprop="item" href="<?php echo esc_url( $item['link'] ); ?>">
					<span itemprop="name"><span class="icon-home"></span></span>
				</a>
				<?php else : ?>
				<a itemscope itemtype="http://schema.org/Thing" itemprop="item" href="<?php echo esc_url( $item['link'] ); ?>">
					<span itemprop="name"><?php echo esc_html( $item['title'] ); ?></span>
				</a>
				<?php endif; ?>
				<meta itemprop="position" content="<?php echo esc_attr( $key + 1 ); ?>" />
			</li>
			<?php endforeach; ?>
		</ol>
	</div>
</div>
