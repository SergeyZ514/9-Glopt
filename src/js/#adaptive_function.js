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
   let width = document.documentElement.clientWidth; // !important;
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
