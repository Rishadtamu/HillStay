let listings = [];

// Fetch listings from API
async function fetchListings() {
  try {
    const response = await fetch('/api/listings');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    listings = await response.json();
    renderListings(listings);
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

// App State
let state = {
  user: JSON.parse(localStorage.getItem("hillstayUser")) || null,
  trips: JSON.parse(localStorage.getItem("hillstayTrips")) || [],
  currentBooking: null
};

// Utils
function getStarHTML(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars += `<i class="fa-solid fa-circle"></i>`;
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars += `<i class="fa-solid fa-circle-half-stroke"></i>`;
    } else {
      stars += `<i class="fa-regular fa-circle"></i>`;
    }
  }
  return stars;
}

// Render Listings
function renderListings(data) {
  const grid = document.querySelector(".listing-grid");
  const listingSection = document.getElementById("all-stays-section");
  if (!grid) return;

  if (listingSection) listingSection.style.display = "block";
  grid.scrollIntoView({ behavior: 'smooth', block: 'start' });

  if (data.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #666;">
        <i class="fa-solid fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
        <h3>No stays found matching your search.</h3>
        <p>Try searching for "Darjeeling", "Sikkim", or "Homestay".</p>
        <button onclick="renderListings(listings)" style="margin-top: 1rem; padding: 10px 20px; background: var(--primary); color: white; border: none; border-radius: 6px; cursor: pointer;">Show All</button>
      </div>`;
    return;
  }

  grid.innerHTML = data.map(item => `
    <div class="listing-card" onclick="openPropertyDetails(${item.id})">
      <div class="card-img-container">
        <img src="${item.image}" alt="${item.title}">
        ${item.badge ? `<div class="card-badge">${item.badge}</div>` : ""}
        ${item.permit ? `<div class="permit-badge" title="Permit Required"><i class="fa-solid fa-passport"></i> Permit Needed</div>` : ""}
        <button class="favorite-btn" onclick="event.stopPropagation(); saveToTrips(${item.id})"><i class="fa-regular fa-heart"></i></button>
      </div>
      <div class="card-content">
        <h3 class="card-title">${item.title}</h3>
        <div class="card-location"><i class="fa-solid fa-location-dot"></i> ${item.location}</div>
        <div class="card-rating">
          <div class="bubbles">${getStarHTML(item.rating)}</div>
          <span class="review-count">${item.reviews.toLocaleString()} reviews</span>
        </div>
        <div class="card-price">
           ${item.price > 0 ? `₹${item.price.toLocaleString()} <span style="font-size:0.8em; color:#666; font-weight:400">/ night</span>` : 'Free / Paid Entry'}
        </div>
        
        <div class="action-buttons" style="display:flex; gap:10px; margin-top:1rem;">
             <button class="btn-book" onclick="event.stopPropagation(); openBookingModal(${item.id})" style="width:100%; background:var(--primary); color:white; border:none; padding:12px; border-radius:6px; cursor:pointer; font-weight:600;">${item.category === 'homestay' || item.category === 'resort' || item.category === 'camp' ? 'Book Now' : 'View Details'}</button>
        </div>
      </div>
    </div>
  `).join("");
}

// WhatsApp Function
function openWhatsApp(propertyName) {
  const text = `Hi, I'm interested in booking ${propertyName}. Can you provide details?`;
  window.open(`https://wa.me/919876543210?text=${encodeURIComponent(text)}`, '_blank');
}

// Search Functionality
// Mock Search Data
const searchData = [
  { name: "Darjeeling", type: "Place", location: "West Bengal" },
  { name: "Gangtok", type: "Place", location: "Sikkim" },
  { name: "Pelling", type: "Place", location: "Sikkim" },
  { name: "Tea Garden Homestay", type: "Homestay", location: "Darjeeling" },
  { name: "Clouds End Cottage", type: "Homestay", location: "Mussoorie" },
  { name: "Alpine Birding Stay", type: "Homestay", location: "Ravangla" },
  { name: "Glenary's", type: "Restaurant", location: "Darjeeling" },
  { name: "Keventers", type: "Restaurant", location: "Darjeeling" },
  { name: "Taste of Tibet", type: "Restaurant", location: "Gangtok" },
  { name: "Tiger Hill Sunrise", type: "Things to do", location: "Darjeeling" },
  { name: "River Rafting", type: "Things to do", location: "Teesta River" },
  { name: "Tsomgo Lake Visit", type: "Things to do", location: "Sikkim" },
  { name: "Nathula Pass", type: "Things to do", location: "Sikkim" },
  { name: "Nagaland", type: "Place", location: "North East" },
  { name: "Kohima", type: "Place", location: "Nagaland" },
  { name: "Khonoma Heritage Stay", type: "Homestay", location: "Nagaland" },
  { name: "Mokokchung Village Homestay", type: "Homestay", location: "Nagaland" }
];

// Search Functionality
// Search Functionality
function setupSearch() {
  const searchInput = document.querySelector(".search-input-group input[type='text']");
  const suggestionsBox = document.querySelector(".search-suggestions");
  const searchBtn = document.querySelector(".btn-search");

  if (!searchInput || !suggestionsBox) return;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();

    if (query.length < 2) {
      suggestionsBox.style.display = "none";
      return;
    }

    const filteredData = searchData.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query)
    );

    renderSuggestions(filteredData, suggestionsBox);
  });

  // Close suggestions when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-widget")) {
      suggestionsBox.style.display = "none";
    }
  });

  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const query = searchInput.value.toLowerCase();
      performSearch(query);
    });
  }
}

