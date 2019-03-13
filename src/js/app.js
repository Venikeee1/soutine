import 'gsap/ScrollToPlugin';
import { TweenMax } from 'gsap/TweenMax';
import Slider from './partials/internal-pages-portfolio-slider';
import { TimelineLite } from 'gsap/TimelineLite';

window.addEventListener('load', () => {
  TweenMax.to('#preloader', 0.5, {
    opacity: 0,
    display: 'none'
  });

  const slider = new Slider();
  slider.init();
});
