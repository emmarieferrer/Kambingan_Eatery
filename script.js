// ==========================================
// 1. MOBILE MENU TOGGLE
// ==========================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    if (mobileMenu.classList.contains('hidden')) {
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    } else {
      mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
    }
  });
}

// ==========================================
// 2. HERO CAROUSEL (Split Layout)
// ==========================================
let currentSlide = 0;
const heroTexts = document.querySelectorAll('.hero-text');
const heroImages = document.querySelectorAll('.hero-image');
const heroDots = document.querySelectorAll('.hero-dot');

function showSlide(index) {
  if (!heroTexts.length) return;

  // I-update ang Text
  heroTexts.forEach((text, i) => {
    if (i === index) {
      text.classList.remove('opacity-0', 'pointer-events-none');
      text.classList.add('opacity-100');
    } else {
      text.classList.add('opacity-0', 'pointer-events-none');
      text.classList.remove('opacity-100');
    }
  });

  // I-update ang Image
  heroImages.forEach((img, i) => {
    if (i === index) {
      img.classList.remove('opacity-0');
      img.classList.add('opacity-100');
    } else {
      img.classList.add('opacity-0');
      img.classList.remove('opacity-100');
    }
  });

  // I-update ang Dots
  heroDots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add('bg-[#1a2e22]');
      dot.classList.remove('bg-[#1a2e22]/20');
    } else {
      dot.classList.remove('bg-[#1a2e22]');
      dot.classList.add('bg-[#1a2e22]/20');
    }
  });

  currentSlide = index;
}

function nextSlide() {
  if (!heroImages.length) return;
  let nextIndex = (currentSlide + 1) % heroImages.length;
  showSlide(nextIndex);
}

function prevSlide() {
  if (!heroImages.length) return;
  let prevIndex = (currentSlide - 1 + heroImages.length) % heroImages.length;
  showSlide(prevIndex);
}

let carouselInterval;

function startCarouselTimer() {
  if (heroImages.length > 0) {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(nextSlide, 5000);
  }
}

// I-bind ang dots para pwedeng pindutin
heroDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showSlide(index);
    startCarouselTimer(); // reset timer pag pinindot
  });
});

// I-reset ang timer kapag pinindot ang arrow buttons
const originalNextSlide = nextSlide;
nextSlide = function() {
  originalNextSlide();
  startCarouselTimer();
};

const originalPrevSlide = prevSlide;
prevSlide = function() {
  originalPrevSlide();
  startCarouselTimer();
};

startCarouselTimer();

// ==========================================
// 3. MENU DATA & LIVE SEARCH & MODAL (Menu Page)
// ==========================================
const menuData = [
  { name: "Kalderetang Kambing", price: 185, category: "Main", desc: "Tender goat meat simmered in a rich tomato-liver sauce with bell peppers and olives.", image: "images/kaldereta.jpg" },
  { name: "Kambing Papaitan", price: 165, category: "Soup", desc: "A bold, bitter-savory soup made with goat innards and bile.", image: "images/papaitan.jpg" },
  { name: "Sinigang na Kambing", price: 175, category: "Soup", desc: "Slow-cooked goat in a sour tamarind broth with kangkong and radish.", image: "images/sinigang.jpg" },
  { name: "Kambing Adobo", price: 170, category: "Main", desc: "Goat meat braised in soy sauce, vinegar, garlic, and bay leaves.", image: "" },
  { name: "Grilled Goat Chops", price: 195, category: "Grilled", desc: "Marinated goat chops char-grilled to perfection, with a side of atchara.", image: "" },
  { name: "Bulalo (Beef)", price: 210, category: "Soup", desc: "Rich beef marrow soup with corn and cabbage.", image: "" }
];

