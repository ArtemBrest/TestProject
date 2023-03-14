// ** FADE IN FUNCTION **
function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        let val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};
function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0.1) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};
function isEmptyObject(obj) {
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            return false;
        }
    }
    return true;
}
window.addEventListener("load", function () {
    let header = document.getElementById("header");
    const body = document.body;
    const scrollUp = "scroll-up";
    const scrollDown = "scroll-down";
    let lastScroll = 0;
    let currentDirection;
    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0) {
            body.classList.remove(scrollUp, scrollDown);
            //header.classList.remove("active");
            return;
        }
        const direction = currentScroll > lastScroll ? scrollDown : scrollUp;
        if (direction !== currentDirection) {
            body.classList.remove(scrollUp, scrollDown);
            body.classList.add(direction);
            //header.classList.add("active");
            currentDirection = direction;
        }
        lastScroll = currentScroll;
    });

    let headerBtnMenu = document.getElementById("header-btn-menu");
    let mobileMenu = document.getElementById("mobile-menu");
    let mobileMenuBtnClose = document.querySelector(".mobile-menu-btn");
    let fade = document.getElementById('fade');
    if(headerBtnMenu !== null && mobileMenu !== null && mobileMenuBtnClose !== null){
        headerBtnMenu.addEventListener("click",function (e){
            mobileMenu.classList.add("mobile-menu--open");
            fadeIn(fade);
        })
        mobileMenuBtnClose.addEventListener("click",function (e){
            mobileMenu.classList.remove("mobile-menu--open");
            fadeOut(fade);
        })
        fade.addEventListener("click",function (e){
            mobileMenu.classList.remove("mobile-menu--open");
            fadeOut(fade);
        })
    }

    let checkoutSelect = document.querySelector('.select');
    if(checkoutSelect !== null){
        let selectSingleHead = checkoutSelect.querySelector('.select__head');
        let selectSingleLabels = checkoutSelect.querySelectorAll('.select-item__label');
        if(selectSingleHead !== null && selectSingleLabels !== null){
            selectSingleHead.addEventListener('click', () => {
                if ('active' === checkoutSelect.getAttribute('data-state')) {
                    checkoutSelect.setAttribute('data-state', '');
                } else {
                    checkoutSelect.setAttribute('data-state', 'active');
                }
            });
            for (let i = 0; i < selectSingleLabels.length; i++) {
                selectSingleLabels[i].addEventListener('click', (evt) => {
                    selectSingleHead.querySelector(".select__title").innerHTML = selectSingleLabels[i].textContent;
                    checkoutSelect.setAttribute('data-state', '');
                });
            }
        }
    }

    let inputRange = document.getElementById("input-range");
    if(inputRange !== null){
        inputRange.addEventListener("change", function (e) {
            e.preventDefault();
            let value = inputRange.value;
            inputRange.closest(".checkout-form-item").querySelector(".checkout-form-item__label span").innerHTML = value + " %";
        })
    }

    let input = document.getElementById('input-file');
    if(input !== null){
        let label = input.nextElementSibling,
            labelVal = label.querySelector('.checkout-form-item-label-file__text').innerText;
        input.addEventListener('change', function (e) {
            let countFiles = '';
            if (this.files && this.files.length >= 1)
                countFiles = this.files.length;
            if (countFiles)
                label.querySelector('.checkout-form-item-label-file__text').innerText = 'Выбрано файлов: ' + countFiles;
            else
                label.querySelector('.checkout-form-item-label-file__text').innerText = labelVal;
        });
    }
})