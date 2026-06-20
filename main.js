// Main script file for the Vishwasri S K Portfolio Website

document.addEventListener('DOMContentLoaded', () => {
  // --- Dynamic Role Tagline Cycling ---
  const roleTagline = document.getElementById('role-tagline');
  const taglinePhrases = [
    'Cloud & DevOps Engineer',
    'Software Developer',
    'Proactive Learner'
  ];
  let taglineIndex = 0;

  const cycleTagline = () => {
    if (!roleTagline) return;
    roleTagline.style.opacity = '0';
    setTimeout(() => {
      taglineIndex = (taglineIndex + 1) % taglinePhrases.length;
      roleTagline.textContent = taglinePhrases[taglineIndex];
      roleTagline.style.opacity = '1';
    }, 300);
  };

  // Update tagline every 5 seconds
  setInterval(cycleTagline, 5000);

  // --- Nav Scroll Behavior ---
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Mobile Navigation Toggle ---
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const toggleIcon = menuToggle.querySelector('i');
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Switch icon between hamburger and cross
    if (navMenu.classList.contains('active')) {
      toggleIcon.className = 'fa-solid fa-xmark';
    } else {
      toggleIcon.className = 'fa-solid fa-bars';
    }
  });

  // Close mobile menu when clicking a nav link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      toggleIcon.className = 'fa-solid fa-bars';
    });
  });

  // --- Scroll Active Section Indicator ---
  const sections = document.querySelectorAll('section');
  const scrollActiveIndicator = () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120; // Offset for sticky header
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
      if (activeLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          activeLink.classList.add('active');
        } else {
          activeLink.classList.remove('active');
        }
      }
    });
  };
  window.addEventListener('scroll', scrollActiveIndicator);

  // --- Scroll Reveal Animation with IntersectionObserver ---
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');

        // If it's a skills category, trigger the skill bar fill animation
        if (entry.target.classList.contains('skills-category')) {
          entry.target.classList.add('revealed');
        }
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });
  reveals.forEach(el => revealObserver.observe(el));

  // --- Resume Modal Logic ---
  const btnViewResume = document.getElementById('btn-view-resume');
  const resumeModal = document.getElementById('resume-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const openModal = (e) => {
    e.preventDefault();
    resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop background scrolling
  };
  const closeModal = () => {
    resumeModal.classList.remove('active');
    document.body.style.overflow = ''; // Resume background scrolling
  };
  btnViewResume.addEventListener('click', openModal);
  modalCloseBtn.addEventListener('click', closeModal);

  // Close modal when clicking outside modal-content
  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
      closeModal();
    }
  });

  // --- Form Validation and Dummy Submit Action ---
  const contactForm = document.getElementById('contact-form');
  const btnSubmit = document.getElementById('btn-submit-contact');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Capture user input
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    // Basic client validation check
    if (!name || !email || !message) {
      return;
    }
    // Change button state to "Sending..."
    const originalText = btnSubmit.innerHTML;
    btnSubmit.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
    btnSubmit.disabled = true;
    // Simulate server call
    setTimeout(() => {
      // Transition button state to "Sent!"
      btnSubmit.innerHTML = 'Sent Successfully! <i class="fa-solid fa-check"></i>';
      btnSubmit.style.background = 'linear-gradient(135deg, #5f9598 0%, #8cb6b8 100%)';
      btnSubmit.style.borderColor = 'transparent';

      // Clear the form fields
      contactForm.reset();

      // Restore button after 3 seconds
      setTimeout(() => {
        btnSubmit.innerHTML = originalText;
        btnSubmit.disabled = false;
        btnSubmit.style.background = '';
        btnSubmit.style.borderColor = '';
      }, 3000);
    }, 1500);
  });
});
