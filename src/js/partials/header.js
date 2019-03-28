export default class {
    constructor() {
        this.headerContainer = document.querySelector('.header');
        this.themeContaineres = this.headerContainer.querySelectorAll('[data-theme]');
    }

    changeTheme(theme) {
        Array.from(this.themeContaineres).forEach( elem => {
            elem.setAttribute('data-theme', theme)
        })
    }
}
