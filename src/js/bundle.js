import Hamburger from './hamburger';
const hamburger = new Hamburger(
	document.getElementById( 'js-hamburger' ),
	document.getElementById( 'js-nav-menu' )
);

hamburger.init();
