
export default class {
    constructor() {
        this.preloaderContainer = document.querySelector('#preloader');
        this.tl = new TimelineMax();
    }

    animatePreloader() {
        console.log(this.tl)
        this.tl
            .to(this.preloaderContainer, 1.2, {x: '0%'})
            .to('.homepage', 0, {opacity: 1})
            .to(this.preloaderContainer, 1.2, {x: '100%'}, 2)
            .to('.header, .footer', 0.8, {opacity: 1})

    }
}
