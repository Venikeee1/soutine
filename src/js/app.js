import 'gsap/ScrollToPlugin';
import { TweenMax } from 'gsap/TweenMax';
import Slider from './partials/fullpage-slider';
import canvasSpace from './partials/stars-3d';
import PortfolioSlider from './partials/portfolio-slider';
import HeaderClass from './partials/header';
import FooterClass from './partials/footer';
import PreloaderClass from './partials/preloader';
import { TimelineLite } from 'gsap/TimelineLite';

window.addEventListener('load', () => {

  const Header = new HeaderClass();
  const Footer = new FooterClass();
  const Preloader = new PreloaderClass();

  Preloader.animatePreloader();

  function setWrapperHeight() {
      document.querySelector('.homepage-swiper').style.height = window.innerHeight + 'px';
  }

  window.addEventListener('resize', setWrapperHeight)

  if(window.innerWidth < 1200 || window.innerHeight <= 600) {
    Header.changeTheme('light')
    Footer.changeTheme('light')
  }

  const slider = new Slider();
  const portfolioSlider = new PortfolioSlider();

  slider.init();
  portfolioSlider.init();

  canvasSpace('.canvas-stars');

});