function performSearch(query) {
  if (!query) {
    renderListings(listings);
    return;
  }

  const filtered = listings.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.location.toLowerCase().includes(query)
  );

  renderListings(filtered);

  // Scroll to results
  const section = document.querySelector(".featured-section");
  if (section) {
    // Offset for fixed header if any, or just scroll
    const yOffset = -100;
    const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  // Close suggestions
  document.querySelector(".search-suggestions").style.display = "none";
}

function renderSuggestions(data, container) {
  if (data.length === 0) {
    container.style.display = "none";
    return;
  }

  const grouped = data.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {});

  let html = "";

  // Custom order: Place, Homestay, Restaurant, Things to do
  const order = ["Place", "Homestay", "Restaurant", "Things to do"];

  order.forEach(type => {
    if (grouped[type]) {
      html += `<div class="suggestion-category">${type}</div>`;
      grouped[type].forEach(item => {
        let icon = "fa-location-dot";
        if (type === "Homestay") icon = "fa-bed";
        if (type === "Restaurant") icon = "fa-utensils";
        if (type === "Things to do") icon = "fa-person-walking";

        html += `
          <div class="suggestion-item" onclick="selectSuggestion('${item.name}')">
            <i class="fa-solid ${icon}"></i>
            <span>${item.name}</span>
            <span class="suggestion-meta">${item.location}</span>
          </div>
        `;
      });
    }
  });

  container.innerHTML = html;
  container.style.display = "block";
}

function selectSuggestion(name) {
  const searchInput = document.querySelector(".search-input-group input[type='text']");
  searchInput.value = name;
  document.querySelector(".search-suggestions").style.display = "none";
  performSearch(name.toLowerCase());
}

// Initialize everything on DOM load
function initAll() {
  startHeroSlider();
  fetchListings(); // Fetch from API or render default
  setupSearch();
  updateAuthUI();
  initStoryAnimations();
  highlightActiveNav();
  setupMobileMenu();
  initDealsSlider();

  // Scroll listener for sticky header
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".main-header");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

document.addEventListener("DOMContentLoaded", initAll);

function highlightActiveNav() {
  const path = window.location.pathname;
  if (path.includes("reviews.html")) document.getElementById("nav-review")?.classList.add("active");
  if (path.includes("trips.html")) document.getElementById("nav-trips")?.classList.add("active");
  if (path.includes("alerts.html")) document.getElementById("nav-alerts")?.classList.add("active");
}

