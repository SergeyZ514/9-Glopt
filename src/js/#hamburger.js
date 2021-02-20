// HAMBURGER
let hamburger = document.querySelector('.hamburger');
let menu = document.querySelector('.menu');

hamburger.addEventListener('click', () => {
   hamburger.classList.toggle('active');
   menu.classList.toggle('active');
   if (hamburger.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
   } else {
      document.body.style.overflow = 'auto';
   }
});

// MENU
let menuLink = document.querySelectorAll('.menu__link');
menuLink.forEach((element) => {
   element.addEventListener('click', () => {
      if (menu.classList.contains('active')) {
         menu.classList.remove('active');
         hamburger.classList.remove('active');
         document.body.style.overflow = 'auto';
      }
   });
});
