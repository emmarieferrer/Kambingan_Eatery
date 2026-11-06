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
// 2. CAROUSEL (Homepage)
// ==========================================
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');

function showSlide(index) {
  if (!slides.length) return;
  slides.forEach((slide, i) => {
    slide.style.opacity = i === index ? '1' : '0';
  });
}

function nextSlide() {
  if (!slides.length) return;
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  if (!slides.length) return;
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

let carouselInterval;

function startCarouselTimer() {
  if (slides.length > 0) {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(nextSlide, 5000);
  }
}

function resetAndStartCarousel() {
  startCarouselTimer();
}

const originalNext = nextSlide;
nextSlide = function() {
  originalNext();
  resetAndStartCarousel();
};

const originalPrev = prevSlide;
prevSlide = function() {
  originalPrev();
  resetAndStartCarousel();
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
    grid.innerHTML = `<p class="text-gray-500 col-span-full text-center py-8">No dishes found.</p>`;
    return;
  }

  filtered.forEach(item => {
    const imageHTML = item.image 
      ? `<img src="${item.image}" alt="${item.name}" class="w-full h-48 object-cover rounded-t-2xl">` 
      : `<div class="w-full h-48 bg-green-900 flex items-center justify-center rounded-t-2xl"><i class="fas fa-utensils text-4xl text-green-400"></i></div>`;

    const card = document.createElement('div');
    card.className = "bg-gray-800 rounded-2xl cursor-pointer hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border border-gray-700 overflow-hidden flex flex-col";
    
    card.innerHTML = `
      ${imageHTML}
      <div class="p-6 flex flex-col flex-grow">
        <div class="flex justify-between items-start mb-4">
          <span class="text-xs font-bold bg-green-900 text-green-400 px-3 py-1 rounded-full uppercase">${item.category}</span>
          <span class="text-xl font-black text-green-400">₱${item.price}</span>
        </div>
        <h3 class="text-xl font-bold mb-2 text-white">${item.name}</h3>
        <p class="text-sm text-gray-400 line-clamp-2 mt-auto">${item.desc}</p>
      </div>
    `;
    card.addEventListener('click', () => openModal(item));
    grid.appendChild(card);
  });
}

const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', (e) => renderMenu(e.target.value));
  renderMenu();
}

function openModal(item) {
  const modal = document.getElementById('menuModal');
  if (!modal) return;
  
  const modalImgContainer = document.getElementById('modalImageContainer');
  if (item.image) {
    modalImgContainer.innerHTML = `<img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">`;
  } else {
    modalImgContainer.innerHTML = `<i class="fas fa-utensils text-4xl text-green-400"></i>`;
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