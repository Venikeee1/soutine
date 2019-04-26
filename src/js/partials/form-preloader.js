export default class {
    constructor() {
        this.formPreloaderContainer = document.querySelector('.form-preloader');
        this.tl = new TimelineMax();
    }

    show() {
        this.tl.clear();
        this.tl.to(this.formPreloaderContainer, 0.3, {opacity: 1, pointerEvents: 'auto', zIndex: 10})
    }

    hide() {
        this.tl.clear();
        this.tl.to(this.formPreloaderContainer, 0.3, {opacity: 0, pointerEvents: 'none', zIndex: -1})
    }
}
