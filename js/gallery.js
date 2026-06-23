/* ================================================================
   gallery.js — Gallery page interactivity
   THIS IS JS FEATURE #1 for the rubric (filterable image gallery).

   FEATURES:
   1. initGalleryFilter() — same filter pattern as menu.js, reused
   2. initGalleryModal()  — clicking a photo opens it in a Bootstrap
                             Modal (lightbox) with its caption
================================================================ */

document.addEventListener('DOMContentLoaded', function () {

  initGalleryFilter();
  initGalleryModal();

});


/* ----------------------------------------------------------------
   1. initGalleryFilter
   Identical logic to the menu filter: show/hide .gallery-item
   elements based on which filter button is active.
---------------------------------------------------------------- */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const noResults = document.querySelector('#noResults');

  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {

      /* Update active button */
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      let visibleCount = 0;

      galleryItems.forEach(function (item) {
        const category = item.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          visibleCount++;
        } else {
          item.style.display = 'none';
        }
      });

      if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'flex' : 'none';
      }
    });
  });
}


/* ----------------------------------------------------------------
   2. initGalleryModal
   
   HOW IT WORKS:
   - Every .gallery-card has data-img (full image path) and
     data-caption (description text) attributes
   - When clicked, Bootstrap's data-bs-toggle="modal" automatically
     opens the #imageModal popup
   - BUT Bootstrap doesn't know which image to show — that's our job.
     We listen for the modal's 'show.bs.modal' event and grab the
     data-img / data-caption from whichever card was clicked.
---------------------------------------------------------------- */
function initGalleryModal() {
  const modal = document.querySelector('#imageModal');
  if (!modal) return;

  const modalImage = document.querySelector('#modalImage');
  const modalCaption = document.querySelector('#modalCaption');

  /* 'show.bs.modal' is a custom Bootstrap event that fires right
     before the modal becomes visible */
  modal.addEventListener('show.bs.modal', function (event) {
    /* event.relatedTarget = the exact element that triggered the modal
       (i.e. the specific .gallery-card that was clicked) */
    const triggerCard = event.relatedTarget;

    if (!triggerCard) return;

    /* Read the custom data attributes off that specific card */
    const imgSrc = triggerCard.getAttribute('data-img');
    const caption = triggerCard.getAttribute('data-caption');

    /* Update the modal's image and caption to match */
    modalImage.setAttribute('src', imgSrc);
    modalImage.setAttribute('alt', caption);
    modalCaption.textContent = caption;
  });
}
