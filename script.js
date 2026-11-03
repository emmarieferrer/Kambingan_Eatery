document.addEventListener("DOMContentLoaded", () => {
  // Alamin kung anong page ang kasalukuyang bukas
  const path = window.location.pathname.split("/").pop() || "index.html";
  
  // Helper function para sa active link styling
  const getLinkClass = (page) => {
    const baseClass = "font-semibold text-white transition-colors duration-200 border-b-2 pb-1 hover:text-yellow-400";
    return (path === page || (path === "" && page === "index.html")) 
      ? `${baseClass} border-yellow-400 text-yellow-400` 
      : `${baseClass} border-transparent hover:border-yellow-400`;
  };

  // 1. I-INJECT ANG NAVBAR
  const headerHTML = `
    <header class="bg-[#1b7a3d] text-white shadow-lg sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <!-- Logo -->
        <a href="index.html" class="flex items-center gap-3 group">
          <div class="w-14 h-14 bg-white rounded-full flex items-center justify-center text-2xl text-[#1b7a3d] border-2 border-[#1b7a3d] shadow-md group-hover:scale-105 transition-transform">
            <i class="fas fa-goat"></i>
          </div>
          <div class="flex flex-col leading-none">
            <h1 class="font-['Montserrat'] text-2xl font-black tracking-wider uppercase text-white drop-shadow-[2px_2px_0_#115327]">
              Kambingan
            </h1>
            <span class="font-['Pacifico'] text-2xl text-white drop-shadow-[2px_2px_0_#115327] -rotate-3 ml-2">
              Eatery
            </span>
          </div>
        </a>

        <!-- Mobile Menu Button -->
        <button id="mobile-menu-btn" class="md:hidden text-2xl focus:outline-none">
          <i class="fas fa-bars"></i>
        </button>

        <!-- Navigation Links -->
        <nav id="main-nav" class="hidden md:flex w-full md:w-auto mt-4 md:mt-0">
          <ul class="flex flex-col md:flex-row items-center gap-6 w-full text-center">
            <li><a href="index.html" class="${getLinkClass('index.html')}">Home</a></li>
            <li><a href="menu.html" class="${getLinkClass('menu.html')}">Menu</a></li>
            <li><a href="about.html" class="${getLinkClass('about.html')}">Our Story</a></li>
            <li><a href="visit.html" class="${getLinkClass('visit.html')}">Visit Us</a></li>
          </ul>
        </nav>

      </div>
    </header>
  `;
  document.body.insertAdjacentHTML("afterbegin", headerHTML);

  // 2. I-INJECT ANG FOOTER
  const footerHTML = `
    <footer class="bg-gray-900 text-gray-400 py-8 mt-auto">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <p class="text-sm">© 2025 Kambingan Eatery. All rights reserved. Made with <i class="fas fa-heart text-[#1b7a3d]"></i></p>
      </div>
    </footer>
  `;
  document.body.insertAdjacentHTML("beforeend", footerHTML);

  // 3. MOBILE MENU TOGGLE LOGIC
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const nav = document.getElementById("main-nav");

  mobileBtn.addEventListener("click", () => {
    nav.classList.toggle("hidden");
    const isHidden = nav.classList.contains("hidden");
    mobileBtn.innerHTML = isHidden ? '<i class="fas fa-bars"></i>' : '<i class="fas fa-times"></i>';
  });
});