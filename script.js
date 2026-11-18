// ==========================================
// 1. MOBILE MENU TOGGLE
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
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
  // 2. LIVE SEARCH (Menu Page)
  // ==========================================
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      const cards = document.querySelectorAll('.menu-card'); 
      
      cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        if (text.includes(term)) {
          card.style.display = 'flex'; // Restore original layout
        } else {
          card.style.display = 'none'; // Hide unmatched
        }
      });
    });
  }

  // ==========================================
  // 3. ACCORDION (About Page)
  // ==========================================
  const accordionBtns = document.querySelectorAll('.accordion-btn');
  accordionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('i');
      
      // Close all other open accordions
      accordionBtns.forEach(otherBtn => {
        if (otherBtn !== btn) {
          otherBtn.nextElementSibling.style.maxHeight = '0px';
          otherBtn.querySelector('i').style.transform = 'rotate(0deg)';
        }
      });

      // Toggle the clicked one
      if (content.style.maxHeight && content.style.maxHeight !== '0px') {
        content.style.maxHeight = '0px';
        icon.style.transform = 'rotate(0deg)'; // Points down
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        icon.style.transform = 'rotate(180deg)'; // Points up
      }
    });
  });

  // ==========================================
  // 4. FORM VALIDATION (Contact Page)
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
  // 5. LOGIN FORM VALIDATION (Login Page)
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
});