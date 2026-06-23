/* ================================================================
   blog.js — Blog page live search
   
   HOW IT WORKS:
   - Each .blog-item has a data-title attribute containing the
     article's full title in lowercase (for easy matching)
   - As the user types in the search box, we check on every
     keystroke ('input' event) whether each article's title
     contains the typed text
   - Matching articles stay visible, non-matching ones are hidden
================================================================ */

document.addEventListener('DOMContentLoaded', function () {
  initBlogSearch();
});


function initBlogSearch() {
  const searchInput = document.querySelector('#blogSearch');
  const blogItems = document.querySelectorAll('.blog-item');
  const noResults = document.querySelector('#noResults');

  if (!searchInput || !blogItems.length) return;

  /* 'input' fires on every keystroke (better than 'change', which
     only fires when the field loses focus) */
  searchInput.addEventListener('input', function () {
    /* toLowerCase() so search is case-insensitive ("V60" matches "v60") */
    const query = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    blogItems.forEach(function (item) {
      const title = item.getAttribute('data-title');

      /* includes() checks if the query is anywhere inside the title string */
      if (title.includes(query)) {
        item.style.display = 'block';
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    });

    /* Show "no results" message if the search matches nothing */
    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'flex' : 'none';
    }
  });
}
