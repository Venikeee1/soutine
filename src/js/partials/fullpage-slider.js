import Swiper from 'swiper/dist/js/swiper';

export default class {
  constructor() {
    this.swiper = null;
    this.themeList = document.querySelectorAll("[data-theme]");
  }

  toggleTheme( themeName ) {
    const theme = themeName === 'dark' ? 'dark' : 'light';

    Array.from(this.themeList).map(elem => {
      elem.setAttribute('data-theme', theme)
    })
  }

  initSlider() {
    this.swiper = new Swiper('.fp-swiper-wrapper', {
      preventInteractionOnTransition: true,
      mousewheel: {
        releaseOnEdges: true
      },
      on: {
        slideChange: (e) => {
          const theme = this.swiper.slides[this.swiper.activeIndex].getAttribute('data-active-theme');
          this.toggleTheme(theme);
        }
      },
      direction: 'vertical'
    });
  }

  init() {
    this.initSlider();
  }

  destroy() {
    if (this.currentSwiper) {
      this.currentSwiper.destroy();
    }
  }
}
