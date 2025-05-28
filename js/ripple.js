function createRipple(event) {
    const link = event.currentTarget;
    
    const ripple = document.createElement("span");
    const rect = link.getBoundingClientRect();
    
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;
    
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - rect.left - radius}px`;
    ripple.style.top = `${event.clientY - rect.top - radius}px`;
    ripple.className = "ripple";
    
    // Remove existing ripple
    const existingRipple = link.querySelector(".ripple");
    if (existingRipple) {
        existingRipple.remove();
    }
    
    link.appendChild(ripple);
}

// Add ripple effect to main navigation links only
document.addEventListener('DOMContentLoaded', () => {
    const mainNavLinks = document.querySelectorAll('.navbar-nav > .nav-item:not(.dropdown) > .nav-link');
    mainNavLinks.forEach(link => {
        link.style.position = 'relative';
        link.style.overflow = 'hidden';
        link.addEventListener('click', createRipple);
    });

    // Project filtering functionality
    const filterButtons = document.querySelectorAll('[data-filter]');
    const projectCards = document.querySelectorAll('[data-category]');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                // Reset animation
                card.style.animation = 'none';
                card.offsetHeight; // Trigger reflow
                card.style.animation = null;

                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    // Add animation with delay based on index
                    const delay = Array.from(projectCards).indexOf(card) * 0.1;
                    card.style.animationDelay = `${delay}s`;
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});