import Swiper from "swiper";

export default class {
    constructor() {
        this.menuSlider = document.querySelector('.menu-slider__list');
        this.textSliderContainer = document.querySelector('.homepage-menu__text-slider');
        this.textSlider = null;
        this.showMoreBtn = document.querySelector('.homepage-reservation__more-btn');
        this.showMoreText  = document.querySelector('.homepage-reservation__details');
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

    showMoreInfoForReservationOnClick() {

        this.showMoreBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleShowMore('.homepage-reservation__details')
        })

        document.querySelector('body').addEventListener('click', (e) => {
            // if(e.target.classList.contains('homepage-reservation__details')) return
            this.closeShowMore('.homepage-reservation__details')
        })
    }

    closeShowMore() {
        this.showMoreText.classList.remove('homepage-reservation__details--active');
        this.showMoreBtn.classList.remove('homepage-reservation__more-btn--active');
    }

    openShowMore() {
        this.showMoreText.classList.add('homepage-reservation__details--active');
        this.showMoreBtn.classList.add('homepage-reservation__more-btn--active');
    }

    toggleShowMore() {
        this.showMoreText.classList.contains('homepage-reservation__details--active')
            ? this.closeShowMore()
            : this.openShowMore()
    }

    init() {
        this.addMenuSlider();
        this.addMenuTabs();
        this.showMoreInfoForReservationOnClick();
    }

}

function toggleElemClass( elemClass ) {
    const elem = document.querySelector(elemClass);
    const activeClassName = `${elemClass.replace('.', '')}--active`;

    elem.classList.contains(activeClassName.replace('.'))
        ? elem.classList.remove(activeClassName)
        : elem.classList.add(activeClassName)
}
