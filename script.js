// Smooth scrolling untuk navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Form submission handler
document
  .querySelector(".contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Ambil nilai dari form
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector("textarea").value;

    // Validasi sederhana
    if (!name || !email || !message) {
      alert("Mohon lengkapi semua field!");
      return;
    }

    // Simulasi pengiriman pesan
    alert("Terima kasih! Pesan Anda telah terkirim.");
    this.reset();
  });

// Animation untuk skill bars saat scroll
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const skillBars = entry.target.querySelectorAll(".skill-progress");
      skillBars.forEach((bar) => {
        const width = bar.style.width;
        bar.style.width = "0";
        setTimeout(() => {
          bar.style.width = width;
        }, 100);
      });
    }
  });
}, observerOptions);

// Observe skills section
const skillsSection = document.querySelector(".skills");
if (skillsSection) {
  observer.observe(skillsSection);
}

// Navbar hide on scroll
let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", function () {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop && scrollTop > 80) {
    // Scroll ke bawah
    navbar.classList.add("hide-navbar");
  } else {
    // Scroll ke atas
    navbar.classList.remove("hide-navbar");
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Typing effect untuk hero title (hanya pada nama, bukan seluruh HTML)
function typeWriterNama(element, nama, speed = 100) {
  let i = 0;
  element.innerHTML =
    'Halo, Saya <span class="highlight">Mahasiswi Semester 5</span>';
  const span = element.querySelector(".highlight");
  span.textContent = "";
  function type() {
    if (i < nama.length) {
      span.textContent += nama.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Jalankan typing effect saat halaman dimuat
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero h1");
  if (heroTitle) {
    // Ambil nama dari span.highlight
    const span = heroTitle.querySelector(".highlight");
    const nama = span ? span.textContent : "Mahasiswi Semester 5";
    typeWriterNama(heroTitle, nama, 50);
  }
});

// Hover effect untuk project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Counter animation untuk stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start) + "+";
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + "+";
    }
  }

  updateCounter();
}

// Observe stats untuk animasi counter
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const stats = entry.target.querySelectorAll(".stat h3");
        stats.forEach((stat) => {
          const target = parseInt(stat.textContent);
          animateCounter(stat, target);
        });
      }
    });
  },
  { threshold: 0.5 }
);

const aboutSection = document.querySelector(".about");
if (aboutSection) {
  statsObserver.observe(aboutSection);
}

// Mobile menu toggle (jika diperlukan)
function createMobileMenu() {
  const navbar = document.querySelector(".navbar");
  const navMenu = document.querySelector(".nav-menu");

  // Tambahkan hamburger button untuk mobile
  const hamburger = document.createElement("div");
  hamburger.className = "hamburger";
  hamburger.innerHTML = `
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
    `;

  navbar.querySelector(".nav-container").appendChild(hamburger);

  // Toggle mobile menu
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Tutup menu saat link diklik
  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });
}

// Jalankan mobile menu jika diperlukan
if (window.innerWidth <= 768) {
  createMobileMenu();
}

// Responsive check
window.addEventListener("resize", () => {
  if (window.innerWidth <= 768) {
    if (!document.querySelector(".hamburger")) {
      createMobileMenu();
    }
  }
});

// Loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Tambahkan CSS untuk mobile menu
const mobileMenuCSS = `
    @media (max-width: 768px) {
        .hamburger {
            display: block;
            cursor: pointer;
        }
        
        .hamburger .bar {
            display: block;
            width: 25px;
            height: 3px;
            margin: 5px auto;
            background-color: #333;
            transition: all 0.3s ease;
        }
        
        .hamburger.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active .bar:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active .bar:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
        
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: white;
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            padding: 2rem 0;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu li {
            margin: 1rem 0;
        }
    }
    
    .hamburger {
        display: none;
    }
`;

// Inject CSS untuk mobile menu
const style = document.createElement("style");
style.textContent = mobileMenuCSS;
document.head.appendChild(style);
