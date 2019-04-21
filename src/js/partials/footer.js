import Swiper from "swiper";

export default class {
    constructor() {
        this.footerLogoSlider = document.querySelector('.soutine-properties__logos')
    }

    addIconSlider() {
        this.textSlider = new Swiper(this.footerLogoSlider, {
            speed: 900,
            spaceBetween: 50,
            loop: true,
            autoplay: true,
            pagination: {
                el: '.soutine-properties__pagination',
                type: 'bullets'
            },
        });
    }

    init() {
        this.addIconSlider();
    }
}
