/* ================================================================
   BREWNAIROB I - main.js
   This file runs on every page of the site.

   HOW THIS FILE IS ORGANISED:
   1. DOMContentLoaded wrapper  — waits for HTML to fully load
   2. setCurrentYear()          — auto-updates copyright year
   3. setActiveNavLink()        — highlights the current page in nav
   4. initDarkModeToggle()      — dark/light theme switcher
   5. initScrollToTop()         — floating scroll-to-top button
   6. initNavbarShrink()        — navbar shrinks on scroll

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
  initDarkModeToggle();
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
   4. initDarkModeToggle
   Handles the dark/light mode button (added to navbar on Day 2).
   - Checks localStorage to remember the user's preference
   - Toggles the .dark-mode class on <body>
   - Saves the preference so it persists across page refreshes
---------------------------------------------------------------- */
function initDarkModeToggle() {
  /* Look for the toggle button — may not exist on every page yet */
  const toggle = document.querySelector('#darkModeToggle');
  if (!toggle) return;

  /* localStorage lets us save small pieces of data in the browser.
     It persists even when the page is refreshed or browser is closed. */
  const saved = localStorage.getItem('brewNairobi_darkMode');

  /* If the user previously chose dark mode, apply it immediately */
  if (saved === 'enabled') {
    document.body.classList.add('dark-mode');
    updateToggleIcon(toggle, true);
  }

  /* Listen for clicks on the toggle button */
  toggle.addEventListener('click', function () {
    /* classList.toggle adds the class if absent, removes it if present */
    const isDark = document.body.classList.toggle('dark-mode');

    /* Save the user's choice to localStorage */
    localStorage.setItem('brewNairobi_darkMode', isDark ? 'enabled' : 'disabled');

    /* Update the button icon to reflect the current mode */
    updateToggleIcon(toggle, isDark);
  });
}

/* Helper: changes the icon inside the dark mode button */
function updateToggleIcon(button, isDark) {
  /* If dark mode is ON, show a sun icon (to switch TO light) */
  /* If dark mode is OFF, show a moon icon (to switch TO dark) */
  const icon = button.querySelector('i');
  if (!icon) return;
  icon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
  /* Update aria-label for screen readers */
  button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}


/* ----------------------------------------------------------------
   5. initScrollToTop
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
