export default class {
    constructor() {
        this.btnList = document.querySelectorAll('.terms-conditions__btn');
        this.itemList = document.querySelectorAll('.terms-conditions__item');
    }

    slideDown(elem) {

    }

    addClickToItems() {
        Array.from(this.itemList).forEach(item => {
            const itemBtn = item.querySelector('.terms-conditions__btn');
            itemBtn.addEventListener('click', () => {
                this.toggleDropdown(item)
            })
        })
    }

    toggleDropdown(item) {
        const itemBtn = item.querySelector('.terms-conditions__btn');
        const container = item.querySelector('.terms-conditions__item-text');
        const tl = new TimelineMax;

        if(itemBtn.classList.contains('terms-conditions__btn--active')) {
            tl.to(container, 0.4, {height: 0,})
            itemBtn.classList.remove('terms-conditions__btn--active')
            console.log(111);
        } else {
            const container = item.querySelector('.terms-conditions__item-text');
            const containerHeight = item.querySelector('.terms-conditions__item-inner').clientHeight;
            itemBtn.classList.add('terms-conditions__btn--active')
            tl.to(container, 0.4, {height: containerHeight, onComplete: () => {
                    container.style.height = 'auto'
                }})
        }
    }

    init() {
        this.addClickToItems();
    }
}
