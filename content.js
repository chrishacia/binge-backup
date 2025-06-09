(function () {
  const fallbackElements = document.querySelectorAll('.slider-item .fallback-text');
  const fallbackTextArray = Array.from(fallbackElements).map(el => el.textContent.trim());

  window.__fallbackTextData = fallbackTextArray;
})();