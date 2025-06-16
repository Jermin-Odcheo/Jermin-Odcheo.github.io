document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const floatingNavbarLinks = document.querySelectorAll('#floating-navbar a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Adjust this value as needed. 0.5 means when 50% of the section is visible.
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSectionId = entry.target.id;
                
                // Remove active class from all links
                floatingNavbarLinks.forEach(link => {
                    link.classList.remove('text-gray-50', 'font-bold');
                    link.classList.add('text-gray-400');
                });

                // Determine which link to highlight
                let linkToHighlight;
                if (currentSectionId === 'hero') {
                    linkToHighlight = document.querySelector(`#floating-navbar a[href="#about"]`);
                } else {
                    linkToHighlight = document.querySelector(`#floating-navbar a[href="#${currentSectionId}"]`);
                }

                if (linkToHighlight) {
                    linkToHighlight.classList.remove('text-gray-400');
                    linkToHighlight.classList.add('text-gray-50', 'font-bold');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}); 