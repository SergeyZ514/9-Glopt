// LANG SWITCHER
let headerLang = document.querySelector('.header__lang');
headerLang.addEventListener('click', (e) => {
   const langItems = document.querySelectorAll('.header__lang-item');
   const target = e.target;
   Array.from(langItems).forEach((langItem) => {
      langItem.classList.remove('active');
   });
   target.classList.add('active');
});