export default function hamburgerMenu() {
	const hamburger = document.getElementById( 'js-hamburger' );
	const navMenu = document.getElementById( 'js-nav-menu' );

	hamburger.addEventListener( 'click', () => {
		hamburger.classList.toggle( 'is-active' );
		navMenu.classList.toggle( 'is-active' );
	});
}
