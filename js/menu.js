/* ================================================================
   menu.js — Menu page interactivity
   
   FEATURES IN THIS FILE:
   1. initMenuFilter()   — filter buttons show/hide menu cards
   2. initTooltips()     — Bootstrap tooltips on menu item names
   
   WHY A SEPARATE FILE?
   Keeping page-specific JS separate from main.js means:
   - main.js stays clean (only runs on every page)
   - menu.js only loads on the menu page
   - Easier to find and edit when something breaks
================================================================ */

document.addEventListener('DOMContentLoaded', function () {

  initMenuFilter();
  initTooltips();

});


/* ----------------------------------------------------------------
   1. initMenuFilter
   
   HOW IT WORKS:
   - Each filter button has a data-filter attribute e.g. data-filter="espresso"
   - Each menu card wrapper (.menu-item) has a data-category e.g. data-category="espresso"
   - When a button is clicked, we show cards where category === filter
   - data-filter="all" shows everything
   
   CSS TRICK: We use display:none / display:block to show/hide.
   We also add a small fade animation via CSS class toggling.
---------------------------------------------------------------- */
function initMenuFilter() {
  /* Get all filter buttons and all menu item cards */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuItems  = document.querySelectorAll('.menu-item');
  const noResults  = document.querySelector('#noResults');

  /* Guard: if elements don't exist, stop (page might not have a menu) */
  if (!filterBtns.length || !menuItems.length) return;

  /* Add a click listener to each filter button */
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {

      /* 1. Update active button styling */
      filterBtns.forEach(function (b) {
        b.classList.remove('active'); /* Remove active from all */
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');   /* Add active to clicked one */
      btn.setAttribute('aria-pressed', 'true');

      /* 2. Get the filter value from the clicked button */
      /* e.g. "espresso", "cold", "all" */
      const filter = btn.getAttribute('data-filter');

      /* 3. Show or hide each menu item */
      let visibleCount = 0;

      menuItems.forEach(function (item) {
        /* Get the card's category */
        const category = item.getAttribute('data-category');

        /* Show if "all" is selected OR if category matches filter */
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';

          /* Small fade-in animation on visible cards */
          /* We remove then re-add the class to retrigger the animation */
          item.classList.remove('menu-item-visible');
          /* requestAnimationFrame waits for the next repaint — needed to retrigger CSS animation */
          requestAnimationFrame(function () {
            item.classList.add('menu-item-visible');
          });

          visibleCount++;
        } else {
          /* Hide cards that don't match */
          item.style.display = 'none';
          item.classList.remove('menu-item-visible');
        }
      });

      /* 4. Show "no results" message if nothing is visible */
      if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'flex' : 'none';
      }
    });
  });

  /* Trigger "All" on page load so everything starts visible with animation */
  menuItems.forEach(function (item) {
    item.classList.add('menu-item-visible');
  });
}


/* ----------------------------------------------------------------
   2. initTooltips
   
   Bootstrap 5 tooltips are opt-in — they don't activate automatically.
   We need to manually initialise every element with data-bs-toggle="tooltip".
   
   This is a standard Bootstrap pattern you'll use on other pages too.
---------------------------------------------------------------- */
function initTooltips() {
  /* Select all elements with the Bootstrap tooltip attribute */
  const tooltipEls = document.querySelectorAll('[data-bs-toggle="tooltip"]');

  /* Loop through each one and initialise the Bootstrap Tooltip object */
  tooltipEls.forEach(function (el) {
    new bootstrap.Tooltip(el, {
      trigger: 'hover focus', /* Show on hover (mouse) or focus (keyboard) */
    });
  });
}
