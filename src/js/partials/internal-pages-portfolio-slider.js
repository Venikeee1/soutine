import Swiper from 'swiper/dist/js/swiper';

export default class {
  constructor() {
    this.currentSwiper = null;
  }

  init() {
    const slider = new Swiper('.fp-swiper-wrapper', { 
      mousewheel: true,
      direction: 'vertical'
    });
  }

  destroy() {
    if (this.currentSwiper) {
      this.currentSwiper.destroy();
    }
  }
}
