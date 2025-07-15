// Mobile-specific JavaScript fixes for NicheVendor

// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Fix viewport height issues on mobile (iOS Safari in particular)
  const setViewportHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  // Call once on load and on resize
  setViewportHeight();
  window.addEventListener('resize', setViewportHeight);
  
  // Fix for modals that are too wide
  const fixModalWidths = () => {
    const modals = document.querySelectorAll('[role="dialog"], .modal');
    modals.forEach(modal => {
      modal.style.maxWidth = 'calc(100vw - 20px)';
      modal.style.width = '95vw';
    });
  };
  
  // Monitor for new modals being added to the DOM
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length > 0) {
        fixModalWidths();
      }
    });
  });
  
  // Start observing the document body for added modals
  observer.observe(document.body, { childList: true, subtree: true });
  
  // Fix duplicate footers
  const removeDuplicateFooters = () => {
    const mainElement = document.querySelector('main');
    if (mainElement) {
      const footers = mainElement.querySelectorAll('footer, [role="contentinfo"], .footer');
      if (footers.length > 1) {
        // Keep only the last footer
        for (let i = 0; i < footers.length - 1; i++) {
          footers[i].style.display = 'none';
        }
      }
    }
  };
  
  // Run fixes on initial load and when page content changes
  fixModalWidths();
  removeDuplicateFooters();
  
  // Add back button functionality if needed
  const addBackButton = () => {
    const existingBackButton = document.querySelector('.back-button');
    if (!existingBackButton) {
      const backButton = document.createElement('button');
      backButton.innerHTML = '&larr; Back';
      backButton.classList.add('back-button', 'fixed', 'top-4', 'left-4', 'z-50', 'bg-blue-500', 'text-white', 'px-4', 'py-2', 'rounded-full', 'shadow-lg');
      backButton.addEventListener('click', () => window.history.back());
      document.body.appendChild(backButton);
    }
  };
  
  // Uncomment the next line if you want a global back button
  // addBackButton();
});
