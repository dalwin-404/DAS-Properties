'use strict'

document.addEventListener('DOMContentLoaded', () => {
    const interestForm = document.getElementById('interest-form');
    if (!interestForm) return; // 🔒 Exit if the form doesn't exist on the page

    const submitBtn = document.getElementById('submitBtn');
    const toggleBtn = document.getElementById('toggle-investment-btn');
    const collapsibleSection = document.getElementById('collapsible-section');

    if (toggleBtn && collapsibleSection) {
      collapsibleSection.classList.remove('expanded');
      toggleBtn.setAttribute('aria-expanded', 'false');
      collapsibleSection.setAttribute('aria-hidden', 'true');

      toggleBtn.addEventListener('click', () => {
        const isExpanded = collapsibleSection.classList.toggle('expanded');
        toggleBtn.classList.toggle('expanded', isExpanded);
        toggleBtn.setAttribute('aria-expanded', isExpanded);
        collapsibleSection.setAttribute('aria-hidden', !isExpanded);
        validateForm();
      });
    }

    function validateCheckboxGroups() {
      const groups = interestForm.querySelectorAll('[data-group]');
      for (const group of groups) {
        const checkboxes = group.querySelectorAll('input[type="checkbox"]');
        const checked = [...checkboxes].some(chk => chk.checked);
        if (!checked) return false;
      }
      return true;
    }

    function validateRequiredFields() {
      const requiredInputs = interestForm.querySelectorAll('input[required], select[required]');
      for (const input of requiredInputs) {
        if (!input.value.trim()) return false;
      }
      return true;
    }

    function validateForm() {
      const checkboxesValid = validateCheckboxGroups();
      const fieldsValid = validateRequiredFields();
      submitBtn.disabled = !(checkboxesValid && fieldsValid);
    }

    interestForm.querySelectorAll('input, select').forEach(el => {
      el.addEventListener('change', validateForm);
      el.addEventListener('input', validateForm);
    });

    validateForm(); // Initial call
  });

  // === Other general scripts below ===
  // Add your other JS here


    document.addEventListener("DOMContentLoaded", function () {
    const mainImage = document.querySelector(".gallery-main img");
    const thumbnails = document.querySelectorAll(".gallery-thumbnails .thumb");
    const prevBtn = document.querySelector(".gallery-prev");
    const nextBtn = document.querySelector(".gallery-next");

    if (!mainImage || thumbnails.length === 0) return;

    let currentIndex = 0;
    let autoplayInterval;

    function setActive(index) {
      thumbnails.forEach(thumb => thumb.classList.remove("active"));
      thumbnails[index].classList.add("active");
      mainImage.src = thumbnails[index].src;
      currentIndex = index;
    }

    function nextImage() {
      const nextIndex = (currentIndex + 1) % thumbnails.length;
      setActive(nextIndex);
    }

    function prevImage() {
      const prevIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
      setActive(prevIndex);
    }

    // Add click events for thumbnails
    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener("click", () => {
        setActive(index);
        resetAutoplay();
      });
    });

    

    // Autoplay
    function startAutoplay() {
      autoplayInterval = setInterval(nextImage, 4000);
    }

    function resetAutoplay() {
      clearInterval(autoplayInterval);
      startAutoplay();
    }

    // Initialize
    setActive(0);
    startAutoplay();
  });


  document.querySelectorAll('.drop-down a').forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});
  // =============================================
    // Only toggle on mobile
// if (window.innerWidth < 992) {
//   document.querySelector('.toggle-dropdown').addEventListener('click', function (e) {
//     e.preventDefault();
//     document.querySelector('.services-drop-down').classList.toggle('show');
//     document.querySelector('.dropdown-arrow').classList.toggle('rotated');
//   });
// }

  // =============================================

  const hamburger = document.getElementById('hamburgerIcon');
const menu = document.getElementById('mainDropdown');

hamburger.addEventListener('click', function (e) {
  e.stopPropagation();
  menu.classList.toggle('show');

  // Toggle icon class
  this.classList.toggle('fa-bars');
  this.classList.toggle('fa-times');
});


document.addEventListener('click', function (e) {
  if (!menu.contains(e.target) && e.target !== hamburger) {
    menu.classList.remove('show');
  }
});


