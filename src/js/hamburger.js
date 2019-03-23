class Hamburger {
	constructor( hamburger, navMenu ) {
		this.hamburger = hamburger;
		this.navMenu = navMenu;
	}

	init() {
		this.handleEvents();
	}

	handleEvents() {
		this.hamburger.addEventListener( 'click', () => {
			this.hamburger.classList.toggle( 'is-active' );
			this.navMenu.classList.toggle( 'is-active' );
		});
	}
}

export default Hamburger;
