import ScrollToPlugin from "gsap/ScrollToPlugin";
import WindowStore from "../store/windowStore";

export default class {
    constructor() {
        this.navContainer = document.querySelector('.header__nav--sticky');
        this.navItemBtns = document.querySelectorAll('.header__link');
        this.navItems = document.querySelectorAll('.header__item');
        this.navItemActive = document.querySelector('.header__item--active');
        this.navMobileContainer = document.querySelector('.header__list-container');
        this.ScrollToPlugin = ScrollToPlugin;
        this.burgerBtn = document.querySelector('.header__burger-btn');
    }

    addSmoothScrollToElement() {
        Array.from(this.navItemBtns).forEach( (elem, i) => {
            const anchor = elem.getAttribute('href');
            const navId = anchor.replace('#', '');
            this.navItems[i].setAttribute('data-nav', navId);

            elem.addEventListener('click', (e) => {
                e.preventDefault();

                const container = document.querySelector(anchor);
                this.navItemActive.classList.remove('header__item--active');
                this.navItemActive = this.navItems[i];
                this.navItemActive.classList.add('header__item--active');
                TweenMax.to(window, 0.4, {scrollTo: container.offsetTop});

                WindowStore.isBurgerShown() && this.closeMenu();
            })
        })
    }

    scrollSpy() {
        const sections = Array.from(document.querySelectorAll('[data-section]')).reverse();

        window.addEventListener('scroll', () => {
            for ( let i = 0; i < sections.length; i++) {
                const windowSrollTop = window.pageYOffset || window.scrollY;
                const top = sections[i].offsetTop;

                if( windowSrollTop >= top - 200 ) {
                    this.navItemActive.classList.remove('header__item--active');
                    const activeSectionName = sections[i].getAttribute('data-section');
                    this.navItemActive = document.querySelector(`[data-nav=${activeSectionName}]`);
                    this.navItemActive.classList.add('header__item--active');

                    break;
                }
            }
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
        const headerTop = document.querySelector('.header__nav-wrapper').offsetTop;

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
        this.scrollSpy();
    }

}