const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


const dropdownArrows = document.querySelectorAll('.dropdown-arrow');

dropdownArrows.forEach(arrow => {
  arrow.addEventListener('click', function (e) {
    // Only allow click behavior on screens smaller than 992px (bootstrap LG breakpoint)
    if (window.innerWidth >= 992) return;

    e.stopPropagation(); // prevent it from triggering other clicks

    const parentLi = this.closest('.drop-arrows');
    const dropdown = parentLi.querySelector('.dropdown-content');

    dropdown.classList.toggle('show');
    this.classList.toggle('rotated');
  });
});

// Close dropdowns when clicking outside
document.addEventListener('click', function () {
  // Only close dropdowns on mobile
  if (window.innerWidth < 992) {
    document.querySelectorAll('.dropdown-content').forEach(drop => {
      drop.classList.remove('show');
    });
    document.querySelectorAll('.dropdown-arrow').forEach(arrow => {
      arrow.classList.remove('rotated');
    });
  }
});


// Hero
const slides = document.querySelectorAll('.slide');
    let current = 0;

    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    };

    const nextSlide = () => {
      current = (current + 1) % slides.length;
      showSlide(current);
    };

    const prevSlide = () => {
      current = (current - 1 + slides.length) % slides.length;
      showSlide(current);
    };

    document.getElementById('next').addEventListener('click', nextSlide);
    document.getElementById('prev').addEventListener('click', prevSlide);

    // Auto-play every 5 seconds
let autoSlideInterval;
let mouseMoveTimeout;
let isMouseActive = false;

// Start autoplay
function startAutoPlay() {
  autoSlideInterval = setInterval(nextSlide, 5000);
}

// Stop autoplay
function stopAutoPlay() {
  clearInterval(autoSlideInterval);
}

// Restart autoplay manually
function resetAutoPlay() {
  stopAutoPlay();
  startAutoPlay();
}

// Start autoplay on load
startAutoPlay();

const heroSection = document.querySelector('.hero');

// Pause on active mouse movement
heroSection.addEventListener('mousemove', () => {
  if (!isMouseActive) {
    stopAutoPlay();
    isMouseActive = true;
  }

  clearTimeout(mouseMoveTimeout);

  // Resume autoplay after 3 seconds of inactivity
  mouseMoveTimeout = setTimeout(() => {
    isMouseActive = false;
    startAutoPlay();
  }, 3000);
});

// Resume if mouse leaves the hero section
heroSection.addEventListener('mouseleave', () => {
  clearTimeout(mouseMoveTimeout);
  isMouseActive = false;
  startAutoPlay();
});
// Footer

  document.getElementById("year").textContent = new Date().getFullYear();






// ===========================================
// Services start
let currentSlide = 0;

function getSlidesPerView() {
  return window.innerWidth >= 768 ? 2 : 1; // 2 on desktop, 1 on mobile
}

function moveSlide(direction) {
  const container = document.getElementById('services-container');
  const wrapper = document.querySelector('.services-wrapper');
  const totalSlides = container.children.length;
  const slidesPerView = getSlidesPerView();
  const maxSlideIndex = Math.ceil(totalSlides / slidesPerView) - 1;

  currentSlide += direction;

  if (currentSlide < 0) {
    currentSlide = 0;
  } else if (currentSlide > maxSlideIndex) {
    currentSlide = maxSlideIndex;
  }

  const slideWidth = wrapper.offsetWidth;
  container.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

// Recalculate on resize
window.addEventListener('resize', () => {
  moveSlide(0); // realign
});

function moveSlide(direction) {
  const container = document.getElementById('services-container');
  const wrapper = document.querySelector('.services-wrapper');
  const totalSlides = container.children.length;
  const slidesPerView = getSlidesPerView();
  const maxSlideIndex = Math.ceil(totalSlides / slidesPerView) - 1;

  currentSlide += direction;

  if (currentSlide < 0) {
    currentSlide = maxSlideIndex;  // loop back to last slide
  } else if (currentSlide > maxSlideIndex) {
    currentSlide = 0;  // loop back to first slide
  }

  const slideWidth = wrapper.offsetWidth;
  container.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
  
  // Optional: reset arrow styles if you want (or keep as is)
}


