import Swiper from 'swiper/dist/js/swiper';

export default class {
  constructor() {
    this.currentSwiper = null;
  }

  init() {
    const slider = new Swiper('.fp-swiper-wrapper', {
      preventInteractionOnTransition: true,
      mousewheel: {
        releaseOnEdges: true
      },
      direction: 'vertical'
    });
  }

  destroy() {
    if (this.currentSwiper) {
      this.currentSwiper.destroy();
    }
  }
}