// Auth Functions
function updateAuthUI() {
  const desktopContainers = document.querySelectorAll('.header-actions');
  const mobileContainers = document.querySelectorAll('.header-actions-mobile');

  const allContainers = [...desktopContainers, ...mobileContainers];
  if (allContainers.length === 0) return;

  allContainers.forEach(container => {
    if (state.user) {
      container.innerHTML = `
        <div class="user-profile">
          <div class="user-avatar" onclick="toggleUserMenu()">
            <img src="${state.user.photo}" alt="${state.user.name}">
          </div>
          <div class="user-menu" id="user-menu">
            <div class="user-menu-header">
              <strong>${state.user.name}</strong>
              <span>${state.user.email}</span>
            </div>
            <a href="#"><i class="fa-solid fa-user"></i> My Profile</a>
            <a href="trips.html"><i class="fa-solid fa-suitcase"></i> My Trips</a>
            <button onclick="logout()" class="btn-logout"><i class="fa-solid fa-right-from-bracket"></i> Logout</button>
          </div>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="user-profile">
          <button onclick="toggleLoginMenu()" class="btn-signin" aria-label="Sign In">
            <i class="fa-solid fa-user"></i> <span class="signin-text">Sign In / Profile</span>
          </button>
          
          <div class="user-menu" id="login-menu">
            <div class="user-menu-header">
              <img src="images/logo_tent_transparent.png" alt="HillStay Logo" style="height: 40px; width: 40px; object-fit: contain; background: white; border-radius: 50%; padding: 5px; margin-bottom: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
              <strong>Sign In</strong>
              <span>Explore mountain escapes</span>
            </div>
            <button class="btn-social google-btn" onclick="loginWithGoogle()" style="width: 100%; text-align: left; padding: 0.8rem; border-radius: 8px; border: 1px solid #ddd; background: white; cursor: pointer; display: flex; align-items: center; gap: 10px; margin-top: 10px;">
              <i class="fa-brands fa-google" style="color: #DB4437; font-size: 18px;"></i>
              Continue with Google
            </button>
          </div>
        </div>
      `;
    }
  });
}

function toggleLoginMenu() {
  const menu = document.getElementById('login-menu');
  if (menu) menu.classList.toggle('active');
}

