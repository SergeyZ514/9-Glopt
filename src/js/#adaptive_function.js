// ADAPTIVE HEADER

window.addEventListener('resize', () => {
   adaptive_function();
});

function adaptive_function() {
   let width = document.documentElement.clientWidth;
   let header = document.querySelector('.header');
   let headerMenuBlock = header.querySelector('.header__menu-block');
   let headerBottomLinks = header.querySelectorAll(
      '.header__bottom-menu-list > li'
   );
   let headerMenuList = header.querySelector('.header__menu-list');
   let header_top_link = header.querySelector('.header__top-link');
   let headerListLeft = header.querySelector('.header__bottom-menu-list_l');
   let headerListRight = header.querySelector('.header__bottom-menu-list_r');

   if (width <= 768) {
      if (!headerLang.classList.contains('adaptive')) {
         headerLang.classList.add('adaptive');
         headerMenuBlock.appendChild(headerLang);
      }
   } else {
      if (headerLang.classList.contains('adaptive')) {
         headerLang.classList.remove('adaptive');
         header.querySelector('.header__top').prepend(headerLang);
      }
   }

   if (width <= 768) {
      headerBottomLinks.forEach((element) => {
         if (!element.classList.contains('adaptive')) {
            element.classList.add('adaptive');
            headerMenuList.append(element);
         }
      });
   } else {
      let headerMenuLinks = header.querySelectorAll('.header__menu-list > li');

      for (let i = 0; i < headerMenuLinks.length; i++) {
         if (headerMenuLinks[i].classList.contains('adaptive')) {
            headerMenuLinks[i].classList.remove('adaptive');
            if (i < headerMenuLinks.length / 2) {
               headerListLeft.append(headerMenuLinks[i]);
            } else {
               headerListRight.append(headerMenuLinks[i]);
            }
         }
      }
   }

   if (width <= 576) {
      headerMenuBlock.prepend(header_top_link);
   } else {
      header.querySelector('.header__top').appendChild(header_top_link);
   }
}

adaptive_function();
