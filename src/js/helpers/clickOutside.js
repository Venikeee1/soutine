export function clickOutside(selector, cb) {
    const body = document.querySelector('body');

    body.addEventListener('click', (e) => {
        let clickedElem = e.target;
        while (clickedElem.parentNode) {
            if(clickedElem.classList.contains(selector)) return;

            clickedElem = clickedElem.parentNode;
        }

        cb();
        return false;
    })
}
