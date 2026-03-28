let listings = [];

// Fetch listings from API
async function fetchListings() {
  // Only fetch and render on pages that need dynamic listings
  const path = window.location.pathname;
  const isListingPage = path.includes('index.html') || path.includes('homestay.html') || path === '/' || path.endsWith('/');

  try {
    const response = await fetch('/api/listings');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    listings = await response.json();
    // Only populate the listing grid on relevant pages
    if (isListingPage) {
      renderListings(listings);
    }
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

// App State
let state = {
  user: JSON.parse(localStorage.getItem("hilligoUser")) || null,
  trips: JSON.parse(localStorage.getItem("hilligoTrips")) || [],
  currentBooking: null
};

// Utils
function getStarHTML(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars += `<i class="fa-solid fa-star" style="color:var(--accent);"></i>`;
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars += `<i class="fa-solid fa-star-half-stroke" style="color:var(--accent);"></i>`;
    } else {
      stars += `<i class="fa-regular fa-star" style="color:var(--accent);"></i>`;
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
        
        <div class="live-status" style="font-size: 0.75rem; color: #d32f2f; margin-top: 8px; display: flex; align-items: center; gap: 5px;">
           <span class="live-pulse"></span>
           <span>${Math.floor(Math.random() * 8) + 3} people looking at this right now</span>
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
  { name: "Darjeeling", type: "Place", location: "West Bengal", url: "homestay.html?q=Darjeeling" },
  { name: "Gangtok", type: "Place", location: "Sikkim", url: "homestay.html?q=Gangtok" },
  { name: "Pelling", type: "Place", location: "Sikkim", url: "homestay.html?q=Pelling" },
  { name: "Nagaland", type: "Place", location: "North East India", url: "homestay.html?q=Nagaland" },
  { name: "Kohima", type: "Place", location: "Nagaland", url: "homestay.html?q=Kohima" },
  { name: "Makaibari Tea Bungalow", type: "Homestay", location: "Kurseong, Darjeeling", url: "homestay.html" },
  { name: "Mirik Lakeside Bungalow", type: "Homestay", location: "Mirik, Darjeeling", url: "homestay.html" },
  { name: "Glenary's", type: "Restaurant", location: "Darjeeling", url: "restaurant.html" },
  { name: "Taste of Tibet", type: "Restaurant", location: "Gangtok", url: "restaurant.html" },
  { name: "Tiger Hill Sunrise", type: "Things to do", location: "Darjeeling", url: "experience.html" },
  { name: "River Rafting", type: "Things to do", location: "Teesta River", url: "experience.html" },
  { name: "Tsomgo Lake Visit", type: "Things to do", location: "Sikkim", url: "destination.html" },
  { name: "Dzukou Valley Trek", type: "Trekking", location: "Nagaland", url: "trekking.html" },
  { name: "Sandakphu Trek", type: "Trekking", location: "Darjeeling", url: "trekking.html" },
  { name: "Goechala Trek", type: "Trekking", location: "Sikkim", url: "trekking.html" }
];

function setupSearch() {
  const searchInput = document.getElementById("sb-where") || document.querySelector(".search-input-group input[type='text']") || document.querySelector(".search-widget input[type='text']");
  const suggestionsBox = document.querySelector(".search-suggestions");
  const searchBtn = document.querySelector(".btn-search") || document.querySelector(".btn-sb-search");

  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();

    if (query.length < 1) {
      suggestionsBox.style.display = "none";
      return;
    }

    const filteredPlaces = searchData.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query)
    );

    const filteredListings = listings.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query)
    ).map(item => ({ name: item.title, type: "Homestay", location: item.location, url: `homestay.html?q=${encodeURIComponent(item.title)}` }));

    const combined = [...filteredPlaces, ...filteredListings];
    const unique = Array.from(new Set(combined.map(a => a.name)))
      .map(name => combined.find(a => a.name === name));

    renderSuggestions(unique, suggestionsBox);
  });

  // Enter key triggers search
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const query = searchInput.value.trim();
      if (!query) return;
      suggestionsBox.style.display = "none";
      if (window.location.pathname.includes('homestay.html')) {
        performSearch(query.toLowerCase());
      } else {
        window.location.href = `homestay.html?q=${encodeURIComponent(query)}`;
      }
    }
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-widget")) {
      suggestionsBox.style.display = "none";
    }
  });

  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const query = searchInput.value.trim();
      if (!query) return;
      suggestionsBox.style.display = "none";
      if (window.location.pathname.includes('homestay.html')) {
        performSearch(query.toLowerCase());
      } else {
        window.location.href = `homestay.html?q=${encodeURIComponent(query)}`;
      }
    });
  }

  // Handle URL query param (when redirected from index search)
  const urlParams = new URLSearchParams(window.location.search);
  const urlQuery = urlParams.get('q');
  if (urlQuery && window.location.pathname.includes('homestay.html')) {
    searchInput.value = urlQuery;
    // Wait for listings to load before filtering
    const waitForListings = setInterval(() => {
      if (listings.length > 0) {
        clearInterval(waitForListings);
        performSearch(urlQuery.toLowerCase());
      }
    }, 100);
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

  const order = ["Place", "Homestay", "Restaurant", "Things to do", "Trekking"];

  order.forEach(type => {
    if (grouped[type]) {
      html += `<div class="suggestion-category">${type}</div>`;
      grouped[type].forEach(item => {
        let icon = "fa-location-dot";
        if (type === "Homestay") icon = "fa-bed";
        if (type === "Restaurant") icon = "fa-utensils";
        if (type === "Things to do") icon = "fa-person-hiking";
        if (type === "Trekking") icon = "fa-mountain-sun";
        const url = item.url || null;
        const onclickAttr = url
          ? `onclick="window.location.href='${url}'"`
          : `onclick="selectSuggestion('${item.name.replace(/'/g, "\\'")}')"`;

        html += `
          <div class="suggestion-item" ${onclickAttr}>
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
  const searchInput = document.getElementById("sb-where") || document.querySelector(".search-input-group input[type='text']") || document.querySelector(".search-widget input[type='text']");
  if (searchInput) searchInput.value = name;
  const suggestionsBox = document.querySelector(".search-suggestions");
  if (suggestionsBox) suggestionsBox.style.display = "none";
  performSearch(name.toLowerCase());
}

// Global search handler for the hero/quick search bar
function doHeroSearch() {
  const whereInput = document.getElementById('sb-where');
  const query = whereInput ? whereInput.value.trim() : '';
  
  if (!query) {
    window.location.href = 'homestay.html';
    return;
  }

  // If already on homestay page, just perform search
  if (window.location.pathname.includes('homestay.html')) {
    performSearch(query.toLowerCase());
  } else {
    // Redirect with query param
    window.location.href = `homestay.html?q=${encodeURIComponent(query)}`;
  }
}

window.doHeroSearch = doHeroSearch;

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

  // Start Real-time activity notifications
  startActivitySimulator();
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
              <img src="images/logo_tent_transparent.png" alt="Logo" style="height: 40px; width: 40px; object-fit: contain; background: white; border-radius: 50%; padding: 5px; margin-bottom: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
              <strong>Sign In</strong>
              <span>Explore mountain escapes</span>
            </div>
            
            <div style="padding: 0 1rem;">
                <input type="email" id="login-email" placeholder="Email" style="width:100%; padding:8px; margin-bottom:10px; border:1px solid #ddd; border-radius:6px;">
                <input type="password" id="login-password" placeholder="Password" style="width:100%; padding:8px; margin-bottom:10px; border:1px solid #ddd; border-radius:6px;">
                <div id="login-error" style="color:red; font-size:12px; margin-bottom:10px; display:none;"></div>
                <button onclick="loginWithEmail()" style="width:100%; background:var(--primary); color:white; border:none; padding:10px; border-radius:6px; cursor:pointer; font-weight:600; margin-bottom:10px;">Login / Sign Up</button>
            </div>

            <div style="text-align:center; font-size:12px; color:#666; margin-bottom:10px;">— OR —</div>

            <button class="btn-social google-btn" onclick="loginWithGoogle()" style="width: calc(100% - 2rem); margin: 0 1rem 1rem 1rem; text-align: left; padding: 0.8rem; border-radius: 8px; border: 1px solid #ddd; background: white; cursor: pointer; display: flex; align-items: center; gap: 10px;">
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
  if (menu) {
    menu.classList.toggle('active');
    // Close user menu if open
    const userMenu = document.getElementById('user-menu');
    if (userMenu) userMenu.classList.remove('active');
  }
}

function toggleUserMenu() {
  const menu = document.getElementById('user-menu');
  if (menu) {
    menu.classList.toggle('active');
  }
}

function logout() {
  state.user = null;
  localStorage.removeItem("usUser");
  updateAuthUI();
  location.reload();
}

async function loginWithEmail() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const errorDiv = document.getElementById('login-error');

  if (!email || !password || !email.includes('@')) {
    errorDiv.innerText = "Please provide valid email and password.";
    errorDiv.style.display = "block";
    return;
  }

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name: email.split('@')[0] })
    });
    const data = await response.json();
    if (response.ok) {
      state.user = data.user;
      localStorage.setItem("usUser", JSON.stringify(state.user));
      updateAuthUI();
      alert("Welcome back!");
    } else {
      errorDiv.innerText = data.error || "Login failed";
      errorDiv.style.display = "block";
    }
  } catch (e) {
    errorDiv.innerText = "Server connection error.";
    errorDiv.style.display = "block";
  }
}

function loginWithGoogle() {
  // Simulate Google OAuth redirect and success
  const btn = document.querySelector('.google-btn');
  btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Connecting to Gmail...`;

  setTimeout(async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: "Tenzing Norgay",
          email: "tenzing@gmail.com",
          photo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"
        })
      });
      const data = await response.json();
      if (response.ok && data.user) {
        state.user = data.user;
        localStorage.setItem("usUser", JSON.stringify(state.user));
        const loginMenu = document.getElementById('login-menu');
        if (loginMenu) loginMenu.classList.remove('active');
        updateAuthUI();
        alert("Logged in successfully with Gmail!");
      } else {
        alert("Login failed.");
        btn.innerHTML = `<i class="fa-brands fa-google" style="color: #DB4437; font-size: 18px;"></i> Continue with Google`;
      }
    } catch (e) {
      alert("Error connecting to server.");
      btn.innerHTML = `<i class="fa-brands fa-google" style="color: #DB4437; font-size: 18px;"></i> Continue with Google`;
    }
  }, 800);
}

