// ==========================================
// ARUN KUMAR P - PORTFOLIO INTERACTION SCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // Sticky Navigation Menu & Scroll To Top
  const nav = document.getElementById("navbar");
  const scrollBtn = document.querySelector(".scroll-button a");
  const navLinks = document.querySelectorAll(".menu li a");
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY || document.documentElement.scrollTop;

    // Sticky Nav Toggle
    if (scrollPos > 30) {
      nav.classList.add("sticky");
      if (scrollBtn) scrollBtn.style.display = "flex";
    } else {
      nav.classList.remove("sticky");
      if (scrollBtn) scrollBtn.style.display = "none";
    }

    // Active Navigation Link on Scroll
    let currentSectionId = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (currentSectionId && link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  });

  // Mobile Side Navigation Menu & Backdrop
  const body = document.querySelector("body");
  const navBar = document.querySelector(".navbar");
  const menuBtn = document.getElementById("menu-btn");
  const cancelBtn = document.getElementById("cancel-btn");
  const navBackdrop = document.getElementById("navBackdrop");

  const openNavMenu = () => {
    navBar.classList.add("active");
    if (navBackdrop) navBackdrop.classList.add("active");
    body.style.overflow = "hidden";
  };

  const hideNavMenu = () => {
    navBar.classList.remove("active");
    if (navBackdrop) navBackdrop.classList.remove("active");
    body.style.overflow = "auto";
  };

  if (menuBtn) menuBtn.addEventListener("click", openNavMenu);
  if (cancelBtn) cancelBtn.addEventListener("click", hideNavMenu);
  if (navBackdrop) navBackdrop.addEventListener("click", hideNavMenu);

  navLinks.forEach((link) => {
    link.addEventListener("click", hideNavMenu);
  });

  // Typing Animation for Hero Subtitle
  const typingElement = document.getElementById("typingText");
  if (typingElement) {
    const roles = [
      "Scalable Web Platforms",
      "Laravel & CodeIgniter 4 APIs",
      "React.js & Next.js Frontends",
      "Secure Payment Gateways",
      "Custom CMS & Admin Dashboards"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 90;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 1800; // Pause at end of word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400; // Pause before next word
      }

      setTimeout(typeEffect, typingSpeed);
    }

    setTimeout(typeEffect, 600);
  }

  // Project Filtering
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const categories = card.getAttribute("data-category") || "";
        if (filterValue === "all" || categories.includes(filterValue)) {
          card.style.display = "flex";
          card.style.animation = "fadeInUp 0.4s ease forwards";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Project Auto-Slider Setup
  const projectSliders = document.querySelectorAll(".project-slider");

  projectSliders.forEach((slider, sliderIdx) => {
    const slides = slider.querySelectorAll(".project-slide");
    const pills = slider.querySelectorAll(".slider-pill");
    const prevBtn = slider.querySelector(".prev-arrow");
    const nextBtn = slider.querySelector(".next-arrow");
    let currentIndex = 0;
    let autoSlideInterval = null;
    const intervalDuration = 3500; // 3.5 seconds per slide

    function showSlide(index) {
      if (slides.length === 0) return;
      currentIndex = (index + slides.length) % slides.length;

      slides.forEach((slide, idx) => {
        if (idx === currentIndex) {
          slide.classList.add("active");
        } else {
          slide.classList.remove("active");
        }
      });

      pills.forEach((pill, idx) => {
        if (idx === currentIndex) {
          pill.classList.add("active");
        } else {
          pill.classList.remove("active");
        }
      });
    }

    function startAutoSlide() {
      stopAutoSlide();
      autoSlideInterval = setInterval(() => {
        showSlide(currentIndex + 1);
      }, intervalDuration);
    }

    function stopAutoSlide() {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
      }
    }

    // Pill click handlers (Web View / Admin View)
    pills.forEach((pill) => {
      pill.addEventListener("click", (e) => {
        e.stopPropagation();
        const targetIdx = parseInt(pill.getAttribute("data-index"), 10);
        showSlide(targetIdx);
        startAutoSlide(); // Reset auto timer
      });
    });

    // Arrow buttons
    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        showSlide(currentIndex - 1);
        startAutoSlide();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        showSlide(currentIndex + 1);
        startAutoSlide();
      });
    }

    // Pause on hover
    slider.addEventListener("mouseenter", () => {
      stopAutoSlide();
    });

    slider.addEventListener("mouseleave", () => {
      startAutoSlide();
    });

    // Touch swipe support on mobile devices
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoSlide();
    }, { passive: true });

    slider.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const swipeDistance = touchEndX - touchStartX;
      if (Math.abs(swipeDistance) > 35) {
        if (swipeDistance < 0) {
          // Swiped left -> next slide (Admin view)
          showSlide(currentIndex + 1);
        } else {
          // Swiped right -> prev slide (Web view)
          showSlide(currentIndex - 1);
        }
      }
      startAutoSlide();
    }, { passive: true });

    // Initial start with slight staggering
    setTimeout(() => {
      startAutoSlide();
    }, sliderIdx * 600);
  });

  // Close modal when clicking outside modal container
  const resumeModal = document.getElementById("resumeModal");
  if (resumeModal) {
    resumeModal.addEventListener("click", (e) => {
      if (e.target === resumeModal) {
        closeResumeModal();
      }
    });
  }

  // Escape key to close modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && resumeModal && resumeModal.classList.contains("open")) {
      closeResumeModal();
    }
  });
});

// Resume Modal Open/Close/Print Functions
function openResumeModal() {
  const modal = document.getElementById("resumeModal");
  if (modal) {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

function closeResumeModal() {
  const modal = document.getElementById("resumeModal");
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "auto";
  }
}

function printResume() {
  window.print();
}

// Contact Form Submission Handler
function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("userName").value.trim();
  const email = document.getElementById("userEmail").value.trim();
  const subject = document.getElementById("userSubject").value.trim();
  const message = document.getElementById("userMessage").value.trim();
  const statusDiv = document.getElementById("formStatus");

  if (!name || !email || !subject || !message) {
    statusDiv.className = "form-status error";
    statusDiv.textContent = "Please fill in all required fields.";
    return false;
  }

  // Construct mailto link
  const recipient = "pgarunperumal1999@gmail.com";
  const mailSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject} - from ${name}`);
  const mailBody = encodeURIComponent(
    `Hello Arun,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nSent from your portfolio website.`
  );

  statusDiv.className = "form-status success";
  statusDiv.innerHTML = `<i class="fas fa-check-circle"></i> Opening your email client to send message to <strong>${recipient}</strong>...`;

  // Trigger mail client
  window.location.href = `mailto:${recipient}?subject=${mailSubject}&body=${mailBody}`;

  return false;
}

// WhatsApp Direct Message Handler
function sendViaWhatsApp() {
  const name = document.getElementById("userName").value.trim() || "Visitor";
  const email = document.getElementById("userEmail").value.trim() || "Not provided";
  const subject = document.getElementById("userSubject").value.trim() || "General Inquiry";
  const message = document.getElementById("userMessage").value.trim() || "Hi Arun, I checked your portfolio and would like to connect!";

  const phone = "919677470849";
  const text = encodeURIComponent(
    `Hi Arun,\n\n*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject}\n\n*Message:*\n${message}`
  );

  window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
}
