// import 'gsap/ScrollToPlugin';
import {TweenMax} from 'gsap/TweenMax';
import HeaderInstance from './partials/header';
import FooterInstance from './partials/footer';
import PreloaderInstance from './partials/preloader';
import Clock from './partials/clock';
import widowStore from './store/windowStore';
import {TimelineLite} from 'gsap/TimelineLite';

window.addEventListener('load', () => {

    const Header = new HeaderInstance();
    const Footer = new FooterInstance();
    const Preloader = new PreloaderInstance();
    const CustomClock = new Clock();

    Header.init();
    Footer.init();
    Preloader.init();
    CustomClock.init();

});
