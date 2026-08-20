/* ==========================================================================
   LITTLE'S CLINIC - INTERACTIVE JS & ANIMATIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. HERO CAROUSEL FUNCTIONALITY
  const track = document.getElementById('carousel-track');
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  let currentSlide = 0;
  const totalSlides = slides.length;
  let autoplayInterval;

  function updateCarousel(index) {
    currentSlide = index;
    if (track) {
      track.style.transform = `translateX(-${currentSlide * (100 / totalSlides)}%)`;
    }
    
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentSlide);
    });

    indicators.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  function nextSlide() {
    let nextIndex = (currentSlide + 1) % totalSlides;
    updateCarousel(nextIndex);
  }

  function prevSlide() {
    let prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel(prevIndex);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoplay();
  });

  if (prevBtn) prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoplay();
  });

  indicators.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      updateCarousel(index);
      resetAutoplay();
    });
  });

  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 6000);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  startAutoplay();

  const carouselContainer = document.querySelector('.hero-carousel');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    carouselContainer.addEventListener('mouseleave', startAutoplay);
  }

  // 2. MOBILE NAVIGATION TOGGLE
  const mobileToggle = document.getElementById('mobile-toggle');
  const mainNav = document.getElementById('main-nav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });
  }

  // 3. SMOOTH SCROLLING FOR NAV LINKS
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          if (mainNav) mainNav.classList.remove('open');
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // 4. HEADER STICKY SHADOW ON SCROLL
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 5. SCROLL ANIMATIONS (INTERSECTION OBSERVER)
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.12
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  animateElements.forEach(el => scrollObserver.observe(el));

  // 6. SERVICES CATEGORY FILTERING TABS
  const tabBtns = document.querySelectorAll('.tab-btn');
  const serviceCards = document.querySelectorAll('.service-card-v2');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});

// 7. SERVICE DETAILS MODAL DATA & CONTROLLER
const SERVICES_DETAIL_DATA = {
  newborn: {
    title: "Newborn Care & Neonatology",
    description: "Welcome your baby with specialized neonatology health checks. We monitor newborn jaundice, weight gain, umbilical cord healing, and provide mother feeding support.",
    bullets: [
      "✓ Newborn Jaundice Screening & Bilirubin Monitoring",
      "✓ Umbilical Cord Stump Infection Prevention",
      "✓ Breastfeeding Latch & Formula Guidance",
      "✓ Newborn Hearing & Reflex Evaluations"
    ]
  },
  vaccination: {
    title: "Child Vaccination & Immunization",
    description: "We follow strict Indian Academy of Pediatrics (IAP) and WHO recommended vaccination schedules, ensuring maximum safety, pain-reduction techniques, and digital tracking.",
    bullets: [
      "✓ All Essential IAP & WHO Vaccines Available",
      "✓ Painless / Gentle Injection Techniques",
      "✓ Digital Vaccine Reminders & Printed Cards",
      "✓ Catch-up Vaccination for Missed Doses"
    ]
  },
  growth: {
    title: "Growth & Development Monitoring",
    description: "Continuous monitoring of height, weight, head circumference, motor skills, speech milestones, and early intervention for developmental delays.",
    bullets: [
      "✓ WHO Standard Growth Charts & Percentiles",
      "✓ Speech & Language Milestones Screening",
      "✓ Motor Skill & Physical Growth Tracking",
      "✓ Early Intervention Consultation"
    ]
  },
  consultation: {
    title: "Pediatric Consultation & Illness Treatment",
    description: "Expert diagnosis and gentle treatment for acute childhood illnesses such as fever, cough, cold, ear infections, diarrhea, and rashes.",
    bullets: [
      "✓ Acute Fever & Viral Cold Care",
      "✓ Gastrointestinal & Stomach Infection Treatment",
      "✓ Ear, Nose & Throat Pediatric Diagnostics",
      "✓ Warm & Child-Friendly Doctor Consultation"
    ]
  },
  nutrition: {
    title: "Pediatric Nutrition & Diet Counseling",
    description: "Customized nutrition plans designed for toddler picky eaters, weaning guidance for infants, weight management, and correcting iron/vitamin deficiencies.",
    bullets: [
      "✓ Weaning Foods Schedule (6 to 12 months)",
      "✓ Creative Meal Plans for Picky Eater Toddlers",
      "✓ Anemia & Vitamin D / Calcium Deficiency Care",
      "✓ Healthy Weight Gain & Growth Guidance"
    ]
  },
  adolescent: {
    title: "Adolescent Health Care",
    description: "Specialized healthcare for older children and pre-teens addressing puberty growth spurts, posture, screen time fatigue, and physical wellness.",
    bullets: [
      "✓ Puberty Growth & Hormonal Guidance",
      "✓ School Physicals & Sports Health Exams",
      "✓ Posture, Vision & Screen Time Wellness",
      "✓ Supportive & Confidential Consultations"
    ]
  },
  allergy: {
    title: "Childhood Allergy & Asthma Care",
    description: "Comprehensive management for Bangalore seasonal allergies, allergic rhinitis, asthma wheezing, nebulization care, and skin eczema.",
    bullets: [
      "✓ Asthma Action Plan & Inhaler Guidance",
      "✓ Nebulization Therapy in Clinic",
      "✓ Allergy Trigger Identification",
      "✓ Childhood Eczema & Skin Allergy Care"
    ]
  },
  wellness: {
    title: "Preventive Child Wellness Checkups",
    description: "Annual wellness physicals, school admission health checkups, vision and hearing assessments, and general preventive health certificates.",
    bullets: [
      "✓ Comprehensive Annual Physical Examination",
      "✓ School Admission Fitness Certificates",
      "✓ Pediatric Vision & Hearing Screening",
      "✓ Complete Preventive Health Shield"
    ]
  }
};

function openServiceModal(serviceKey) {
  const service = SERVICES_DETAIL_DATA[serviceKey];
  if (!service) return;

  const modal = document.getElementById('service-detail-modal');
  const modalBody = document.getElementById('service-modal-body');

  if (modal && modalBody) {
    modalBody.innerHTML = `
      <div class="service-detail-modal-body">
        <span class="badge badge--teal" style="margin-bottom:8px;">SERVICE DETAILS</span>
        <h3>${service.title}</h3>
        <p>${service.description}</p>
        <ul>
          ${service.bullets.map(b => `<li>${b}</li>`).join('')}
        </ul>
        <div style="margin-top:20px; display:flex; gap:12px;">
          <button onclick="closeServiceModal(); openBookingModal();" class="btn btn--primary btn--full">Book ${service.title}</button>
        </div>
      </div>
    `;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeServiceModal() {
  const modal = document.getElementById('service-detail-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// 8. BOOKING MODAL CONTROLLER
function openBookingModal(preferredDoctor = '') {
  const modal = document.getElementById('booking-modal');
  const doctorSelect = document.getElementById('modal-doctor');
  
  if (doctorSelect && preferredDoctor) {
    for (let i = 0; i < doctorSelect.options.length; i++) {
      if (doctorSelect.options[i].value.includes(preferredDoctor)) {
        doctorSelect.selectedIndex = i;
        break;
      }
    }
  }

  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeBookingModal() {
  const modal = document.getElementById('booking-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// 9. FORM SUBMISSION HANDLERS
function handleBookingSubmit(event) {
  event.preventDefault();
  const parentName = document.getElementById('parent-name')?.value || 'Parent';
  const childName = document.getElementById('child-name')?.value || 'Child';
  const service = document.getElementById('service-needed')?.value || 'Consultation';

  alert(`Thank you ${parentName}! Your appointment request for ${childName} (${service}) at Little's Clinic (Manipal County Road, Begur – Singasandra) has been received. Our team will call +91 7019204952 to confirm your slot!`);

  event.target.reset();
}

function handleModalBookingSubmit(event) {
  event.preventDefault();
  const parentName = document.getElementById('modal-parent-name')?.value || 'Parent';
  const childName = document.getElementById('modal-child-name')?.value || 'Child';

  alert(`Thank you ${parentName}! Your appointment request for ${childName} at Little's Clinic (Begur – Singasandra) is submitted. We will contact you shortly to confirm!`);

  closeBookingModal();
  event.target.reset();
}
