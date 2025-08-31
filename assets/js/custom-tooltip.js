/*
 * Custom Tooltip System
 * Replaces the browser's default title attribute behavior with a themed tooltip
 * that follows the cursor, ensuring it works with the canvas cursor overlay.
 */
(function customTooltip() {
  // Don't run on touch devices where hover is not a primary interaction
  if (!window.matchMedia('(pointer: fine)').matches) {
    return;
  }

  const tooltip = document.createElement('div');
  tooltip.className = 'custom-tooltip';
  document.body.appendChild(tooltip);

  let currentTarget = null;

  document.addEventListener('mouseover', (e) => {
    // Find the closest parent element (or the element itself) with a title
    const target = e.target.closest('[title]');

    if (target && target.title) {
      currentTarget = target;
      // Store the original title in a data attribute and clear the title
      // to prevent the default browser tooltip from appearing.
      currentTarget.dataset.originalTitle = currentTarget.title;
      currentTarget.title = '';

      tooltip.innerHTML = currentTarget.dataset.originalTitle; // Use innerHTML to render <br>
      tooltip.classList.add('visible');
    }
  });

  document.addEventListener('mouseout', () => {
    if (currentTarget) {
      // Restore the original title when the mouse leaves
      currentTarget.title = currentTarget.dataset.originalTitle;
      delete currentTarget.dataset.originalTitle;

      tooltip.classList.remove('visible');
      currentTarget = null;
    }
  });

  document.addEventListener('mousemove', (e) => {
    // Position the tooltip to follow the cursor
    tooltip.style.left = `${e.clientX}px`;
    tooltip.style.top = `${e.clientY}px`;
  });
})();