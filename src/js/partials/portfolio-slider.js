import Swiper from 'swiper/dist/js/swiper';

export default class {
    constructor() {
        this.activeSlide = document.querySelector('.homepage-portfolio__item--active');
        this.itemList = document.querySelectorAll('.homepage-portfolio__item');
    }

    portfolioItemClick() {
        console.log(this.itemList, 213213)
        Array.from(this.itemList).forEach( elem => {
            elem.addEventListener('click', () => {
                if(this.activeSlide === elem ) return
                console.log(this.activeSlide)
                this.activeSlide.classList.remove('homepage-portfolio__item--active')
                this.activeSlide = elem
                this.activeSlide.classList.add('homepage-portfolio__item--active')
            })
        })
    }

    init() {
        this.portfolioItemClick();
    }
}
