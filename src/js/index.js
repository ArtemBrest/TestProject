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
})