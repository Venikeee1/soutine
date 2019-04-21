import ScrollToPlugin from "gsap/ScrollToPlugin";
import WindowStore from "../store/windowStore";

export default class {
    constructor() {
        this.navContainer = document.querySelector('.header__nav-wrapper');
        this.navItemBtns = document.querySelectorAll('.header__link');
        this.navItems = document.querySelectorAll('.header__item');
        this.navItemActive = document.querySelector('.header__item--active');
        this.navMobileContainer = document.querySelector('.header__list-container');
        this.ScrollToPlugin = ScrollToPlugin;
        this.burgerBtn = document.querySelector('.header__burger-btn');
    }

    addSmoothScrollToElement() {
        Array.from(this.navItemBtns).forEach( (elem, i) => {
            elem.addEventListener('click', (e) => {
                e.preventDefault();
                const anchor = elem.getAttribute('href');
                const container = document.querySelector(anchor);
                this.navItemActive.classList.remove('header__item--active');
                this.navItemActive = this.navItems[i];
                this.navItemActive.classList.add('header__item--active');
                TweenMax.to(window, 0.4, {scrollTo: container.offsetTop});

                WindowStore.isBurgerShown() && this.closeMenu();
            })
        })
    }

    closeMenu() {
        this.navMobileContainer.classList.remove('header__list-container--active')
    }

    openMenu() {
        this.navMobileContainer.classList.add('header__list-container--active')
    }

    toggleMenu() {
        this.navMobileContainer.classList.contains('header__list-container--active')
            ? this.closeMenu()
            : this.openMenu()
    }

    addBurgerListener() {
        this.burgerBtn.addEventListener('click', this.toggleMenu.bind(this));
    }

    fixHeaderOnScroll() {
        const headerTop = this.navContainer.offsetTop;
        window.addEventListener('scroll', () => {

            const windowSrollTop = window.pageYOffset || window.scrollY;

            if(windowSrollTop >= headerTop) {
                this.navContainer.classList.add('header__nav--fixed')
            } else {
                this.navContainer.classList.remove('header__nav--fixed')
            }
        })
    }

    init() {
        this.addSmoothScrollToElement();
        this.fixHeaderOnScroll();
        this.addBurgerListener();
    }

}
