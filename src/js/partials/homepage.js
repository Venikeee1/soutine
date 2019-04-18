import Swiper from "swiper";

export default class {
    constructor() {
        this.menuSlider = document.querySelector('.menu-slider__list');
        this.textSliderContainer = document.querySelector('.homepage-menu__text-slider');
        this.textSlider = null;
    }

    addMenuTabs() {
        this.textSlider = new Swiper(this.textSliderContainer, {
            speed: 900,
            allowTouchMove: false,
            //effect: 'fade'
        });

        const tabs = document.querySelectorAll('.homepage-menu__tab');
        let activeTab = document.querySelector('.homepage-menu__tab--active');

        Array.from(tabs).forEach( (elem, i) => {
            elem.addEventListener('click', () => {
                activeTab.classList.remove('homepage-menu__tab--active')
                this.textSlider.slideTo(i)
                activeTab = elem;
                activeTab.classList.add('homepage-menu__tab--active')
            })
        })
    }

    addMenuSlider() {
        const mySwiper = new Swiper(this.menuSlider, {
            speed: 800,
            spaceBetween: 100,
            dots: true,
            on: {
                slideChange: () => {

                }
            },
            pagination: {
                el: '.menu-slider__pagination',
                type: 'bullets',
                clickable: true
            },
        });
    }

    init() {
        this.addMenuSlider();
        this.addMenuTabs();
    }

}