function mockLogin() {
  alert("For this demo, please use 'Continue with Google'");
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

// openPropertyDetails is defined later in the file — no override needed here

function saveToTrips(id) {
  const item = listings.find(l => l.id === id);
  if (!item) return;

  const trips = JSON.parse(localStorage.getItem("usTrips")) || [];
  if (trips.some(t => t.id === id)) {
    alert("Already in your favorites!");
    return;
  }

  trips.push({
    id: item.id,
    title: item.title,
    date: new Date().toLocaleDateString()
  });

  localStorage.setItem("usTrips", JSON.stringify(trips));
  alert("Added to your trips!");
}

// Booking Modal Logic
// Can be called with (id) for DB listings, or (titleStr, priceNum) for static cards
function openBookingModal(idOrTitle, priceOverride) {
  let item;

  if (typeof idOrTitle === 'number') {
    // Called with DB listing id
    item = listings.find(l => l.id === idOrTitle);
  }

  // Fallback: called from static card with (title, price) or item not found in DB
  if (!item && typeof idOrTitle === 'string') {
    item = {
      id: null,
      title: idOrTitle,
      price: priceOverride || 0,
      suggestedGuide: null
    };
  }

  if (!item) return;

  // Close details modal if open
  const detailsModal = document.getElementById("property-details-modal");
  if (detailsModal) detailsModal.remove();

  // Also close any existing booking modal
  const existingModal = document.getElementById('booking-modal');
  if (existingModal) existingModal.remove();

  const modalHTML = `
    <div id="booking-modal" style="position:fixed; inset:0; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:2000;">
        <div style="background:white; padding:2rem; border-radius:12px; max-width:450px; width:90%; max-height: 90vh; overflow-y: auto; position:relative;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 1.5rem;">
               <h3 style="margin:0; font-size:1.1rem;">Book ${item.title}</h3>
               <button onclick="document.getElementById('booking-modal').remove()" style="background:none; border:none; font-size: 1.5rem; cursor:pointer; line-height:1;">&times;</button>
            </div>

            <div style="margin-bottom: 1.5rem;">
                <div style="margin-bottom:12px; padding:10px; border-radius:8px; font-size:0.85rem;" id="availability-notice">
                   <span style="color:#999;"><i class="fa-solid fa-circle-notch fa-spin"></i> Checking availability...</span>
                </div>
                <div style="display:flex; gap:10px; margin-bottom: 12px;">
                    <label style="flex:1; font-size:0.85rem; font-weight:600; color:#555;">Check-in<br><input type="date" id="checkin" min="${new Date().toISOString().split('T')[0]}" onchange="updateNightsPrice(${item.price})" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:6px; margin-top:4px;"></label>
                    <label style="flex:1; font-size:0.85rem; font-weight:600; color:#555;">Check-out<br><input type="date" id="checkout" min="${new Date().toISOString().split('T')[0]}" onchange="updateNightsPrice(${item.price})" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:6px; margin-top:4px;"></label>
                </div>
                <label style="font-size:0.85rem; font-weight:600; color:#555;">Guests</label>
                <div style="display:flex; align-items:center; gap:10px; margin-top:5px;">
                  <button onclick="updateGuests(-1)" style="width:34px; height:34px; border-radius:50%; border:1px solid #ddd; background:white; cursor:pointer; font-size:1.1rem;">-</button>
                  <input type="number" id="guests" min="1" value="2" style="flex:1; padding:8px; border:1px solid #ddd; border-radius:6px; text-align:center;">
                  <button onclick="updateGuests(1)" style="width:34px; height:34px; border-radius:50%; border:1px solid #ddd; background:white; cursor:pointer; font-size:1.1rem;">+</button>
                </div>
            </div>

            ${item.suggestedGuide ? `
               <div class="guide-card" style="background:#f8f9fa; padding:1rem; border-radius:10px; margin-bottom:1rem;">
                 <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                   <span style="font-weight:600;"><i class="fa-solid fa-user-check" style="color:var(--primary);"></i> Recommended Guide</span>
                   <span style="font-weight:700;">₹${item.suggestedGuide.price}/night</span>
                 </div>
                 <div style="font-size:0.85rem; margin-bottom:5px;">${item.suggestedGuide.name} <span style="color:#f5a623;">★ ${item.suggestedGuide.rating}</span></div>
                 <p style="font-size:0.8rem; color:#666; margin:0 0 10px;">${item.suggestedGuide.bio}</p>
                 <label style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:0.9rem;">
                   <input type="checkbox" id="add-guide" onchange="updateNightsPrice(${item.price})">
                   Include this guide
                 </label>
               </div>
            ` : ''}

            <div style="background: #f9f9f9; padding: 1.2rem; border-radius: 10px; margin-bottom: 1.5rem;">
               <div style="display:flex; justify-content:space-between; margin-bottom:6px; font-size:0.9rem;">
                 <span id="nights-label">₹${item.price.toLocaleString()} × 1 night</span>
                 <span id="stay-subtotal">₹${item.price.toLocaleString()}</span>
               </div>
               <div id="guide-price-row" style="display:none; justify-content:space-between; margin-bottom:6px; font-size:0.9rem;">
                 <span>Guide fee</span>
                 <span>₹${item.suggestedGuide ? item.suggestedGuide.price.toLocaleString() : 0}</span>
               </div>
               <div style="display:flex; justify-content:space-between; margin-top:10px; padding-top:10px; border-top: 1px solid #eee; font-weight: 700; font-size: 1.1rem;">
                 <span>Total</span>
                 <span id="total-price">₹${item.price.toLocaleString()}</span>
               </div>
            </div>

            <button onclick="proceedToPayment(${JSON.stringify(item.id)}, ${item.price})" style="width:100%; padding:15px; border:none; background:var(--primary); color:white; font-weight:700; border-radius:8px; cursor:pointer; font-size:1rem;">Proceed to Payment</button>
        </div>
    </div>
    `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // Fetch booked dates to show availability (only if listing has a real DB id)
  if (item.id) {
    fetch(`/api/bookings/listing/${item.id}`)
      .then(r => r.json())
      .then(bookings => {
        const notice = document.getElementById('availability-notice');
        if (!notice) return;
        if (bookings && bookings.length > 0) {
          let dates = bookings.slice(0, 3).map(b => `${b.checkin} → ${b.checkout}`).join(', ');
          notice.style.background = '#fff3cd';
          notice.innerHTML = `<i class="fa-solid fa-triangle-exclamation" style="color:#d97706;"></i> <strong>Unavailable:</strong> ${dates}`;
        } else {
          notice.style.background = '#e6f4ea';
          notice.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#2e7d32;"></i> <span style="color:#2e7d32;">Available — choose your dates!</span>`;
        }
      })
      .catch(() => {
        const notice = document.getElementById('availability-notice');
        if (notice) {
          notice.style.background = '#e6f4ea';
          notice.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#2e7d32;"></i> <span style="color:#2e7d32;">Available — choose your dates!</span>`;
        }
      });
  } else {
    const notice = document.getElementById('availability-notice');
    if (notice) {
      notice.style.background = '#e6f4ea';
      notice.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#2e7d32;"></i> <span style="color:#2e7d32;">Available — choose your dates!</span>`;
    }
  }
}

// Recalculate price based on selected dates and guide
function updateNightsPrice(pricePerNight) {
  const checkinVal = document.getElementById('checkin')?.value;
  const checkoutVal = document.getElementById('checkout')?.value;
  const guideCheckbox = document.getElementById('add-guide');
  const totalPriceElem = document.getElementById('total-price');
  const nightsLabel = document.getElementById('nights-label');
  const staySubtotal = document.getElementById('stay-subtotal');
  const guidePriceRow = document.getElementById('guide-price-row');

  let nights = 1;
  if (checkinVal && checkoutVal) {
    const diff = (new Date(checkoutVal) - new Date(checkinVal)) / (1000 * 60 * 60 * 24);
    if (diff > 0) nights = diff;
  }

  const stayTotal = pricePerNight * nights;
  let grandTotal = stayTotal;

  if (nightsLabel) nightsLabel.textContent = `₹${pricePerNight.toLocaleString()} × ${nights} night${nights > 1 ? 's' : ''}`;
  if (staySubtotal) staySubtotal.textContent = `₹${stayTotal.toLocaleString()}`;

  if (guideCheckbox && guideCheckbox.checked) {
    const guidePriceText = guidePriceRow?.querySelector('span:last-child')?.textContent || '₹0';
    const guidePrice = parseInt(guidePriceText.replace(/[^0-9]/g, '')) || 0;
    grandTotal += guidePrice * nights;
    if (guidePriceRow) guidePriceRow.style.display = 'flex';
  } else {
    if (guidePriceRow) guidePriceRow.style.display = 'none';
  }

  if (totalPriceElem) totalPriceElem.textContent = `₹${grandTotal.toLocaleString()}`;
}

function updateTotalPrice(stayPrice, guidePrice) {
  updateNightsPrice(stayPrice);
}

function proceedToPayment(listingId, pricePerNight) {
  if (!state.user) {
    const bm = document.getElementById('booking-modal');
    if (bm) bm.remove();
    alert("Please sign in first to book a stay.");
    toggleLoginMenu();
    return;
  }

  const checkinInput = document.getElementById('checkin').value;
  const checkoutInput = document.getElementById('checkout').value;
  const guestsInput = document.getElementById('guests');
  const guests = parseInt(guestsInput?.value) || 1;

  if (!checkinInput || !checkoutInput) {
    alert("Please select both check-in and check-out dates.");
    return;
  }

  const checkinDate = new Date(checkinInput);
  const checkoutDate = new Date(checkoutInput);
  if (checkoutDate <= checkinDate) {
    alert("Check-out date must be after check-in date.");
    return;
  }

  const diffTime = Math.abs(checkoutDate - checkinDate);
  const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

  const guideChecked = document.getElementById('add-guide')?.checked || false;

  // Resolve the item: either from DB listings (by id) or fallback with pricePerNight
  let item = listings.find(l => l.id === listingId);
  if (!item) {
    // Fallback for static cards — construct minimal item object
    const titleEl = document.querySelector('#booking-modal h3');
    const titleText = titleEl ? titleEl.textContent.replace('Book ', '') : 'Selected Stay';
    item = { id: null, title: titleText, price: pricePerNight || 0, suggestedGuide: null };
  }

  let rawTotal = item.price * nights;
  if (guideChecked && item.suggestedGuide) {
    rawTotal += item.suggestedGuide.price * nights;
  }

  document.getElementById('booking-modal').remove();
  openPaymentModal(item, checkinInput, checkoutInput, guests, guideChecked, rawTotal);
}

function openPaymentModal(item, checkin, checkout, guests, hasGuide, rawTotal) {
  const modalHTML = `
  <div id="payment-modal" style="position:fixed; inset:0; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index:2500;">
      <div style="background:#fff; padding:2rem; border-radius:12px; max-width:400px; width:90%; position:relative;">
          <button onclick="document.getElementById('payment-modal').remove()" style="position:absolute; top:15px; right:15px; background:none; border:none; font-size:1.5rem; cursor:pointer;">&times;</button>
          
          <div style="text-align: center; margin-bottom: 1.5rem;">
             <img src="images/logo_tent_transparent.png" alt="Logo" style="height: 50px; width: 50px; object-fit: contain; margin-bottom: 10px;">
             <h3 style="margin:0; color:var(--primary); font-family: 'Outfit', sans-serif;"><i class="fa-solid fa-shield-halved"></i> Secure Checkout</h3>
             <p style="color:#666; font-size:0.9rem; margin-top: 5px;">Total Amount: <strong style="color:#222; font-size:1.2rem;">₹${rawTotal.toLocaleString()}</strong></p>
          </div>
          
          <div style="margin-bottom: 1rem;">
              <label style="display:block; font-size:0.85rem; margin-bottom:5px; font-weight:600; color:#444;">Card Number</label>
              <div style="position:relative;">
                  <i class="fa-brands fa-cc-visa" style="position:absolute; left:12px; top:12px; color:#1434CB; font-size:1.2rem;"></i>
                  <input type="text" placeholder="0000 0000 0000 0000" maxlength="19" style="width:100%; padding:10px 10px 10px 42px; border:1px solid #ccc; border-radius:6px; font-size:1rem; box-sizing: border-box;" oninput="this.value = this.value.replace(/[^0-9 ]/g, '')" id="pay-card">
              </div>
          </div>
          
          <div style="display:flex; gap:10px; margin-bottom: 1.5rem;">
              <div style="flex:1;">
                  <label style="display:block; font-size:0.85rem; margin-bottom:5px; font-weight:600; color:#444;">Expiry</label>
                  <input type="text" placeholder="MM/YY" maxlength="5" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px; box-sizing: border-box;" id="pay-exp">
              </div>
              <div style="flex:1;">
                  <label style="display:block; font-size:0.85rem; margin-bottom:5px; font-weight:600; color:#444;">CVV</label>
                  <input type="password" placeholder="123" maxlength="3" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px; box-sizing: border-box;" id="pay-cvv">
              </div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 1rem; font-size: 0.8rem; color: #888;">
             <span><i class="fa-solid fa-lock"></i> SSL Encrypted</span>
             <span>Powered by <strong>Secure Pay</strong></span>
          </div>
          
          <button id="btn-pay-now" onclick="processPayment(${item.id}, '${checkin}', '${checkout}', ${guests}, ${hasGuide}, ${rawTotal}, '${item.title}')" style="width:100%; padding:14px; background:var(--gold); color:var(--dark); border:none; border-radius:6px; font-family: 'Outfit', sans-serif; font-weight:bold; font-size:1.1rem; cursor:pointer; display:flex; justify-content:center; align-items:center; transition: all 0.3s ease;">
              Pay ₹${rawTotal.toLocaleString()}
          </button>
      </div>
  </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

async function processPayment(listingId, checkin, checkout, guests, hasGuide, rawTotal, title) {
  const card = document.getElementById('pay-card').value;
  const exp = document.getElementById('pay-exp').value;
  const cvv = document.getElementById('pay-cvv').value;

  const cleanCard = card.replace(/\s/g, '');
  if (cleanCard.length < 15 || exp.length < 4 || cvv.length < 3) {
    alert("Please enter valid card details. Any 16-digit number works for demo.");
    return;
  }

  const btn = document.getElementById('btn-pay-now');
  btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin" style="margin-right:8px;"></i> Processing Payment...`;
  btn.disabled = true;
  btn.style.opacity = '0.8';

  await new Promise(res => setTimeout(res, 2000));

  // Resolve item for the trip record
  const item = listings.find(l => l.id === listingId);
  const resolvedTitle = (item && item.title) ? item.title : title;

  try {
    // Only post to API if we have a real DB listingId
    if (listingId) {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: state.user.id || 1,
          listingId,
          checkin,
          checkout,
          guests,
          totalPrice: rawTotal,
          hasGuide
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Booking failed');
      }
    }

    // Always record in localStorage trips
    document.getElementById('payment-modal').remove();
    state.trips.push({
      title: resolvedTitle,
      checkin,
      checkout,
      date: new Date().toDateString(),
      total: `₹${rawTotal.toLocaleString()}`,
      hasGuide,
      image: item ? item.image : '',
      location: item ? item.location : ''
    });
    localStorage.setItem("hilligoTrips", JSON.stringify(state.trips));
    showSuccessModal(resolvedTitle);

  } catch (err) {
    alert("Error processing payment: " + err.message);
    btn.innerHTML = `Pay ₹${rawTotal.toLocaleString()}`;
    btn.disabled = false;
    btn.style.opacity = '1';
  }
}

