'use strict'

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


// Get all arrow icons
const dropdownArrows = document.querySelectorAll('.dropdown-arrow');

dropdownArrows.forEach(arrow => {
  arrow.addEventListener('click', function (e) {
    e.stopPropagation(); // prevent it from triggering other clicks

    // Get the parent <li> of the arrow
    const parentLi = this.closest('.drop-arrows');

    // Find the related dropdown div inside that <li>
    const dropdown = parentLi.querySelector('.dropdown-content');

    // Close any other open dropdowns
    // document.querySelectorAll('.dropdown-content').forEach(el => {
    //   if (el !== dropdown) el.classList.remove('show');
    // });

    // Toggle this one
    dropdown.classList.toggle('show');
    this.classList.toggle('rotated');
  });
});

// Close dropdowns when clicking outside
document.addEventListener('click', function () {
  document.querySelectorAll('.dropdown-content').forEach(drop => {
    drop.classList.remove('show');
  });
  document.querySelectorAll('.dropdown-arrow').forEach(arrow => {
    arrow.classList.remove('rotated');
  });
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





// COntact form
const form = document.getElementById('interest-form');
    const submitBtn = document.getElementById('submitBtn');

    function validateForm() {
      const requiredInputs = form.querySelectorAll('input[required], select[required], textarea[required]');
      const checkboxGroups = form.querySelectorAll('.checkbox-group[data-group]');

      let isValid = true;

      requiredInputs.forEach(input => {
        if (input.type === 'checkbox') {
          if (!input.checked) isValid = false;
        } else if (!input.value.trim()) {
          isValid = false;
        }
      });

      checkboxGroups.forEach(group => {
        const checkboxes = group.querySelectorAll('input[type="checkbox"]');
        const oneChecked = Array.from(checkboxes).some(cb => cb.checked);
        if (!oneChecked) isValid = false;
      });

      submitBtn.disabled = !isValid;
    }

    form.addEventListener('input', validateForm);
    form.addEventListener('change', validateForm);
    window.addEventListener('load', validateForm);
// Footer

  document.getElementById("year").textContent = new Date().getFullYear();

  



 



