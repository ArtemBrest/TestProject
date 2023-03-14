"use strict";

// ** FADE IN FUNCTION **
function fadeIn(el, display) {
  el.style.opacity = 0;
  el.style.display = display || "block";

  (function fade() {
    var val = parseFloat(el.style.opacity);

    if (!((val += .1) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}

;

function fadeOut(el) {
  el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= .1) < 0.1) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

;

function isEmptyObject(obj) {
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      return false;
    }
  }

  return true;
}

window.addEventListener("load", function () {
  var header = document.getElementById("header");
  var body = document.body;
  var scrollUp = "scroll-up";
  var scrollDown = "scroll-down";
  var lastScroll = 0;
  var currentDirection;
  window.addEventListener("scroll", function () {
    var currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      body.classList.remove(scrollUp, scrollDown); //header.classList.remove("active");

      return;
    }

    var direction = currentScroll > lastScroll ? scrollDown : scrollUp;

    if (direction !== currentDirection) {
      body.classList.remove(scrollUp, scrollDown);
      body.classList.add(direction); //header.classList.add("active");

      currentDirection = direction;
    }

    lastScroll = currentScroll;
  });
  var headerBtnMenu = document.getElementById("header-btn-menu");
  var mobileMenu = document.getElementById("mobile-menu");
  var mobileMenuBtnClose = document.querySelector(".mobile-menu-btn");
  var fade = document.getElementById('fade');

  if (headerBtnMenu !== null && mobileMenu !== null && mobileMenuBtnClose !== null) {
    headerBtnMenu.addEventListener("click", function (e) {
      mobileMenu.classList.add("mobile-menu--open");
      fadeIn(fade);
    });
    mobileMenuBtnClose.addEventListener("click", function (e) {
      mobileMenu.classList.remove("mobile-menu--open");
      fadeOut(fade);
    });
    fade.addEventListener("click", function (e) {
      mobileMenu.classList.remove("mobile-menu--open");
      fadeOut(fade);
    });
  }

  var checkoutSelect = document.querySelector('.select');

  if (checkoutSelect !== null) {
    (function () {
      var selectSingleHead = checkoutSelect.querySelector('.select__head');
      var selectSingleLabels = checkoutSelect.querySelectorAll('.select-item__label');

      if (selectSingleHead !== null && selectSingleLabels !== null) {
        selectSingleHead.addEventListener('click', function () {
          if ('active' === checkoutSelect.getAttribute('data-state')) {
            checkoutSelect.setAttribute('data-state', '');
          } else {
            checkoutSelect.setAttribute('data-state', 'active');
          }
        });

        var _loop = function _loop(i) {
          selectSingleLabels[i].addEventListener('click', function (evt) {
            selectSingleHead.querySelector(".select__title").innerHTML = selectSingleLabels[i].textContent;
            checkoutSelect.setAttribute('data-state', '');
          });
        };

        for (var i = 0; i < selectSingleLabels.length; i++) {
          _loop(i);
        }
      }
    })();
  }

  var inputRange = document.getElementById("input-range");

  if (inputRange !== null) {
    inputRange.addEventListener("change", function (e) {
      e.preventDefault();
      var value = inputRange.value;
      inputRange.closest(".checkout-form-item").querySelector(".checkout-form-item__label span").innerHTML = value + " %";
    });
  }

  var input = document.getElementById('input-file');

  if (input !== null) {
    var label = input.nextElementSibling,
        labelVal = label.querySelector('.checkout-form-item-label-file__text').innerText;
    input.addEventListener('change', function (e) {
      var countFiles = '';
      if (this.files && this.files.length >= 1) countFiles = this.files.length;
      if (countFiles) label.querySelector('.checkout-form-item-label-file__text').innerText = 'Выбрано файлов: ' + countFiles;else label.querySelector('.checkout-form-item-label-file__text').innerText = labelVal;
    });
  }
});