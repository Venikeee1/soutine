// import 'gsap/ScrollToPlugin';
import {TweenMax} from 'gsap/TweenMax';
import HeaderInstance from './partials/header';
import FooterInstance from './partials/footer';
import PreloaderInstance from './partials/preloader';
import widowStore from './store/windowStore';
import {TimelineLite} from 'gsap/TimelineLite';

window.addEventListener('load', () => {

    const Header = new HeaderInstance();
    const Footer = new FooterInstance();
    const Preloader = new PreloaderInstance();

    Header.init();
    Footer.init();
    Preloader.init();

});
