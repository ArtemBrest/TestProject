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

  var anchorLinks = function anchorLinks(id) {
    if (id != "#") {
      var point = document.querySelector(id);

      if (point) {
        point.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      if (link.classList.contains("mobile-menu-list__link")) {
        document.querySelectorAll('a[href^="#"]').forEach(function (link) {
          if (link.classList.contains("mobile-menu-list__link")) {
            link.closest('.mobile-menu-list__item').classList.remove("mobile-menu-list__item--active");
          }
        });
        link.closest('.mobile-menu-list__item').classList.add("mobile-menu-list__item--active");

        if (mobileMenu !== null && fade !== null) {
          mobileMenu.classList.remove("mobile-menu--open");
          fadeOut(fade);
        }
      } else if (link.classList.contains("header-menu__link")) {
        document.querySelectorAll('a[href^="#"]').forEach(function (link) {
          if (link.classList.contains("header-menu__link")) {
            link.closest('.header-menu__item').classList.remove("header-menu__item--active");
          }
        });
        link.closest('.header-menu__item').classList.add("header-menu__item--active");
      }

      var id = e.currentTarget.getAttribute('href');
      anchorLinks(id);
    });
  });
});