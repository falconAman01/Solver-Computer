// Smooth accordion functionality with improved animations
const acc = document.querySelectorAll(".course_botton");

acc.forEach(btn => {
    btn.addEventListener("click", function (e) {
        e.preventDefault();

        // Toggle active class
        this.classList.toggle("active");

        // Get the next element (course details)
        const panel = this.nextElementSibling;

        if (!panel || !panel.classList.contains("course_details")) {
            return;
        }

        // Smooth open/close animation
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            panel.classList.remove("show");
        } else {
            // Close all other panels
            acc.forEach(otherBtn => {
                if (otherBtn !== this) {
                    otherBtn.classList.remove("active");
                    const otherPanel = otherBtn.nextElementSibling;
                    if (otherPanel && otherPanel.classList.contains("course_details")) {
                        otherPanel.style.maxHeight = null;
                        otherPanel.classList.remove("show");
                    }
                }
            });

            // Open current panel
            panel.style.maxHeight = panel.scrollHeight + "px";
            panel.classList.add("show");
        }
    });

    // Add hover effect
    btn.addEventListener("mouseenter", function () {
        if (!this.classList.contains("active")) {
            this.style.transform = "translateY(-2px)";
        }
    });

    btn.addEventListener("mouseleave", function () {
        if (!this.classList.contains("active")) {
            this.style.transform = "translateY(0)";
        }
    });
});

// Scroll reveal animation
function revealOnScroll() {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.animation = "fadeInUp 0.8s ease-out forwards";
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active state to nav buttons based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav_button').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('href').slice(1) === current) {
            btn.classList.add('active');
        }
    });
});

// Parallax effect for header background
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        const scrollPosition = window.scrollY;
        header.style.backgroundPosition = `0px ${scrollPosition * 0.5}px`;
    }
});

// Initialize animations on page load
document.addEventListener("DOMContentLoaded", function () {
    revealOnScroll();

    // Add stagger animation to course buttons
    const buttons = document.querySelectorAll(".course_botton");
    buttons.forEach((btn, index) => {
        btn.style.animation = `fadeInUp 0.6s ease-out ${0.3 + index * 0.1}s forwards`;
        btn.style.opacity = "0";
    });

    // Add smooth loading animation
    document.body.style.opacity = "1";
});

// Add smooth page loading
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
        document.body.style.opacity = "1";
    });
} else {
    document.body.style.opacity = "1";
}

