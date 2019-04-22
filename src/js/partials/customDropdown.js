import { clickOutside } from "../helpers/clickOutside";

export default class {
    constructor( selector, cb ) {
        this.container = document.querySelector(selector);
        this.selectorBtn = this.container.querySelector('.mobile-select__current-val');
        this.menuVariantsContainer = this.container.querySelector('.mobile-select__list');
        this.menuVariantsItems = this.container.querySelectorAll('.mobile-select__item');
        this.selectedText = this.container.querySelector('.mobile-select__main');
        this.tl = new TimelineMax();
        this.isOpen = false;
        this.callBack = cb;

        this.init();
    }

    addDropDownListeners() {
        this.menuVariantsItems.forEach( (btn, i) => {
            btn.addEventListener('click', () => {
                this.selectedText.textContent = btn.textContent;
                this.close();
                this.callBack(i);
            })
        })
    }

    addListenerToOpenButton() {
        this.selectorBtn.addEventListener('click', this.toggle.bind(this))
    }

    open() {
        if(this.isOpen === true) return
        this.isOpen = true
        this.tl.clear()
        this.tl.to(this.menuVariantsContainer, 0.3, {opacity: 1, pointerEvents: 'auto', zIndex: 5})
    }

    close() {
        if(this.isOpen === false) return
        this.isOpen = false
        this.tl.clear()
        this.tl.to(this.menuVariantsContainer, 0.2, {opacity: 0, pointerEvents: 'none', zIndex: 0})
    }

    toggle() {
        this.isOpen ? this.close() : this.open()
    }

    init() {
        this.addDropDownListeners();
        this.addListenerToOpenButton();

        clickOutside('mobile-select', this.close.bind(this))
    }

}
