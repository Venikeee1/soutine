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
          let theme = this.swiper.slides[this.swiper.activeIndex].getAttribute('data-active-theme');
          if (theme === 'intro') {
            if(window.innerWidth < 1200 || window.innerHeight <= 600) {
              theme = 'light'
            } else {
              theme = 'dark'
            }
          }
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
