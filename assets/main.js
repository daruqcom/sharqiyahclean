document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  var scrollY = 0;

  function lockBodyScroll() {
    scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = (-scrollY) + 'px';
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
  }

  function unlockBodyScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollY);
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) {
        lockBodyScroll();
      } else {
        unlockBodyScroll();
      }
    });
  }

  var isMobile = function () { return window.innerWidth <= 900; };
  document.querySelectorAll('.dropdown-toggle').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var li = btn.closest('.has-dropdown');
      var wasOpen = li.classList.contains('open');
      document.querySelectorAll('.main-nav li.has-dropdown.open').forEach(function (el) { el.classList.remove('open'); });
      if (!wasOpen) {
        li.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      } else {
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Closing the menu via a nav link (navigating away) should also release the scroll lock
  // immediately, rather than leaving the body pinned while the new page loads.
  if (nav) {
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (nav.classList.contains('open') && !link.closest('.has-dropdown')) {
          unlockBodyScroll();
        }
      });
    });
  }
});
