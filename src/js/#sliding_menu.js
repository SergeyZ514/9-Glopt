// SLIDING MENU
window.addEventListener('scroll', () => {
   scroll();
});

let home = document.getElementById('home');
let about = document.getElementById('about');
let portfolio = document.getElementById('portfolio');
let contact = document.getElementById('contact');
let sections = [home, about, portfolio, contact];

function scroll() {
   sections.forEach((element) => {
      let top = element.offsetTop - 100;
      let bottom = top + element.offsetHeight;
      let id = element.getAttribute('id');
      let windowScroll = window.pageYOffset;
      if (windowScroll > top && windowScroll < bottom) {
         menuLink.forEach((element) => {
            element.classList.remove('active');
         });
         let activeRef = menu.querySelector('a[href="#' + id + '"]');
         activeRef.classList.add('active');
      }
   });
}
