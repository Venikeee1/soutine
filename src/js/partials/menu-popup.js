import Swiper from "swiper";
import Dropdown from './customDropdown';

export default class {
    constructor() {
        this.el = document.querySelector('.menu-popup');
        this.menuListContainer = document.querySelector('.menu-popup__gallery');
        this.menuItems = document.querySelectorAll('.menu-popup__item');
        this.menuBtns = document.querySelectorAll('.menu-popup__btn');
        this.activeTab = document.querySelector('.menu-popup__item--active');
        this.slider = null;
        this.timeline = new TimelineMax();
        this.closeBtn = document.querySelector('.menu-popup__close');
        this.sliderSettings = {
            speed: 800,
            allowTouchMove: false,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            }
        }
    }

    addMenuSlider() {
        this.slider = new Swiper(this.menuListContainer, this.sliderSettings);
    }

    setActiveTab(index = 0, speed = this.sliderSettings.speed) {
        if(this.activeTab) {
            this.activeTab.classList.remove('menu-popup__item--active');
        }

        this.activeTab = this.menuItems[index];
        this.activeTab.classList.add('menu-popup__item--active');
        this.slider.slideTo(index, speed)
    }

    addTabsListeners() {
        Array.from(this.menuBtns).forEach( (elem, i) => {
            elem.addEventListener('click', (e) => {
                e.preventDefault();
                this.setActiveTab(i);
            })
        })
    }

    open() {
        document.querySelector('body').style.overflow = 'hidden';
        this.timeline.clear();

        this.timeline
            .to(this.el, 0, {scale: 0.5})
            .to(this.el, 0.3, { scale: 1, opacity: 1, zIndex: 10000, pointerEvents: 'auto'})
    }

    close() {
        document.querySelector('body').style.overflow = 'visible';
        this.timeline.clear();

        this.timeline
            .to(this.el, 0.3, { opacity: 0, zIndex: -1, pointerEvents: 'none'})
    }

    addCloseButtonListener() {
        this.closeBtn.addEventListener('click', this.close.bind(this));
    }

    init() {
        this.addMenuSlider();
        this.setActiveTab();
        this.addTabsListeners();
        this.addCloseButtonListener();

        new Dropdown('.menu-popup__mobile-dropdown', (i) => {
            this.slider.slideTo(i);
        });
    }
}
