window.addEventListener('DOMContentLoaded', () => {
  // WEBP

  function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }

  testWebP(function (support) {
    if (support == true) {
      document.querySelector('body').classList.add('webp');
    } else {
      document.querySelector('body').classList.add('no-webp');
    }
  });

  // ADAPTIVE FUNCTION

  window.addEventListener('resize', () => {
    adaptive_function();
  });

  let mainScreenList = document.querySelector('.main-screen__list');
  let sideMenu = document.querySelector('.side-menu');
  let mainScreenNav = document.querySelector('.main-screen__nav');
  let mainScreenAsk = document.querySelector('.main-screen__ask');
  let mainScreenPhone = document.querySelector('.main-screen__phone');
  let logo = document.querySelector('.main-screen__logo');
  let topColumns = document.querySelectorAll('.main-screen__top-column');
  let contactsColumn = document.querySelector('.main-screen__contacts');
  let sideMenuRow = document.querySelector('.side-menu__row');

  function adaptive_function() {
    let width = document.documentElement.clientWidth;
    if (width <= 992) {
      sideMenu.append(mainScreenList);
    } else {
      mainScreenNav.append(mainScreenList);
    }
    if (width <= 576) {
      sideMenuRow.append(mainScreenAsk);
      sideMenuRow.append(mainScreenPhone);
      sideMenu.prepend(logo);
      logo.style.position = 'absolute';
      logo.style.top = '3%';
      logo.style.left = '50%';
      logo.style.transform = 'translateX(-50%)';
    } else {
      logo.style.position = 'static';
      logo.style.top = '';
      logo.style.left = '';
      logo.style.transform = '';
      topColumns[0].append(logo);
      contactsColumn.append(mainScreenAsk, mainScreenPhone);
    }
  }

  adaptive_function();

  // HAMBURGER
  let hamburger = document.querySelector('.hamburger');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    sideMenu.classList.toggle('active');
    if (hamburger.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  });

  // MENU CLOSE
  let menuLink = document.querySelectorAll('.main-screen__link');
  menuLink.forEach((element) => {
    element.addEventListener('click', () => {
      if (sideMenu.classList.contains('active')) {
        sideMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });

  // RIPPLE BUTTONS
  [].map.call(document.querySelectorAll('[anim="ripple"]'), (el) => {
    el.addEventListener('click', (e) => {
      e = e.touches ? e.touches[0] : e;
      const r = el.getBoundingClientRect(),
        d = Math.sqrt(Math.pow(r.width, 2) + Math.pow(r.height, 2)) * 2;
      el.style.cssText = `--s: 0; --o: 1;`;
      el.offsetTop;
      el.style.cssText = `--t: 1; --o: 0; --d: ${d}; --x:${
        e.clientX - r.left
      }; --y:${e.clientY - r.top};`;
    });
  });

  // SLICK SLIDER

  $('.reviews__slider').slick({
    centerMode: true,
    arrows: true,
    dots: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    responsive: [
      {
        breakpoint: 993,
        settings: {
          centerMode: false,
          slidesToShow: 1,
        },
      },
    ],
  });

  // SMOOTH SCROLL

  const anchors = document.querySelectorAll('a[href*="#"]');

  for (let anchor of anchors) {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();

      const blockID = anchor.getAttribute('href').substr(1);

      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }

  // ASIDE BUTTON

  $(window).scroll(function () {
    if ($(this).scrollTop() > 1200) {
      $('.aside').fadeIn();
    } else {
      $('.aside').fadeOut();
    }
  });
});
