// ==========================================
// 1. DARK MODE TOGGLE
// ==========================================
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check local storage for theme preference
if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  html.classList.add('dark');
  if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
  html.classList.remove('dark');
  if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
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

// Auto-advance carousel every 5 seconds
if (slides.length > 0) {
  setInterval(nextSlide, 5000);
}

// ==========================================
// 3. MENU DATA & LIVE SEARCH & MODAL (Menu Page)
// ==========================================
const menuData = [
  { name: "Kalderetang Kambing", price: 185, category: "Main", desc: "Tender goat meat simmered in a rich tomato-liver sauce with bell peppers and olives." },
  { name: "Kambing Papaitan", price: 165, category: "Soup", desc: "A bold, bitter-savory soup made with goat innards and bile." },
  { name: "Sinigang na Kambing", price: 175, category: "Soup", desc: "Slow-cooked goat in a sour tamarind broth with kangkong and radish." },
  { name: "Kambing Adobo", price: 170, category: "Main", desc: "Goat meat braised in soy sauce, vinegar, garlic, and bay leaves." },
  { name: "Grilled Goat Chops", price: 195, category: "Grilled", desc: "Marinated goat chops char-grilled to perfection, with a side of atchara." },
  { name: "Bulalo (Beef)", price: 210, category: "Soup", desc: "Rich beef marrow soup with corn and cabbage." }
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
    const card = document.createElement('div');
    card.className = "bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl cursor-pointer hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700";
    card.innerHTML = `
      <div class="flex justify-between items-start mb-4">
        <span class="text-xs font-bold bg-green-100 dark:bg-green-900 text-[#1b7a3d] dark:text-green-400 px-3 py-1 rounded-full uppercase">${item.category}</span>
        <span class="text-xl font-black text-[#1b7a3d] dark:text-green-400">₱${item.price}</span>
      </div>
      <h3 class="text-xl font-bold mb-2">${item.name}</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">${item.desc}</p>
    `;
    card.addEventListener('click', () => openModal(item));
    grid.appendChild(card);
  });
}

// Search Bar Event
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', (e) => renderMenu(e.target.value));
  renderMenu(); // Initial render
}

// Modal Functions
function openModal(item) {
  const modal = document.getElementById('menuModal');
  if (!modal) return;
  
  document.getElementById('modalTitle').innerText = item.name;
  document.getElementById('modalPrice').innerText = `₱${item.price}`;
  document.getElementById('modalDesc').innerText = item.desc;
  
  modal.classList.remove('hidden');
  // Slight delay to allow display:block to apply before animating scale
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
    
    // Toggle max-height for smooth animation
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
  // Set min date for date picker to today
  const dateInput = document.getElementById('resDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Name Validation
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

    // Email Validation (Regex)
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

    // Message Validation
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

    // If all valid, show success message
    if (isValid) {
      const successMsg = document.getElementById('successMsg');
      successMsg.classList.remove('hidden');
      contactForm.reset();
      
      // Hide success message after 5 seconds
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

    if (!isValid) e.preventDefault(); // Pigilan ang pag-submit kung may error
  });
}