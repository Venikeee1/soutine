import widowStore from '../store/windowStore';

export default function() {
    const form = document.querySelector('.homepage-contacts__form');
    const inputs = form.querySelectorAll('.form__input');
    const header = document.querySelector('.header');

    function hideHeader() {
        header.style.opacity = 0;
        header.style.pinterEvents = 'none';
    }

    function showHeader() {
        header.style.opacity = 1;
        header.style.pinterEvents = 'auto';
    }

    function onInputFocus() {
        if (widowStore.isMobile()) {
            hideHeader()
        }
    }

    function onInputBlur() {
        if (widowStore.isMobile()) {
            showHeader()
        }
    }

    Array.from(inputs).forEach( input => {
        input.addEventListener('focus', onInputFocus);
        input.addEventListener('blur', onInputBlur);
    })
}