function showSuccessModal(title) {
  const modalHTML = `
  <div id="success-modal" style="position:fixed; inset:0; background:rgba(0,0,0,0.7); display:flex; align-items:center; justify-content:center; z-index:3000;">
      <div style="background:#fff; padding:3rem; border-radius:16px; max-width:450px; width:90%; text-align:center; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
          <div style="width:80px; height:80px; background:#4CAF50; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 1.5rem auto; box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4);">
              <i class="fa-solid fa-check" style="font-size:3rem; color:white;"></i>
          </div>
          <h2 style="margin-top:0; color:#333; font-family: 'Outfit', sans-serif;">Payment Successful!</h2>
          <p style="color:#666; font-size:1.1rem; margin-bottom:2rem; line-height: 1.5;">Your stay at <strong>${title}</strong> has been secured. Your host has been notified.</p>
          <a href="trips.html" onclick="document.getElementById('success-modal').remove()" style="display:inline-block; padding:12px 30px; background:var(--primary); color:white; border-radius:8px; font-weight:bold; text-decoration: none; font-family: 'Outfit', sans-serif; cursor:pointer; transition: all 0.3s ease;">View My Trips</a>
      </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function saveToTrips(id) {
  const item = typeof id === 'number' ? listings.find(l => l.id === id) : null;
  const trips = JSON.parse(localStorage.getItem("hilligoTrips")) || [];
  if (item && trips.some(t => t.id === item.id)) {
    alert("Already in your favorites!");
    return;
  }
  if (item) {
    trips.push({ id: item.id, title: item.title, date: new Date().toLocaleDateString(), image: item.image || '', location: item.location || '' });
    localStorage.setItem("hilligoTrips", JSON.stringify(trips));
  }
  alert("Added to your Favorites! ❤️");
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
        localStorage.setItem('hilligo_language', selectedLang);
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
  const savedLang = localStorage.getItem('hilligo_language') || 'en';
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

function startActivitySimulator() {
  const activities = [
    "Someone from Delhi just booked Tea Garden Retreat!",
    "A guest from Mumbai is looking at Alpine Birding Stay.",
    "Only 2 rooms left for next weekend in Pelling!",
    "New review: 'Amazing hospitality in Darjeeling!' - Rahul",
    "Someone from Bangalore just inquired about Trekking tours."
  ];

  setInterval(() => {
    if (Math.random() > 0.4) return;
    const activity = activities[Math.floor(Math.random() * activities.length)];
    showActivityToast(activity);
  }, 12000);
}

function showActivityToast(message) {
  let toast = document.querySelector('.activity-toast');
  if (toast) toast.remove();

  toast = document.createElement('div');
  toast.className = 'activity-toast';
  toast.innerHTML = `
    <i class="fa-solid fa-bolt-lightning" style="color: #f5a623;"></i>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('visible'), 100);
  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 500);
  }, 4500);
}
function updateGuests(val) {
  const input = document.getElementById('guests');
  if (!input) return;
  let current = parseInt(input.value) || 0;
  let nouveau = current + val;
  if (nouveau < 1) nouveau = 1;
  input.value = nouveau;
}

