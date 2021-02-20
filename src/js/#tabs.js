// TABS

window.addEventListener('DOMContentLoaded', function () {
   'use strict';
   let tabNavs = document.querySelectorAll('.portfolio__tab');
   let tabPanels = document.querySelectorAll('.portfolio__item');

   for (let i = 0; i < tabNavs.length; i++) {
      tabNavs[i].addEventListener('click', function (e) {
         e.preventDefault();
         let activeTabAttr = e.target.getAttribute('data-tab');

         if (!e.target.classList.contains('active')) {
            tabNavs.forEach((element) => {
               element.classList.remove('active');
            });
            e.target.classList.add('active');
         }
         tabPanels.forEach((element) => {
            let contentAttr = element.getAttribute('data-tab-content');
            if (activeTabAttr === contentAttr && activeTabAttr !== 'all') {
               element.classList.add('active');
            } else if (activeTabAttr === 'all') {
               element.classList.add('active');
            } else {
               element.classList.remove('active');
            }
         });
      });
   }
});
