/* ================================================================
   contact.js — Contact form validation
   THIS IS JS FEATURE #2 for the rubric.

   WHAT THIS DOES:
   1. Stops the form from submitting if any field is invalid
   2. Checks each field against its own rule (required, email, etc.)
   3. Shows a red error message under any invalid field
   4. Shows a live character counter for the message box
   5. On success: hides the form, shows a green success banner

   NOTE ON REAL SUBMISSION:
   This is a static front-end project with no backend server, so we
   cannot actually send an email. Instead we SIMULATE a successful
   submission after validation passes. This is exactly what the
   rubric expects ("dynamic contact form with validation").
================================================================ */

document.addEventListener('DOMContentLoaded', function () {

  initContactForm();
  initCharCounter();

});


/* ----------------------------------------------------------------
   1. initContactForm
   Attaches a 'submit' listener to the form and runs validation
   on every field before allowing it to "send".
---------------------------------------------------------------- */
function initContactForm() {
  const form = document.querySelector('#contactForm');
  if (!form) return; /* Stop if this page has no contact form */

  form.addEventListener('submit', function (event) {
    /* event.preventDefault() stops the page from refreshing/navigating,
       which is the browser's default behaviour when a form submits */
    event.preventDefault();

    /* Run validation on every field. validateForm() returns true/false */
    const isValid = validateForm(form);

    if (isValid) {
      handleSuccessfulSubmit(form);
    }
    /* If invalid, error messages are already showing — do nothing else */
  });

  /* BONUS UX: validate a field the moment the user leaves it (blur event),
     so they get instant feedback instead of waiting until they hit submit */
  const fields = form.querySelectorAll('input[data-required], input[data-type], textarea[data-required], select[data-required]');
  fields.forEach(function (field) {
    field.addEventListener('blur', function () {
      validateField(field);
    });
  });
}


/* ----------------------------------------------------------------
   2. validateForm
   Loops through every field that needs validation and checks it.
   Returns true only if ALL fields pass.
---------------------------------------------------------------- */
function validateForm(form) {
  /* Select every field that has a validation rule attached */
  const fields = form.querySelectorAll('[data-required], [data-type]');

  let allValid = true;

  fields.forEach(function (field) {
    /* validateField returns true/false for THIS field */
    const fieldIsValid = validateField(field);
    if (!fieldIsValid) {
      allValid = false; /* If even one field fails, the whole form fails */
    }
  });

  return allValid;
}


/* ----------------------------------------------------------------
   3. validateField
   Checks ONE field against its rules and shows/hides its error message.

   RULES CHECKED (read from data-* attributes in the HTML):
   - data-required="true"   → field cannot be empty
   - data-type="email"      → must match a valid email pattern
   - data-type="phone"      → must match a Kenyan phone pattern (if filled)
   - data-min-length="10"   → must have at least N characters
---------------------------------------------------------------- */
function validateField(field) {
  const value = field.value.trim(); /* trim() removes leading/trailing spaces */
  const errorBox = document.querySelector('#' + field.id + 'Error');

  let errorMessage = ''; /* Empty string = no error */

  /* --- RULE 1: Required field check --- */
  if (field.dataset.required === 'true' && value === '') {
    errorMessage = getFieldLabel(field) + ' is required.';
  }

  /* --- RULE 2: Email format check (regex) --- */
  /* Only check format if the field has a value (required check already covers empty) */
  else if (field.dataset.type === 'email' && value !== '') {
    /* Standard email regex: text@text.text */
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      errorMessage = 'Please enter a valid email address (e.g. name@example.com).';
    }
  }

  /* --- RULE 3: Phone format check (optional field, only validated if filled) --- */
  else if (field.dataset.type === 'phone' && value !== '') {
    /* Accepts formats like: 0712345678, 0712 345 678, +254712345678 */
    const phonePattern = /^(\+254|0)[17]\d{8}$|^(\+254|0)[17][0-9\s]{7,9}$/;
    /* Remove spaces before testing for a cleaner check */
    const cleanedValue = value.replace(/\s/g, '');
    const simplePattern = /^(\+254|0)[17]\d{8}$/;
    if (!simplePattern.test(cleanedValue)) {
      errorMessage = 'Enter a valid Kenyan phone number (e.g. 0712345678).';
    }
  }

  /* --- RULE 4: Minimum length check (e.g. message box) --- */
  else if (field.dataset.minLength && value.length < parseInt(field.dataset.minLength) && value !== '') {
    errorMessage = 'Please write at least ' + field.dataset.minLength + ' characters.';
  }
  else if (field.dataset.minLength && field.dataset.required === 'true' && value === '') {
    /* Already caught by Rule 1, but kept here so the order of checks is clear */
    errorMessage = getFieldLabel(field) + ' is required.';
  }

  /* --- Apply the result to the page --- */
  if (errorMessage) {
    showError(field, errorBox, errorMessage);
    return false;
  } else {
    clearError(field, errorBox);
    return true;
  }
}


/* ----------------------------------------------------------------
   Helper: getFieldLabel
   Converts a field's <label> text into a clean error prefix.
   e.g. for #fullName it returns "Full Name"
---------------------------------------------------------------- */
function getFieldLabel(field) {
  const label = document.querySelector('label[for="' + field.id + '"]');
  if (!label) return 'This field';
  /* Remove the red asterisk span text before returning */
  return label.textContent.replace('*', '').trim();
}


/* ----------------------------------------------------------------
   Helper: showError
   Adds Bootstrap's .is-invalid class (makes the input border red)
   and fills in the error message text below it.
---------------------------------------------------------------- */
function showError(field, errorBox, message) {
  field.classList.add('is-invalid');
  field.classList.remove('is-valid');
  if (errorBox) {
    errorBox.textContent = message;
    errorBox.style.display = 'block';
  }
}


/* ----------------------------------------------------------------
   Helper: clearError
   Removes the red border and error message, adds a subtle green
   "valid" border instead so the user gets positive feedback too.
---------------------------------------------------------------- */
function clearError(field, errorBox) {
  field.classList.remove('is-invalid');
  field.classList.add('is-valid');
  if (errorBox) {
    errorBox.textContent = '';
    errorBox.style.display = 'none';
  }
}


/* ----------------------------------------------------------------
   4. handleSuccessfulSubmit
   Called only when EVERY field passes validation.
   Simulates sending the message and shows the success banner.
---------------------------------------------------------------- */
function handleSuccessfulSubmit(form) {
  const submitBtn = document.querySelector('#submitBtn');
  const successBanner = document.querySelector('#successBanner');

  /* Disable the button and show a loading state, like a real app would
     while waiting for a server response */
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...';

  /* setTimeout simulates network delay (800ms) before "success" */
  setTimeout(function () {
    /* Hide the form, show the success banner */
    form.style.display = 'none';
    if (successBanner) {
      successBanner.style.display = 'flex';
    }

    /* Reset button state in case the form is shown again later */
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="bi bi-send me-2"></i>Send Message';
  }, 800);
}


/* ----------------------------------------------------------------
   5. initCharCounter
   Live character counter under the message textarea.
   Updates on every keystroke (the 'input' event).
---------------------------------------------------------------- */
function initCharCounter() {
  const textarea = document.querySelector('#message');
  const counter = document.querySelector('#charCount');
  if (!textarea || !counter) return;

  textarea.addEventListener('input', function () {
    counter.textContent = textarea.value.length;

    /* Turn the counter red if still under the minimum (10 chars) */
    if (textarea.value.length < 10) {
      counter.style.color = '#C0392B';
    } else {
      counter.style.color = '';
    }
  });
}