function renderMenu(filterText = "") {
  const grid = document.getElementById('menuGrid');
  if (!grid) return;

  grid.innerHTML = "";
  const filtered = menuData.filter(item => 
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  if (filtered.length === 0) {
    grid.innerHTML = `<p class="text-[#1a2e22]/50 col-span-full text-center py-8">No dishes found.</p>`;
    return;
  }

  filtered.forEach(item => {
    // Fallback kung walang image
    const imageHTML = item.image 
      ? `<img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">` 
      : `<div class="w-full h-full flex items-center justify-center bg-[#e5e9e4]"><i class="fas fa-utensils text-5xl text-[#1a2e22]/20"></i></div>`;

    const card = document.createElement('div');
    // Minimalist card design (No background, image on top, text below)
    card.className = "cursor-pointer group flex flex-col h-full";
    
    card.innerHTML = `
      <div class="relative aspect-[4/5] overflow-hidden bg-[#e5e9e4] mb-6">
        ${imageHTML}
      </div>
      <div class="flex flex-col flex-grow">
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-2xl font-serif font-bold text-[#1a2e22] group-hover:text-[#c4976a] transition-colors">${item.name}</h3>
          <span class="text-lg font-semibold text-[#1a2e22]/70">₱${item.price}</span>
        </div>
        <span class="text-xs uppercase tracking-widest text-[#c4976a] font-bold mb-3 block">${item.category}</span>
        <p class="text-[#1a2e22]/60 text-sm leading-relaxed line-clamp-2">${item.desc}</p>
      </div>
    `;
    card.addEventListener('click', () => openModal(item));
    grid.appendChild(card);
  });
}

function openModal(item) {
  const modal = document.getElementById('menuModal');
  if (!modal) return;
  
  const modalImgContainer = document.getElementById('modalImageContainer');
  if (item.image) {
    modalImgContainer.innerHTML = `<img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">`;
  } else {
    modalImgContainer.innerHTML = `<i class="fas fa-utensils text-5xl text-[#1b7a3d] dark:text-green-400"></i>`;
  }

  document.getElementById('modalTitle').innerText = item.name;
  document.getElementById('modalPrice').innerText = `₱${item.price}`;
  document.getElementById('modalDesc').innerText = item.desc;
  
  modal.classList.remove('hidden');
  setTimeout(() => {
    document.getElementById('modalContent').classList.remove('scale-95');
    document.getElementById('modalContent').classList.add('scale-100');
  }, 10);
}

function closeModal() {
  const modal = document.getElementById('menuModal');
  if (!modal) return;
  document.getElementById('modalContent').classList.remove('scale-100');
  document.getElementById('modalContent').classList.add('scale-95');
  setTimeout(() => modal.classList.add('hidden'), 300);
}

// ==========================================
// 4. ACCORDION (About Page)
// ==========================================
const accordionBtns = document.querySelectorAll('.accordion-btn');

accordionBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector('.fa-chevron-down');
    
    if (content.style.maxHeight && content.style.maxHeight !== '0px') {
      content.style.maxHeight = '0px';
      icon.style.transform = 'rotate(0deg)';
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
      icon.style.transform = 'rotate(180deg)';
    }
  });
});

// ==========================================
// 5. FORM VALIDATION & DISABLED PAST DATES (Contact Page)
// ==========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  const dateInput = document.getElementById('resDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const name = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    if (name.value.trim() === '') {
      nameError.classList.remove('hidden');
      name.classList.add('border-red-500');
      isValid = false;
    } else {
      nameError.classList.add('hidden');
      name.classList.remove('border-red-500');
    }

    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      emailError.classList.remove('hidden');
      email.classList.add('border-red-500');
      isValid = false;
    } else {
      emailError.classList.add('hidden');
      email.classList.remove('border-red-500');
    }

    const message = document.getElementById('message');
    const messageError = document.getElementById('messageError');
    if (message.value.trim() === '') {
      messageError.classList.remove('hidden');
      message.classList.add('border-red-500');
      isValid = false;
    } else {
      messageError.classList.add('hidden');
      message.classList.remove('border-red-500');
    }

    if (isValid) {
      const successMsg = document.getElementById('successMsg');
      successMsg.classList.remove('hidden');
      contactForm.reset();
      
      setTimeout(() => {
        successMsg.classList.add('hidden');
      }, 5000);
    }
  });
}

// ==========================================
// 6. LOGIN FORM VALIDATION (Login Page)
// ==========================================
const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    let isValid = true;
    const user = document.getElementById('username');
    const pass = document.getElementById('password');
    const userError = document.getElementById('userError');
    const passError = document.getElementById('passError');

    if (user.value.trim() === '') {
      userError.classList.remove('hidden');
      isValid = false;
    } else {
      userError.classList.add('hidden');
    }

    if (pass.value.trim() === '') {
      passError.classList.remove('hidden');
      isValid = false;
    } else {
      passError.classList.add('hidden');
    }

    if (!isValid) e.preventDefault();
  });
}

// ==========================================
// 7. ABOUT PAGE IMAGE CAROUSEL
// ==========================================
const aboutSlides = document.querySelectorAll('.about-slide');
const aboutDots = document.querySelectorAll('[id^="about-dot-"]');
let currentAboutSlide = 0;
let aboutCarouselInterval;

if (aboutSlides.length > 0) {
  function showAboutSlide(index) {
    aboutSlides.forEach((slide, i) => {
      slide.style.opacity = i === index ? '1' : '0';
    });
    
    if (aboutDots.length > 0) {
      aboutDots.forEach((dot, i) => {
        dot.style.opacity = i === index ? '1' : '0.5';
      });
    }
    currentAboutSlide = index;
  }

  window.aboutNextSlide = function() {
    let nextIndex = (currentAboutSlide + 1) % aboutSlides.length;
    showAboutSlide(nextIndex);
    resetAboutTimer();
  };

  window.aboutPrevSlide = function() {
    let prevIndex = (currentAboutSlide - 1 + aboutSlides.length) % aboutSlides.length;
    showAboutSlide(prevIndex);
    resetAboutTimer();
  };

  window.aboutGoToSlide = function(index) {
    showAboutSlide(index);
    resetAboutTimer();
  };

  function startAboutTimer() {
    if (aboutSlides.length > 1) {
      aboutCarouselInterval = setInterval(() => {
        let nextIndex = (currentAboutSlide + 1) % aboutSlides.length;
        showAboutSlide(nextIndex);
      }, 5000);
    }
  }

  function resetAboutTimer() {
    clearInterval(aboutCarouselInterval);
    startAboutTimer();
  }

  startAboutTimer();
}