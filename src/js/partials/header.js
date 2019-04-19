import ScrollToPlugin from "gsap/ScrollToPlugin";

export default class {
    constructor() {
        this.navContainer = document.querySelector('.header__nav');
        this.navItemBtns = document.querySelectorAll('.header__link');
        this.navItems = document.querySelectorAll('.header__item');
        this.navItemActive = document.querySelector('.header__item--active');
        this.ScrollToPlugin = ScrollToPlugin;
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
                TweenMax.to(window, 0.4, {scrollTo: container.getBoundingClientRect().top});
            })
        })
    }

    fixHeader () {

    }

    fixHeaderOnScroll() {
        const headerTop = this.navContainer.getBoundingClientRect().top;
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
    }

}
