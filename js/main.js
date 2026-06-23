/* ================================================================
   BREWNAIROB I - main.js
   This file runs on every page of the site.

   HOW THIS FILE IS ORGANISED:
   1. DOMContentLoaded wrapper  — waits for HTML to fully load
   2. setCurrentYear()          — auto-updates copyright year
   3. setActiveNavLink()        — highlights the current page in nav
   4. initScrollToTop()         — floating scroll-to-top button
   5. initNavbarShrink()        — navbar shrinks on scroll

   WHY NAMED FUNCTIONS?
   Named functions are easier to read, debug, and reuse.
   Never put everything in one big anonymous function.
================================================================ */


/* ----------------------------------------------------------------
   1. DOMContentLoaded
   This event fires when the browser has finished reading the HTML.
   We wrap EVERYTHING in here to guarantee the DOM elements exist
   before we try to interact with them.
---------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function () {

  setCurrentYear();
  setActiveNavLink();
  initScrollToTop();
  initNavbarShrink();

});
/* End of DOMContentLoaded */


/* ----------------------------------------------------------------
   2. setCurrentYear
   Finds the <span id="year"> in the footer and inserts the current
   year. This means you never need to manually update "© 2025".
---------------------------------------------------------------- */
function setCurrentYear() {
  /* querySelector returns the first element matching the CSS selector */
  const yearSpan = document.querySelector('#year');

  /* Guard clause: only run if the element exists on this page */
  if (!yearSpan) return;

  /* new Date() = today. getFullYear() = e.g. 2026 */
  yearSpan.textContent = new Date().getFullYear();
}


/* ----------------------------------------------------------------
   3. setActiveNavLink
   Reads the current page's URL and adds Bootstrap's "active" class
   to the matching nav link. This highlights the current page.

   HOW IT WORKS:
   - window.location.pathname gives e.g. "/pages/about.html"
   - We find all nav links and check if their href ends with that path
---------------------------------------------------------------- */
function setActiveNavLink() {
  /* Get just the filename + folder from the URL, e.g. "about.html" */
  const path = window.location.pathname;

  /* Get all anchor tags inside the navbar */
  const navLinks = document.querySelectorAll('#mainNav .nav-link');

  navLinks.forEach(function (link) {
    /* Remove "active" from all links first (clean slate) */
    link.classList.remove('active');
    link.removeAttribute('aria-current');

    /* getAttribute('href') returns the link's href e.g. "../index.html" */
    const href = link.getAttribute('href');

    /* Check if the current URL path contains the link's filename */
    if (href && path.includes(href.replace('../', '').replace('./', ''))) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}


/* ----------------------------------------------------------------
   4. initScrollToTop
   Shows a floating button in the bottom-right corner after the user
   scrolls down 300px. Clicking it smoothly scrolls back to the top.
---------------------------------------------------------------- */
function initScrollToTop() {
  const btn = document.querySelector('#scrollTopBtn');
  if (!btn) return;

  /* window.addEventListener('scroll') fires every time the user scrolls */
  window.addEventListener('scroll', function () {
    /* scrollY = number of pixels scrolled from the top of the page */
    if (window.scrollY > 300) {
      btn.classList.add('visible');   /* Show the button */
    } else {
      btn.classList.remove('visible'); /* Hide it near the top */
    }
  });

  btn.addEventListener('click', function () {
    /* scroll to top with smooth animation */
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ----------------------------------------------------------------
   6. initNavbarShrink
   Adds a "scrolled" class to the navbar after scrolling 50px.
   CSS can then shrink the navbar's padding for a polished effect.
---------------------------------------------------------------- */
function initNavbarShrink() {
  const nav = document.querySelector('#mainNav');
  if (!nav) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}
