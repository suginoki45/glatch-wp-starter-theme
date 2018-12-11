<?php if ( is_home() || is_front_page() ) : ?>
<h1 class="c-logo">
<?php else : ?>
<p class="c-logo">
<?php endif; ?>

<a href="/"><img src="" alt=""></a>

<?php if ( is_home() || is_front_page() ) : ?>
</h1>
<?php else : ?>
</p>
<?php endif; ?>
