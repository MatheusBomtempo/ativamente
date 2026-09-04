// mark that JS is active so the reveal styles only hide content when we can reveal it
document.documentElement.classList.add('js');

let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .nav');
let header = document.querySelector('.header');

if (menu) {
   menu.onclick = () => {
      menu.classList.toggle('fa-times');
      navbar.classList.toggle('active');
   };
}

window.onscroll = () => {
   if (menu) menu.classList.remove('fa-times');
   if (navbar) navbar.classList.remove('active');

   if (window.scrollY > 0) {
      header.classList.add('active');
   } else {
      header.classList.remove('active');
   }
};

/* ===== lightweight scroll-reveal (entrance animations) ===== */
(function () {
   // elements to animate in as they enter the viewport
   const selectors = [
      '.about .wrapper',
      '.services .box-container .box',
      '.process .box-container .box',
      '.reviews .box-container .box',
      '.footer .box-container .box',
      '.home2 .box-container .box',
      '.home2 .titulos',
      '.services .titulos',
      '.process .titulos',
      '.reviews .titulos',
      '.about .titulos'
   ];

   const targets = [];
   selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => targets.push(el));
   });

   if (!targets.length) return;

   // tag them so CSS knows their initial hidden state
   targets.forEach((el, i) => {
      el.classList.add('reveal');
      // gentle stagger within the same group of siblings
      const delayClass = 'd' + ((i % 4) + 1);
      el.classList.add(delayClass);
   });

   // no observer support → just show everything (no animation)
   if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('in-view'));
      return;
   }

   const observer = new IntersectionObserver(
      (entries, obs) => {
         entries.forEach((entry) => {
            if (entry.isIntersecting) {
               entry.target.classList.add('in-view');
               obs.unobserve(entry.target); // reveal once, then stop watching
            }
         });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
   );

   targets.forEach((el) => observer.observe(el));
})();
