// Reviews carousel infinite scroll script
function initReviewsCarousel() {
  const track = document.querySelector('.reviews-track');
  const reviews = document.querySelectorAll('.review-card');

  if (!track || !reviews.length) return;

  // Clone reviews for infinite scroll effect
  reviews.forEach(review => {
    const clone = review.cloneNode(true);
    track.appendChild(clone);
  });
}

// Initialize carousel when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReviewsCarousel);
} else {
  initReviewsCarousel();
}
