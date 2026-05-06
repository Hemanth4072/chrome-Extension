function removeYouTubeDistractions() {
  const selectors = [
    "ytd-rich-section-renderer", // recommendation shelves
    "ytd-watch-next-secondary-results-renderer", // sidebar recommendations
    "ytd-reel-shelf-renderer" // shorts
  ];

  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((item) => item.remove());
  });
}

function removeInstagramReels() {
  const reelsLinks = Array.from(document.querySelectorAll('a[href*="/reels/"]'));
  reelsLinks.forEach((link) => {
    const reelContainer = link.closest("article, div");
    if (reelContainer) {
      reelContainer.remove();
    }
  });
}

function runCleanup() {
  removeYouTubeDistractions();
  removeInstagramReels();
}

runCleanup();

const observer = new MutationObserver(() => runCleanup());
observer.observe(document.documentElement, { childList: true, subtree: true });
