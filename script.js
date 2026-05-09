const cards = document.querySelectorAll('.info-card, .skill-card, .project-card, .timeline-item');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  },
  {
    threshold: 0.12
  }
);

cards.forEach(card => {
  card.classList.add('hidden');
  observer.observe(card);
});
