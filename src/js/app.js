// import 'gsap/ScrollToPlugin';
import {TweenMax} from 'gsap/TweenMax';
import HeaderInstance from './partials/header';
import FooterInstance from './partials/footer';
import TermsConditionsInstance from './partials/terms-conditions';
import PreloaderInstance from './partials/preloader';
import Clock from './partials/clock';
import HomepageInstance from './partials/homepage';
import widowStore from './store/windowStore';
import {TimelineLite} from 'gsap/TimelineLite';

window.addEventListener('load', () => {

    const Header = new HeaderInstance();
    const Footer = new FooterInstance();
    const Preloader = new PreloaderInstance();
    const CustomClock = new Clock();
    const Homepage = new HomepageInstance();
    const TermsConditions = new TermsConditionsInstance();

    Footer.init();
    Preloader.init();

    if (document.querySelector('[data-page]').getAttribute('data-page') === 'homepage') {
        Header.init();
        Homepage.init();
        CustomClock.init();
    }

    if (document.querySelector('[data-page]').getAttribute('data-page') === 'terms-conditions') {
        TermsConditions.init();
    }

});