// Add event listener for manual guest input validation
document.addEventListener('input', (e) => {
  if (e.target.id === 'guests') {
    if (e.target.value < 1) e.target.value = 1;
  }
});

// Help prevent some console errors for missing elements
function safeGet(id) {
  return document.getElementById(id);
}

// Ensure images lazy load
document.addEventListener('DOMContentLoaded', () => {
  const imgs = document.querySelectorAll('img');
  imgs.forEach(img => {
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
  });
});

// Open Property Details Modal - shows listing info before booking
function openPropertyDetails(id) {
  const item = listings.find(l => l.id === id);
  if (!item) {
    // If listing not loaded yet, go straight to booking
    openBookingModal(id);
    return;
  }

  const existingModal = document.getElementById('property-details-modal');
  if (existingModal) existingModal.remove();

  const modalHTML = `
  <div id="property-details-modal" style="position:fixed; inset:0; background:rgba(0,0,0,0.55); display:flex; align-items:center; justify-content:center; z-index:1500; padding:1rem;">
    <div style="background:#fff; border-radius:16px; max-width:560px; width:100%; max-height:90vh; overflow-y:auto; position:relative;">
      <button onclick="document.getElementById('property-details-modal').remove()" style="position:absolute; top:14px; right:16px; background:none; border:none; font-size:1.5rem; cursor:pointer; z-index:10; line-height:1;">&times;</button>
      <div style="height:240px; overflow:hidden; border-radius:16px 16px 0 0; position:relative;">
        <img src="${item.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600'}" alt="${item.title}" style="width:100%; height:100%; object-fit:cover;">
        ${item.badge ? `<div style="position:absolute; top:14px; left:14px; background:var(--accent); color:white; padding:4px 14px; border-radius:50px; font-size:0.77rem; font-weight:700; text-transform:uppercase; letter-spacing:0.5px;">${item.badge}</div>` : ''}
      </div>
      <div style="padding:1.6rem;">
        <h2 style="margin:0 0 0.3rem; font-size:1.3rem; color:var(--text-main);">${item.title}</h2>
        <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.8rem; display:flex; align-items:center; gap:5px;">
          <i class="fa-solid fa-location-dot" style="color:var(--accent);"></i> ${item.location}
        </div>
        <div style="display:flex; align-items:center; gap:1rem; margin-bottom:1.2rem;">
          <div style="font-size:0.9rem; color:#555;"><i class="fa-solid fa-star" style="color:var(--accent);"></i> <strong>${item.rating}</strong> (${item.reviews.toLocaleString()} reviews)</div>
          ${item.permit ? '<div style="font-size:0.82rem; background:#fff3cd; color:#856404; padding:3px 10px; border-radius:50px;"><i class="fa-solid fa-passport"></i> Permit Required</div>' : ''}
        </div>
        ${item.description ? `<p style="font-size:0.9rem; color:#555; line-height:1.7; margin-bottom:1.2rem;">${item.description}</p>` : ''}
        ${item.host ? `<div style="display:flex; align-items:center; gap:10px; background:#f8f9fa; padding:0.9rem; border-radius:10px; margin-bottom:1.2rem;">
          <div style="width:42px; height:42px; background:var(--primary); border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--accent); font-size:1.1rem; flex-shrink:0;"><i class="fa-solid fa-user"></i></div>
          <div>
            <div style="font-weight:600; font-size:0.9rem;">Hosted by ${item.host}</div>
            ${item.hostAbout ? `<div style="font-size:0.8rem; color:#888; margin-top:2px;">${item.hostAbout}</div>` : ''}
          </div>
        </div>` : ''}
        <div style="display:flex; justify-content:space-between; align-items:center; background:#f8f9fa; padding:1rem; border-radius:10px; margin-bottom:1.4rem;">
          <div>
            <div style="font-size:0.75rem; color:#888; text-transform:uppercase; letter-spacing:0.5px; font-weight:600;">Price per night</div>
            <div style="font-size:1.4rem; font-weight:700; color:var(--primary);">₹${item.price.toLocaleString()}</div>
          </div>
          <div style="font-size:0.82rem; color:#888;"><i class="fa-solid fa-bed"></i> ${item.totalRooms || 5} rooms available</div>
        </div>
        <button onclick="document.getElementById('property-details-modal').remove(); openBookingModal(${item.id});"
          style="width:100%; padding:14px; background:var(--primary); color:white; border:none; border-radius:10px; font-weight:700; font-size:1rem; cursor:pointer; font-family:'Outfit',sans-serif; transition:0.2s;">
          <i class="fa-solid fa-calendar-check"></i> Book This Stay
        </button>
      </div>
    </div>
  </div>`;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Expose key functions globally so they can be called from inline HTML in any page
window.openBookingModal = openBookingModal;
window.openPropertyDetails = openPropertyDetails;
window.saveToTrips = saveToTrips;
window.updateGuests = updateGuests;
window.updateNightsPrice = updateNightsPrice;

// Hillygo Navbar Toggles
function toggleMobileMenu() {
  let overlay = document.querySelector('.mobile-overlay');
  
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    overlay.innerHTML = `
      <button class="mobile-overlay-close" onclick="toggleMobileMenu()">&times;</button>
      <div class="mobile-nav-links">
        <a href="index.html" onclick="toggleMobileMenu()">Explore</a>
        <a href="homestay.html" onclick="toggleMobileMenu()">Stays</a>
        <a href="experience.html" onclick="toggleMobileMenu()">Experiences</a>
        <a href="destination.html" onclick="toggleMobileMenu()">Destinations</a>
        <a href="about.html" onclick="toggleMobileMenu()">About</a>
      </div>
      <div class="mobile-nav-footer">
        <div style="font-family:'Playfair Display', serif; font-size: 1.5rem; color:#1B2B30; margin-bottom: 0.5rem;">Hillygo</div>
        <p style="font-size: 0.85rem; color: #888;">Northeast India's Premier Stays</p>
        <a href="list-stay.html" class="btn-list-mobile">List Your Stay</a>
      </div>
    `;
    document.body.appendChild(overlay);
    
    // Trigger reflow for animation
    setTimeout(() => overlay.classList.add('active'), 10);
  } else {
    overlay.classList.toggle('active');
    // Remove from DOM after transition
    if (!overlay.classList.contains('active')) {
      setTimeout(() => overlay.remove(), 500);
    }
  }
}

function toggleLoginMenu() {
  if (typeof updateAuthUI === 'function') {
    // Try to trigger existing auth modal if available
    const signinBtn = document.querySelector('.btn-signin');
    if (signinBtn) signinBtn.click();
    else alert("Sign In / Profile: Coming Soon!");
  } else {
    alert("Sign In / Profile: Coming Soon!");
  }
}

function toggleNavExpand() {
  const nav = document.getElementById('hillygo-nav');
  if (nav) {
    nav.classList.toggle('is-expanded');
  }
}

window.toggleNavExpand = toggleNavExpand;
window.toggleMobileMenu = toggleMobileMenu;
window.toggleLoginMenu = toggleLoginMenu;