function loginWithGoogle() {
  // Simulate Google OAuth redirect and success
  const btn = document.querySelector('.google-btn');
  btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Connecting to Gmail...`;

  setTimeout(() => {
    state.user = {
      name: "Tenzing Norgay",
      email: "tenzing@gmail.com",
      photo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"
    };
    localStorage.setItem("hillstayUser", JSON.stringify(state.user));
    const loginMenu = document.getElementById('login-menu');
    if (loginMenu) loginMenu.classList.remove('active');
    updateAuthUI();
    alert("Logged in successfully with Gmail!");
  }, 1500);
}

function mockLogin() {
  alert("For this demo, please use 'Continue with Google'");
}

function logout() {
  state.user = null;
  localStorage.removeItem("hillstayUser");
  updateAuthUI();
  alert("You have been logged out.");
}

function toggleUserMenu() {
  const menu = document.getElementById('user-menu');
  if (menu) menu.classList.toggle('active');
}

// Close User/Login Menu on Outside Click
document.addEventListener('click', (e) => {
  if (!e.target.closest('.user-profile')) {
    const userMenu = document.getElementById('user-menu');
    const loginMenu = document.getElementById('login-menu');
    if (userMenu) userMenu.classList.remove('active');
    if (loginMenu) loginMenu.classList.remove('active');
  }
});



// Story Scroll Animations (Intersection Observer)
function initStoryAnimations() {
  const items = document.querySelectorAll(".adv-story-item");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.3 });

  items.forEach(item => observer.observe(item));
}

// Room Details with Amenities (Override existing openPropertyDetails)
const originalOpenPropertyDetails = openPropertyDetails;
openPropertyDetails = function (id) {
  originalOpenPropertyDetails(id);
  // Add specific layout for amenities if needed, though the baseline modal already has it
};

function saveToTrips(id) {
  const item = listings.find(l => l.id === id);
  if (!item) return;

  const trips = JSON.parse(localStorage.getItem("hillstayTrips")) || [];
  if (trips.some(t => t.id === id)) {
    alert("Already in your favorites!");
    return;
  }

  trips.push({
    id: item.id,
    title: item.title,
    date: new Date().toLocaleDateString()
  });

  localStorage.setItem("hillstayTrips", JSON.stringify(trips));
  alert("Added to your trips!");
}

// Booking Modal Logic
function openBookingModal(id) {
  const item = listings.find(l => l.id === id);
  if (!item) return;

  // Close details modal if open
  const detailsModal = document.getElementById("property-details-modal");
  if (detailsModal) detailsModal.remove();

  const modalHTML = `
    <div id="booking-modal" style="position:fixed; inset:0; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:2000;">
        <div style="background:white; padding:2rem; border-radius:12px; max-width:450px; width:90%; max-height: 90vh; overflow-y: auto;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 1.5rem;">
               <h3 style="margin:0;">Book ${item.title}</h3>
               <button onclick="document.getElementById('booking-modal').remove()" style="background:none; border:none; font-size: 1.5rem; cursor:pointer;">&times;</button>
            </div>

            <div style="margin-bottom: 1.5rem;">
                <div style="display:flex; gap:10px; margin-bottom: 10px;">
                    <label style="flex:1;">Check-in <input type="date" id="checkin" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:6px;"></label>
                    <label style="flex:1;">Check-out <input type="date" id="checkout" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:6px;"></label>
                </div>
                <label>Guests <input type="number" id="guests" min="1" value="2" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:6px;"></label>
            </div>

            ${item.suggestedGuide ? `
               <div class="guide-card">
                 <div class="guide-header">
                   <span class="guide-name"><i class="fa-solid fa-user-check" style="color:var(--primary);"></i> Recommended Guide</span>
                   <span class="guide-price">₹${item.suggestedGuide.price}</span>
                 </div>
                 <div style="font-weight: 600; font-size: 0.9rem;">${item.suggestedGuide.name} <span style="color:#f5a623;">★ ${item.suggestedGuide.rating}</span></div>
                 <p class="guide-bio">${item.suggestedGuide.bio}</p>
                 <div class="guide-select-group">
                   <input type="checkbox" id="add-guide" class="guide-checkbox" onchange="updateTotalPrice(${item.price}, ${item.suggestedGuide.price})">
                   <label for="add-guide" style="font-weight: 500; cursor: pointer;">Include this guide in my trip</label>
                 </div>
               </div>
            ` : ''}

            <div style="background: #f9f9f9; padding: 1.5rem; border-radius: 10px; margin-bottom: 1.5rem;">
               <div style="display:flex; justify-content:space-between; margin-bottom: 5px;">
                 <span>Stay price</span>
                 <span>₹${item.price.toLocaleString()}</span>
               </div>
               <div id="guide-price-row" style="display:none; justify-content:space-between; margin-bottom: 5px;">
                 <span>Guide fee</span>
                 <span>₹${item.suggestedGuide ? item.suggestedGuide.price.toLocaleString() : 0}</span>
               </div>
               <div style="display:flex; justify-content:space-between; margin-top: 10px; padding-top: 10px; border-top: 1px solid #eee; font-weight: 700; font-size: 1.1rem;">
                 <span>Total</span>
                 <span id="total-price">₹${item.price.toLocaleString()}</span>
               </div>
            </div>

            <button onclick="confirmBooking('${item.title}')" style="width:100%; padding:15px; border:none; background:var(--primary); color:white; font-weight:700; border-radius:8px; cursor:pointer;">Confirm & Pay</button>
        </div>
    </div>
    `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function updateTotalPrice(stayPrice, guidePrice) {
  const checkbox = document.getElementById('add-guide');
  const totalPriceElem = document.getElementById('total-price');
  const guidePriceRow = document.getElementById('guide-price-row');

  if (checkbox && checkbox.checked) {
    totalPriceElem.innerText = `₹${(stayPrice + guidePrice).toLocaleString()}`;
    guidePriceRow.style.display = 'flex';
  } else {
    totalPriceElem.innerText = `₹${stayPrice.toLocaleString()}`;
    guidePriceRow.style.display = 'none';
  }
}

function confirmBooking(title) {
  const guideChecked = document.getElementById('add-guide') ? document.getElementById('add-guide').checked : false;
  const totalPrice = document.getElementById('total-price').innerText;

  let message = `Booking Confirmed for ${title}!`;
  if (guideChecked) message += ` Your local guide has also been scheduled.`;
  message += ` Total Paid: ${totalPrice}. Check your email/WhatsApp for details.`;

  alert(message);
  document.getElementById('booking-modal').remove();

  // Save to trips
  state.trips.push({
    title,
    date: new Date().toDateString(),
    total: totalPrice,
    hasGuide: guideChecked
  });
  localStorage.setItem("hillstayTrips", JSON.stringify(state.trips));
}

function saveToTrips(id) {
  alert("Added to your Favorites!");
}

// Hero Slider
function startHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const heroHeading = document.querySelector('.hero-content h1');
  if (slides.length < 2 || !heroHeading) return;

  let currentSlide = 0;

  // Set initial text from active slide
  const initialTitle = slides[currentSlide].getAttribute('data-title');
  if (initialTitle) heroHeading.textContent = initialTitle;

  setInterval(() => {
    // Animation for heading
    heroHeading.style.opacity = '0';
    heroHeading.style.transform = 'translateY(-20px)';

    setTimeout(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');

      // Update text
      const newTitle = slides[currentSlide].getAttribute('data-title');
      if (newTitle) {
        heroHeading.textContent = newTitle;
      }

      // Fade back in
      heroHeading.style.opacity = '1';
      heroHeading.style.transform = 'translateY(0)';
    }, 600); // Time to match slide transition overlap
  }, 5000);
}


// Mobile Menu
function setupMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const menuClose = document.querySelector('.menu-close');
  let navLinks = document.querySelector('.nav-links');

  if (!menuToggle || !navLinks) return;

  // Ensure only one backdrop exists
  let backdrop = document.querySelector('.nav-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    document.body.appendChild(backdrop);
  }

  // Use a named function to avoid duplicate listeners if called multiple times
  const handleToggle = (e) => {
    if (e) e.stopPropagation();
    const isOpen = navLinks.classList.toggle('active');
    backdrop.classList.toggle('active');

    // Change icon from bars to xmark
    const icon = menuToggle.querySelector('i');
    if (isOpen) {
      if (icon) icon.classList.replace('fa-bars', 'fa-xmark');
      document.body.style.overflow = 'hidden'; // Prevent scroll
    } else {
      if (icon) icon.classList.replace('fa-xmark', 'fa-bars');
      document.body.style.overflow = '';
    }
  };

  // Remove old listener if it exists (though not easy with anonymous functions)
  // Better to check a flag
  if (!menuToggle.dataset.menuInitialized) {
    menuToggle.addEventListener('click', handleToggle);

    // Close menu when clicking backdrop
    backdrop.addEventListener('click', () => {
      navLinks.classList.remove('active');
      backdrop.classList.remove('active');
      const icon = menuToggle.querySelector('i');
      if (icon) icon.classList.replace('fa-xmark', 'fa-bars');
      document.body.style.overflow = '';
    });

    // Close menu when link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        backdrop.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) icon.classList.replace('fa-xmark', 'fa-bars');
        document.body.style.overflow = '';
      });
    });

    // Close menu when X is clicked
    if (menuClose) {
      menuClose.addEventListener('click', () => {
        navLinks.classList.remove('active');
        backdrop.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) icon.classList.replace('fa-xmark', 'fa-bars');
        document.body.style.overflow = '';
      });
    }

    // Language selection UI
    const langOpts = document.querySelectorAll('.lang-opt');
    const desktopLangIndicator = document.querySelector('.current-lang');

    langOpts.forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const selectedLang = opt.dataset.lang;
        const langName = opt.textContent;

        // Update Mobile UI
        langOpts.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');

        // Update Desktop UI
        if (desktopLangIndicator) {
          desktopLangIndicator.textContent = selectedLang.toUpperCase();
        }

        // Save choice
        localStorage.setItem('hillstay_language', selectedLang);
        console.log(`Language changed to: ${langName}`);
      });
    });

    // Search tabs UI
    const searchTabs = document.querySelectorAll('.search-tab');
    searchTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        searchTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });

    menuToggle.dataset.menuInitialized = "true";
  }
}

// Global Scroll Handler
function handleScroll() {
  const header = document.querySelector('.main-header');
  const stickySearch = document.getElementById('sticky-search');
  const menuToggle = document.querySelector('.menu-toggle');
  const langSwitcher = document.querySelector('.header-lang-switcher');

  if (!header) return;

  if (window.scrollY > 50) {
    header.classList.add('scrolled');
    if (menuToggle) menuToggle.classList.add('scrolled');
    if (langSwitcher) langSwitcher.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
    if (menuToggle) menuToggle.classList.remove('scrolled');
    if (langSwitcher) langSwitcher.classList.remove('scrolled');
  }

  // Sticky Search Bar logic
  if (stickySearch) {
    if (window.scrollY > 400) { // Show after scrolling past hero
      stickySearch.classList.add('active');
    } else {
      stickySearch.classList.remove('active');
    }
  }
}

// Persist language on load
function initLanguage() {
  const savedLang = localStorage.getItem('hillstay_language') || 'en';
  const desktopLangIndicator = document.querySelector('.current-lang');
  if (desktopLangIndicator) desktopLangIndicator.textContent = savedLang.toUpperCase();

  document.querySelectorAll('.lang-opt').forEach(opt => {
    if (opt.dataset.lang === savedLang) {
      opt.classList.add('active');
    } else {
      opt.classList.remove('active');
    }
  });
}

// Destinations Carousel Setup
function initDestinationCarousel() {
  const track = document.getElementById('destinations-track');
  const prevBtn = document.querySelector('.dest-prev');
  const nextBtn = document.querySelector('.dest-next');

  if (!track || !prevBtn || !nextBtn) return;

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: 300, behavior: 'smooth' }); // Scroll by card width + gap
  });

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -300, behavior: 'smooth' });
  });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
  startHeroSlider();
  setupMobileMenu();
  initLanguage();
  initDestinationCarousel();
  window.addEventListener('scroll', handleScroll);
});

// Etihad-style Deals Slider Logic
function initDealsSlider() {
  const track = document.querySelector('.deals-slider-track');
  const cards = document.querySelectorAll('.deal-card');
  const dots = document.querySelectorAll('.deals-pagination .dot');
  const prevBtn = document.querySelector('.deals-nav-btn.prev');
  const nextBtn = document.querySelector('.deals-nav-btn.next');

  if (!track || cards.length === 0) return;

  function updateActiveState() {
    const trackRect = track.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;

    let closestCard = null;
    let minDistance = Infinity;

    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(trackCenter - cardCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestCard = index;
      }
    });

    // Update classes
    cards.forEach((card, index) => {
      if (index === closestCard) {
        card.classList.add('active');
        dots[index]?.classList.add('active');
      } else {
        card.classList.remove('active');
        dots[index]?.classList.remove('active');
      }
    });
  }

  // Silky-smooth real-time scroll updates
  let ticking = false;
  track.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveState();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Navigation Arrows
  prevBtn?.addEventListener('click', () => {
    const currentIndex = Array.from(cards).findIndex(c => c.classList.contains('active'));
    const nextIndex = Math.max(0, currentIndex - 1);
    scrollToCard(nextIndex);
  });

  nextBtn?.addEventListener('click', () => {
    const currentIndex = Array.from(cards).findIndex(c => c.classList.contains('active'));
    const nextIndex = Math.min(cards.length - 1, currentIndex + 1);
    scrollToCard(nextIndex);
  });

  // Pagination Dots
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      scrollToCard(index);
    });
  });

  function scrollToCard(index) {
    const card = cards[index];
    if (!card) return;

    const trackWidth = track.offsetWidth;
    const cardWidth = card.offsetWidth;
    const cardOffset = card.offsetLeft;

    // Calculate scroll position to center the card
    const scrollPos = cardOffset - (trackWidth / 2) + (cardWidth / 2);

    track.scrollTo({
      left: scrollPos,
      behavior: 'smooth'
    });

    // Manually trigger update after scroll animation (approximate)
    setTimeout(updateActiveState, 600);
  }

  // Initial call
  updateActiveState();
}

