import 'gsap/ScrollToPlugin';
import { TweenMax } from 'gsap/TweenMax';
import Slider from './partials/fullpage-slider';
import canvasSpace from './partials/stars-3d';
import PortfolioSlider from './partials/portfolio-slider';
import { TimelineLite } from 'gsap/TimelineLite';

window.addEventListener('load', () => {
  TweenMax.to('#preloader', 0.5, {
    opacity: 0,
    display: 'none'
  });

  function setWrapperHeight() {
      document.querySelector('.homepage-swiper').style.height = window.innerHeight + 'px';
  }

  window.addEventListener('resize', setWrapperHeight)



  const slider = new Slider();
  const portfolioSlider = new PortfolioSlider();

  slider.init();
  portfolioSlider.init();

  canvasSpace('.canvas-stars');

});
