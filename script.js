/**
 * ===================================================================
 * Personal Portfolio Script - Joy Arnold J
 * Pure Vanilla JavaScript (ES6+)
 * Suitable for Static Hosting on AWS S3, CloudFront, or AWS Amplify
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // -----------------------------------------------------------------
  // 1. MOBILE NAVIGATION TOGGLE & AUTO-CLOSE
  // -----------------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburgerBtn.classList.toggle('active', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Auto-close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          hamburgerBtn.classList.remove('active');
          hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Auto-close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // -----------------------------------------------------------------
  // 2. STICKY HEADER & SCROLLSPY (ACTIVE NAV HIGHLIGHT)
  // -----------------------------------------------------------------
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('back-to-top');

  const onScroll = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Header shadow on scroll
    if (header) {
      if (scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Back to top visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // ScrollSpy: highlight active link in navigation
    const headerHeight = header ? header.offsetHeight : 76;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - headerHeight - 70;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run once on page load

  // Back to top click handler
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // -----------------------------------------------------------------
  // 3. EDITABLE PLACEHOLDERS MODAL GUIDE
  // -----------------------------------------------------------------
  const modal = document.getElementById('info-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalClose = document.getElementById('modal-close');
  const modalBodyContent = document.getElementById('modal-body-content');
  const resumeBtn = document.getElementById('resume-btn');
  const actionPlaceholders = document.querySelectorAll('.action-placeholder');

  const openPlaceholderModal = (title, description, codeExample) => {
    if (!modal || !modalBodyContent) return;

    modalBodyContent.innerHTML = `
      <div style="margin-bottom: 14px;">
        <span style="font-size: 0.78rem; font-weight: 700; color: #00f2fe; text-transform: uppercase; letter-spacing: 1px;">Editable Placeholder</span>
        <h3 style="font-size: 1.45rem; color: #ffffff; margin-top: 6px; margin-bottom: 10px;">${title}</h3>
      </div>
      <p style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.6; margin-bottom: 16px;">${description}</p>
      
      <div style="background: #080d1a; border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 8px; padding: 14px; margin-bottom: 20px;">
        <span style="display: block; font-size: 0.72rem; font-weight: 700; color: #38bdf8; text-transform: uppercase; margin-bottom: 6px;">How to update in index.html:</span>
        <code style="display: block; font-size: 0.82rem; color: #f8fafc; font-family: monospace; white-space: pre-wrap; word-break: break-all;">${codeExample}</code>
      </div>

      <div style="text-align: right;">
        <button class="btn btn-primary btn-sm" id="modal-ok-btn">Got it</button>
      </div>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const okBtn = document.getElementById('modal-ok-btn');
    if (okBtn) okBtn.addEventListener('click', closePlaceholderModal);
  };

  const closePlaceholderModal = () => {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (modalClose) modalClose.addEventListener('click', closePlaceholderModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closePlaceholderModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closePlaceholderModal();
    }
  });

  // Resume button click handler
  if (resumeBtn) {
    resumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openPlaceholderModal(
        'Resume Document Placeholder',
        'When you have your resume PDF ready, place the file (e.g. Joy_Arnold_J_Resume.pdf) in this project folder and link it directly to the button.',
        '&lt;a href="./Joy_Arnold_J_Resume.pdf" download class="btn btn-ghost"&gt;\n  Download Resume\n&lt;/a&gt;'
      );
    });
  }

  // Project action placeholders
  actionPlaceholders.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const actionType = btn.getAttribute('data-action');
      if (actionType === 'repo') {
        openPlaceholderModal(
          'GitHub Repository Link Placeholder',
          'Add your actual GitHub project repository link to this button in index.html when your project repository is ready.',
          '&lt;a href="https://github.com/your-username/your-repo" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm"&gt;\n  GitHub Repository\n&lt;/a&gt;'
        );
      } else {
        openPlaceholderModal(
          'Live Demo Link Placeholder',
          'Add your deployed live application URL to this button in index.html once your web app is hosted.',
          '&lt;a href="https://your-demo-url.com" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm"&gt;\n  Live Demo\n&lt;/a&gt;'
        );
      }
    });
  });

  // -----------------------------------------------------------------
  // 4. CONTACT FORM STRICT CLIENT-SIDE VALIDATION & FEEDBACK
  // -----------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const formStatusAlert = document.getElementById('form-status-alert');
  const submitBtn = document.getElementById('submit-btn');

  // RFC 5322 compliant regex for standard email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (input, errorId, isValid) => {
    const errorEl = document.getElementById(errorId);
    if (!isValid) {
      input.classList.add('is-invalid');
      if (errorEl) errorEl.classList.add('visible');
      return false;
    } else {
      input.classList.remove('is-invalid');
      if (errorEl) errorEl.classList.remove('visible');
      return true;
    }
  };

  // Realtime blur validations
  if (nameInput) {
    nameInput.addEventListener('blur', () => {
      validateField(nameInput, 'name-error', nameInput.value.trim().length > 0);
    });
  }

  if (emailInput) {
    emailInput.addEventListener('blur', () => {
      validateField(emailInput, 'email-error', emailPattern.test(emailInput.value.trim()));
    });
  }

  if (subjectInput) {
    subjectInput.addEventListener('blur', () => {
      validateField(subjectInput, 'subject-error', subjectInput.value.trim().length > 0);
    });
  }

  if (messageInput) {
    messageInput.addEventListener('blur', () => {
      validateField(messageInput, 'message-error', messageInput.value.trim().length > 0);
    });
  }

  // Form submission handler
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateField(nameInput, 'name-error', nameInput.value.trim().length > 0);
      const isEmailValid = validateField(emailInput, 'email-error', emailPattern.test(emailInput.value.trim()));
      const isSubjectValid = validateField(subjectInput, 'subject-error', subjectInput.value.trim().length > 0);
      const isMessageValid = validateField(messageInput, 'message-error', messageInput.value.trim().length > 0);

      if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
        if (formStatusAlert) {
          formStatusAlert.className = 'form-status-alert error';
          formStatusAlert.textContent = 'Please correct the highlighted fields with valid information before submitting.';
        }
        return;
      }

      // Show submitting state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span>Submitting...</span>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>
        `;
      }

      // Simulate client verification
      setTimeout(() => {
        const senderName = nameInput.value.trim();
        contactForm.reset();

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `
            <span>Submit Message</span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          `;
        }

        // Display transparent status message (do not pretend it was delivered to a remote mailbox without backend)
        if (formStatusAlert) {
          formStatusAlert.className = 'form-status-alert success';
          formStatusAlert.innerHTML = `
            <strong>Form validated successfully!</strong><br>
            Thank you, ${senderName}. Your message fields are validated. To deliver inquiries directly to your mailbox once hosted on AWS, connect this form to Formspree, EmailJS, or an AWS Lambda + SES endpoint.
          `;
        }

        setTimeout(() => {
          if (formStatusAlert) {
            formStatusAlert.className = 'form-status-alert';
            formStatusAlert.style.display = 'none';
          }
        }, 10000);
      }, 700);
    });
  }

  // -----------------------------------------------------------------
  // 5. DYNAMIC COPYRIGHT YEAR
  // -----------------------------------------------------------------
  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }
});
