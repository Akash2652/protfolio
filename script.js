/* 
   Akash Kumar Portfolio Javascript
   Dynamic Interactions & Animations
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Navigation Menu Toggle
    const navToggle = document.getElementById('navToggle');
    const navLinksContainer = document.getElementById('navLinks');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navLinksContainer) {
        navToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            // Toggle hamburger icon animation
            const icon = navToggle.querySelector('i');
            if (icon) {
                if (navLinksContainer.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 2. Navbar Scrolling Background Transition
    const navBar = document.querySelector('.nav-bar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navBar.classList.add('scrolled');
        } else {
            navBar.classList.remove('scrolled');
        }
    });

    // 3. Typwriter effect for Subtitle
    const words = [
        "B.Tech CSE Student",
        "Web Developer",
        "Problem Solver",
        "UI/UX Enthusiast"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingDelay = 150;
    const erasingDelay = 80;
    const newWordDelay = 2000;
    const typingTextSpan = document.getElementById('typingText');

    function type() {
        if (!typingTextSpan) return;

        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingTextSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingTextSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let delay = isDeleting ? erasingDelay : typingDelay;

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            delay = newWordDelay; // pause at full word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            delay = 500; // pause before next word
        }

        setTimeout(type, delay);
    }

    // Init typewriter
    if (typingTextSpan) {
        setTimeout(type, 1000);
    }

    // 4. Scroll Reveal Observer
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 5. Scroll-to-Top Button Behavior
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.pointerEvents = 'auto';
                scrollTopBtn.style.transform = 'translateY(0)';
            } else {
                scrollTopBtn.style.opacity = '0';
                scrollTopBtn.style.pointerEvents = 'none';
                scrollTopBtn.style.transform = 'translateY(15px)';
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
