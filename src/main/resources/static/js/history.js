const btnUp = {
    el: document.querySelector('.btn-up'),
    show() {
        this.el.classList.remove('btn-up_hide');
    },
    hide() {
        this.el.classList.add('btn-up_hide');
    },
    addEventListener() {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            scrollY > 1000 ? this.show() : this.hide();
        });
        document.querySelector('.btn-up').onclick = () => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    }
}
btnUp.addEventListener();

document.addEventListener('scroll', function() {
    var fixedElement = document.querySelector('.btn-up');
    var stopContainer = document.querySelector('.bottom-info');

    var stopPosition = stopContainer.offsetTop;

    if (window.pageYOffset + window.innerHeight >= stopPosition) {
        fixedElement.style.position = 'absolute';
        fixedElement.style.top = stopPosition - fixedElement.offsetHeight - 30 + 'px';
    } else {
        fixedElement.style.position = 'fixed';
        fixedElement.style.bottom = '30px';
        fixedElement.style.top = 'auto';
    }
});