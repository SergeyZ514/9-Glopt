// STICKY MENU

// The sticky class is added to the navbar with JS when it reaches its scroll position
//CSS
// .sticky {
//    position: fixed;
//    top: 0;
//    width: 100%;
//    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.45);
// }

//  Add some top padding to the page content to prevent sudden quick movement (as the navigation bar gets a new position at the top of the page (position:fixed and top:0) */
// .sticky + .content {
//    padding-top: 60px;
// }

window.onscroll = function () {
   stickyMenu();
};
let navbar = document.getElementById('menu');

let sticky = navbar.offsetTop;

function stickyMenu() {
   if (
      window.pageYOffset >= sticky &&
      document.documentElement.clientWidth > 576
   ) {
      navbar.classList.add('sticky');
   } else {
      navbar.classList.remove('sticky');
   }
}
