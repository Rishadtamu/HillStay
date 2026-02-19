// Data for Listings - Focused on Darjeeling, Sikkim, Nagaland
const listings = [
  {
    id: 1,
    title: "Makaibari Tea Estate Bungalow",
    location: "Kurseong, Darjeeling",
    image: "https://images.unsplash.com/photo-1544634076-a901606f43e9?q=80&w=800&auto=format&fit=crop",
    price: 4500,
    rating: 4.9,
    reviews: 320,
    badge: "Heritage Stay",
    category: "homestay",
    host: "Mr. Banerjee",
    hostAbout: "The Banerjee family has been part of the Makaibari heritage for three generations. They are passionate about organic tea farming and local wildlife.",
    description: "Experience the magic of the world's first organic tea garden. This colonial-era bungalow offers panoramic views of rolling tea bushes and the distant Himalayan peaks.",
    facilities: ["Organic Tea Tasting", "Bird Watching", "Library", "Fireplace", "Authentic Bengali Meals"],
    gallery: [
      "https://images.unsplash.com/photo-1548658166-136d9f6a7cf1?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=800&auto=format&fit=crop"
    ],
    suggestedGuide: {
      name: "Pradip Rai",
      rating: 4.9,
      price: 1500,
      bio: "Expert tea sommelier and regional trekking guide with 10 years experience."
    },
    permit: false
  },
  {
    id: 2,
    title: "Singtom Tea Resort",
    location: "Darjeeling, West Bengal",
    image: "https://images.unsplash.com/photo-1566808902506-6ee29f34582f?q=80&w=800&auto=format&fit=crop",
    price: 6500,
    rating: 4.7,
    reviews: 150,
    badge: "Premium",
    category: "resort",
    host: "Singtom Mgmt",
    hostAbout: "A professionally managed heritage resort that prides itself on maintaining the 1862 colonial charm of the original estate bungalow.",
    description: "One of the oldest tea estate bungalows in Darjeeling, Singtom offers a luxury escape surrounded by 1,600 acres of private tea gardens.",
    facilities: ["Private Balcony", "Tea Factory Tour", "Spa", "Gourmet Dining", "Guided Heritage Walk"],
    gallery: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=800&auto=format&fit=crop"
    ],
    suggestedGuide: {
      name: "Tashi Sherpa",
      rating: 4.8,
      price: 2000,
      bio: "Mountain rescue expert and heritage storyteller."
    },
    permit: false
  },
  {
    id: 3,
    title: "Hidden Forest Retreat",
    location: "Gangtok, Sikkim",
    image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=800&auto=format&fit=crop",
    price: 3500,
    rating: 4.8,
    reviews: 512,
    badge: "Eco Friendly",
    category: "homestay",
    host: "Keshav",
    hostAbout: "Keshav is an avid gardener and environmentalist who built this retreat to share the serenity of Sikkim's natural forests with visitors.",
    description: "Nestled in a lush green valley just outside Gangtok, this retreat is a haven for nature lovers and those seeking quiet contemplation.",
    facilities: ["Organic Garden", "Yoga Deck", "Forest Trails", "Pet Friendly", "Solar Power"],
    gallery: [
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=800&auto=format&fit=crop"
    ],
    suggestedGuide: {
      name: "Sonam Lhatoo",
      rating: 4.9,
      price: 1200,
      bio: "Sikkimese flora and fauna specialist."
    },
    permit: true
  },
  {
    id: 4,
    title: "Lachen View Point Stay",
    location: "Lachen, North Sikkim",
    image: "https://images.unsplash.com/photo-1548658166-136d9f6a7cf1?q=80&w=800&auto=format&fit=crop",
    price: 2800,
    rating: 4.5,
    reviews: 89,
    badge: "High Altitude",
    category: "homestay",
    host: "Pema",
    hostAbout: "Pema is a member of the Dzumsa (local self-government) and loves explaining the unique social structure of Lachen to guests.",
    description: "Situated at 9,000 ft, this homestay provides the best views of the snow-capped peaks and is the perfect pitstop for Gurudongmar Lake.",
    facilities: ["Heated Blankets", "Mountain Views", "Traditional Sikkimese Hearth", "Permit Assistance", "Local Ara Drink"],
    gallery: [
      "https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=800&auto=format&fit=crop"
    ],
    suggestedGuide: {
      name: "Karma Wangchuk",
      rating: 4.7,
      price: 1800,
      bio: "Experienced high-altitude driver and permit specialist."
    },
    permit: true
  },
  {
    id: 5,
    title: "Dzukou Valley Base Camp",
    location: "Viswema, Nagaland",
    image: "https://images.unsplash.com/photo-1504280595-349f257a5360?q=80&w=800&auto=format&fit=crop",
    price: 1200,
    rating: 4.6,
    reviews: 210,
    badge: "Adventure",
    category: "camp",
    host: "Local Guide Assoc.",
    hostAbout: "The Viswema Youth Association manages this camp to ensure sustainable tourism and safety for trekkers heading to Dzukou Valley.",
    description: "Simple but scenic base camp for the legendary Dzukou Valley trek. Sleep under the stars and wake up to the rolling green mounds of the valley.",
    facilities: ["Sleeping Bags", "Community Kitchen", "Porter Services", "Trekking Gear Rental", "Bonfire Pit"],
    gallery: [
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504280595-349f257a5360?q=80&w=800&auto=format&fit=crop"
    ],
    suggestedGuide: {
      name: "Abel Angami",
      rating: 4.9,
      price: 1000,
      bio: "Nagaland trekking expert and Dzukou Valley flower specialist."
    },
    permit: true
  },
  {
    id: 6,
    title: "Alder Retreat",
    location: "Kohima, Nagaland",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=800&auto=format&fit=crop",
    price: 3000,
    rating: 4.4,
    reviews: 140,
    badge: null,
    category: "homestay",
    host: "Dr. Akum",
    hostAbout: "Dr. Akum is a retired professor of Naga history. His homestay is filled with artifacts and stories of the Angami tribes.",
    description: "A comfortable hilltop retreat in Kohima, perfect for exploring the World War II cemetery and the nearby Kisama Heritage Village.",
    facilities: ["Curated Library", "Home Cooked Naga Meals", "Garden View", "Travel Desk", "Wi-Fi"],
    gallery: [
      "https://images.unsplash.com/photo-1590059414567-4e30199b1f17?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop"
    ],
    suggestedGuide: {
      name: "Thepfulhu Sekhose",
      rating: 4.6,
      price: 1500,
      bio: "Local history and Hornbill Festival expert."
    },
    permit: true
  },
  {
    id: 12,
    title: "Khonoma Heritage Stay",
    location: "Khonoma, Nagaland",
    image: "https://images.unsplash.com/photo-1590059414567-4e30199b1f17?q=80&w=800&auto=format&fit=crop",
    price: 3500,
    rating: 4.8,
    reviews: 92,
    badge: "Asia's 1st Green Village",
    category: "homestay",
    host: "Zovi",
    hostAbout: "Zovi is a local community leader who pioneered eco-tourism in Khonoma. She is an expert on the village's conservation history.",
    description: "Stay in a traditional stone house in India's first green village. Learn about the Angami tribe's history of conservation and valor.",
    facilities: ["Village Heritage Tour", "Nature Walks", "Traditional Fireplace", "Naga Folklore Sessions", "Organic Meals"],
    gallery: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590059414567-4e30199b1f17?q=80&w=800&auto=format&fit=crop"
    ],
    suggestedGuide: {
      name: "Megovizo Sakhrie",
      rating: 4.9,
      price: 1800,
      bio: "Certified nature guide and Khonoma history expert."
    },
    permit: true
  },
  {
    id: 13,
    title: "Mokokchung Village Homestay",
    location: "Mokokchung, Nagaland",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop",
    price: 2500,
    rating: 4.7,
    reviews: 64,
    badge: "Cultural Hub",
    category: "homestay",
    host: "Sentila",
    hostAbout: "Sentila is a master weaver and storyteller of the Ao Naga tribe. Her home is a living museum of Ao culture.",
    description: "Immerse yourself in the vibrant culture of the Ao Nagas. This homestay in Ungma village offers a unique window into tribal life.",
    facilities: ["Weaving Workshops", "Tribal Kitchen", "Cultural Performances", "Tea Terrace", "Guided Village Walk"],
    gallery: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop"
    ],
    suggestedGuide: {
      name: "Limawati",
      rating: 4.7,
      price: 1200,
      bio: "Ao Naga cultural specialist and Mokokchung city guide."
    },
    permit: true
  },

  // Added from Search Suggestion Mock Data
  {
    id: 7,
    title: "Tea Garden Homestay",
    location: "Darjeeling, West Bengal",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop",
    price: 2200,
    rating: 4.5,
    reviews: 1204,
    badge: "Best Seller",
    category: "homestay",
    host: "Sumi",
    hostAbout: "Sumi and her family have converted their ancestral home into a welcoming space for travelers to experience authentic Darjeeling life.",
    description: "A cozy and affordable stay located right next to the lush tea gardens of Happy Valley.",
    facilities: ["Tea Picking", "Sunrise Views", "Homemade Jam Shop", "Wi-Fi", "Airport Pick-up"],
    gallery: [
      "https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop"
    ],
    suggestedGuide: {
      name: "Bishal Gurung",
      rating: 4.5,
      price: 1000,
      bio: "Local Darjeeling town and tea garden expert."
    },
    permit: false
  },
  {
    id: 8,
    title: "Alpine Birding Stay",
    location: "Ravangla, Sikkim",
    image: "https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=800&auto=format&fit=crop",
    price: 2800,
    rating: 4.8,
    reviews: 856,
    badge: null,
    category: "homestay",
    host: "Tenzing",
    hostAbout: "Tenzing is a professional naturalist who has documented over 200 species of birds in the Ravangla region.",
    description: "The ideal spot for birdwatchers. Located at the edge of the Maenam Wildlife Sanctuary.",
    facilities: ["Binocular Rental", "Birding Tours", "Library of Flora/Fauna", "Organic Cafe", "Telescope Deck"],
    gallery: [
      "https://images.unsplash.com/photo-1544634076-a901606f43e9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=800&auto=format&fit=crop"
    ],
    suggestedGuide: {
      name: "Tenzing Namgyal",
      rating: 5.0,
      price: 2500,
      bio: "Master birder and sanctuary expert."
    },
    permit: true
  },
  {
    id: 9,
    title: "Clouds End Cottage",
    location: "Mussoorie, Uttarakhand",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop",
    price: 4500,
    rating: 5.0,
    reviews: 2390,
    badge: "Travelers' Choice",
    category: "homestay",
    host: "Deepak",
    hostAbout: "Deepak is a writer who found inspiration in these hills 20 years ago and never left.",
    description: "An elegant cottage at the edge of the Mussoorie hills, offering total seclusion and stunning sunset views.",
    facilities: ["Study Room", "Piano", "Sunset Deck", "Fireplace", "Gourmet Breakfast"],
    gallery: [
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop"
    ],
    suggestedGuide: {
      name: "Rajesh Rawat",
      rating: 4.8,
      price: 1500,
      bio: "Local Mussoorie and Landour heritage guide."
    },
    permit: false
  },
  {
    id: 10,
    title: "Glenary's",
    location: "Darjeeling, West Bengal",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop",
    price: 800,
    rating: 4.6,
    reviews: 5000,
    badge: "Iconic",
    category: "restaurant",
    description: "The most famous bakery and restaurant in Darjeeling, serving history on a plate since colonial times.",
    facilities: ["Historic Ambiance", "Live Music", "Famous Pastries", "Mountain View Seating"],
    gallery: [
      "https://images.unsplash.com/photo-1544634076-a901606f43e9?q=80&w=800&auto=format&fit=crop"
    ],
    permit: false
  },
  {
    id: 11,
    title: "Tiger Hill Sunrise",
    location: "Darjeeling, West Bengal",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    price: 0,
    rating: 4.8,
    reviews: 10000,
    badge: "Must Visit",
    category: "activity",
    description: "Witness the sun rising over Mt. Kanchenjunga and Mt. Everest in a spectacular display of colors.",
    facilities: ["Viewing Deck", "Tea Stalls", "Telescope Points"],
    gallery: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop"
    ],
    permit: false
  },
  {
    id: 14,
    title: "Latpanchor Hornbill Nest",
    location: "Latpanchor, West Bengal",
    image: "https://images.unsplash.com/photo-1544634076-a901606f43e9?q=80&w=800&auto=format&fit=crop",
    price: 2500,
    rating: 4.9,
    reviews: 145,
    badge: "Birders' Choice",
    category: "homestay",
    host: "Mr. Gurung",
    hostAbout: "A local naturalist with expert knowledge of the Rufous-necked Hornbill nesting sites.",
    description: "Located at the highest point of Latpanchor, this homestay offers the best bird-watching opportunities and panoramic views of the Teesta valley.",
    facilities: ["Birding Guides", "Binocular Rental", "Traditional Pahari Meals", "Sunset Point", "Bonfire"],
    gallery: [
      "https://images.unsplash.com/photo-1548658166-136d9f6a7cf1?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=800&auto=format&fit=crop"
    ],
    suggestedGuide: {
      name: "Tenzing Gurung",
      rating: 5.0,
      price: 1200,
      bio: "Expert birding guide specialized in Latpanchor wildlife."
    },
    permit: false,
    availability: "Available for next 15 days"
  },
  {
    id: 15,
    title: "Aieee Homestay Latpanchor",
    location: "Latpanchor, West Bengal",
    image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=800&auto=format&fit=crop",
    price: 1800,
    rating: 4.7,
    reviews: 89,
    badge: "Budget Friendly",
    category: "homestay",
    host: "Mrs. Chettri",
    hostAbout: "Known for her warm hospitality and authentic local recipes passed down through generations.",
    description: "A cozy, family-run homestay nestled among orange orchards. Perfect for a peaceful retreat away from the city life.",
    facilities: ["Organic Garden", "Kitchen Access", "Orange Orchard Walk", "Family Atmosphere", "Yoga Space"],
    gallery: [
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop"
    ],
    suggestedGuide: {
      name: "Pratik Rai",
      rating: 4.8,
      price: 1000,
      bio: "Local trek guide and photography expert."
    },
    permit: false,
    availability: "Limited slots available"
  },
  {
    id: 16,
    title: "Mahananda View Homestay",
    location: "Latpanchor, West Bengal",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    price: 2200,
    rating: 4.8,
    reviews: 112,
    badge: "Scenic View",
    category: "homestay",
    host: "Zimba Family",
    hostAbout: "The Zimbas have been living in Latpanchor for over 50 years and love sharing their culture with guests.",
    description: "Overlooking the Mahananda Wildlife Sanctuary, this homestay provides a serene environment and frequent wildlife sightings from the balcony.",
    facilities: ["Sanctuary View", "Private Balcony", "Guided Forest Walk", "Traditional Hearth", "Library"],
    gallery: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop"
    ],
    suggestedGuide: {
      name: "Sonam Zimba",
      rating: 4.9,
      price: 1500,
      bio: "Wildlife sanctuary expert and story teller."
    },
    permit: false,
    availability: "Booking open for summer"
  },
  {
    id: 17,
    title: "Terraces of Tinchuley",
    location: "Tinchuley, Darjeeling",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop",
    price: 5200,
    rating: 5.0,
    reviews: 180,
    badge: "Heritage Treasure",
    category: "homestay",
    host: "Gurung Family",
    hostAbout: "The Gurungs have preserved their 80-year-old family estate to offer a glimpse into the colonial-era lifestyle of tea planters.",
    description: "A luxury heritage stay perched on the Tinchuley ridge. Famous for its 180-degree view of Mt. Kanchenjunga and organic orange orchards.",
    facilities: ["Heritage Architecture", "Private Orchard", "Kanchenjunga View Deck", "Library", "Pahari Fusion Cuisine"],
    gallery: [
      "https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544634076-a901606f43e9?q=80&w=800&auto=format&fit=crop"
    ],
    suggestedGuide: {
      name: "Mingma Sherpa",
      rating: 4.9,
      price: 2000,
      bio: "Cultural attache and heritage trekking expert."
    },
    permit: false,
    availability: "Limited winter bookings"
  },
  {
    id: 18,
    title: "Birding Den Latpanchor",
    location: "Latpanchor, West Bengal",
    image: "https://images.unsplash.com/photo-1548658166-136d9f6a7cf1?q=80&w=800&auto=format&fit=crop",
    price: 3200,
    rating: 4.9,
    reviews: 210,
    badge: "Naturalist's Choice",
    category: "homestay",
    host: "Animesh",
    hostAbout: "Animesh is a wildlife photographer who designed this homestay specifically for his peers, with low-angle decks for bird photography.",
    description: "The ultimate destination for wildlife photographers in Latpanchor. Located right at the edge of the Cinchona plantation, with nesting hornbills nearby.",
    facilities: ["Photography Decks", "Solar Charging Station", "Naturalist Library", "Birding Excursions", "Local Organic Food"],
    gallery: [
      "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=800&auto=format&fit=crop"
    ],
    suggestedGuide: {
      name: "Animesh Rai",
      rating: 5.0,
      price: 3000,
      bio: "Award-winning wildlife photographer and guide."
    },
    permit: false,
    availability: "Peak birding season slots open"
  },
  {
    id: 19,
    title: "Snow Lion Homestay",
    location: "Pelling, Sikkim",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=800&auto=format&fit=crop",
    price: 3800,
    rating: 4.8,
    reviews: 245,
    badge: "Spiritual Retreat",
    category: "homestay",
    host: "Lobsang",
    hostAbout: "Lobsang is a former monk from Pemayangtse Monastery who brings peace and mindfulness to his hospitality.",
    description: "A serene homestay located walking distance from the Pemayangtse Monastery. Perfect for spiritual seekers and those looking for mountain solitude.",
    facilities: ["Meditation Room", "Monastery Views", "Butter Tea Rituals", "Vegetarian Kitchen", "Quiet Library"],
    gallery: [
      "https://images.unsplash.com/photo-1544634076-a901606f43e9?q=80&w=800&auto=format&fit=crop"
    ],
    suggestedGuide: {
      name: "Tenzing Lobsang",
      rating: 4.8,
      price: 1500,
      bio: "Expert in Buddhist philosophy and local heritage."
    },
    permit: true,
    availability: "Available for retreat bookings"
  }
];

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
  if (!grid) return;

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
        if (type === "Things to do") icon = "fa-person-hiking";

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
  renderListings(listings);
  setupSearch();
  updateAuthUI();
  initHomestayCarousel();
  initStoryAnimations();
  highlightActiveNav();
  setupMobileMenu();

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
  const profileContainer = document.querySelector('.header-actions');
  if (!profileContainer) return;

  if (state.user) {
    profileContainer.innerHTML = `
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
    profileContainer.innerHTML = `
      <button onclick="openLoginModal()" class="btn-signin">Sign In</button>
    `;
  }
}

function openLoginModal() {
  const modalHTML = `
    <div class="auth-modal-overlay" id="auth-modal">
      <div class="auth-modal-content">
        <button class="btn-close-modal" onclick="closeAuthModal()">&times;</button>
        <div class="auth-modal-header">
          <h2>Welcome to HillStay</h2>
          <p>Sign in to explore your perfect mountain escape.</p>
        </div>
        
        <button class="btn-social google-btn" onclick="loginWithGoogle()">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google">
          Continue with Google
        </button>
        
        <div class="auth-divider">or use email</div>
        
        <div class="auth-form">
          <div class="auth-form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email">
          </div>
          <div class="auth-form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password">
          </div>
          <button class="btn-auth-submit" onclick="mockLogin()">Sign In</button>
        </div>
        
        <p class="auth-footer">Don't have an account? <a href="#">Sign up</a></p>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) modal.remove();
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
    closeAuthModal();
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

// Close User Menu on Outside Click
document.addEventListener('click', (e) => {
  if (!e.target.closest('.user-profile')) {
    const menu = document.getElementById('user-menu');
    if (menu) menu.classList.remove('active');
  }
});


// Advanced Carousel Logic
let carouselIndex = 0;
function initHomestayCarousel() {
  const track = document.getElementById("homestay-carousel");
  if (!track) return;

  const homestays = listings.filter(l => l.category === 'homestay');

  track.innerHTML = homestays.map(item => `
    <div class="carousel-card">
      <div class="listing-card" onclick="openPropertyDetails(${item.id})">
        <div class="card-img-container">
          <img src="${item.image}" alt="${item.title}">
          <div class="card-badge">${item.badge || 'Featured'}</div>
          <button class="favorite-btn" onclick="event.stopPropagation(); saveToTrips(${item.id})">
            <i class="fa-regular fa-heart"></i>
          </button>
        </div>
        <div class="card-content">
          <h3 class="card-title">${item.title}</h3>
          <div class="card-location"><i class="fa-solid fa-location-dot"></i> ${item.location}</div>
          <div class="card-rating">
            <div class="bubbles">${getStarHTML(item.rating)}</div>
            <span class="review-count">${item.reviews} reviews</span>
          </div>
          <div class="card-price">₹${item.price} <span>/ night</span></div>
          
          <div class="amenities-grid">
            <div class="amenity-item"><i class="fa-solid fa-wifi"></i> Wifi</div>
            <div class="amenity-item"><i class="fa-solid fa-mug-hot"></i> Breakfast</div>
            <div class="amenity-item"><i class="fa-solid fa-mountain"></i> View</div>
          </div>
        </div>
      </div>
    </div>
  `).join("");

  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");

  nextBtn?.addEventListener("click", () => {
    const maxIndex = homestays.length - (window.innerWidth > 992 ? 3 : 1);
    if (carouselIndex < maxIndex) {
      carouselIndex++;
      updateCarousel();
    }
  });

  prevBtn?.addEventListener("click", () => {
    if (carouselIndex > 0) {
      carouselIndex--;
      updateCarousel();
    }
  });

  function updateCarousel() {
    const cardWidth = document.querySelector(".carousel-card").offsetWidth + 32; // width + gap
    track.style.transform = `translateX(-${carouselIndex * cardWidth}px)`;
  }
}

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

// Guest Counter
function updateGuests(change) {
  const countSpan = document.getElementById('guest-count');
  if (!countSpan) return;

  let current = parseInt(countSpan.textContent);
  let newVal = Math.max(1, Math.min(10, current + change));
  countSpan.textContent = newVal;
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
    e.stopPropagation();
    const isOpen = navLinks.classList.toggle('active');
    backdrop.classList.toggle('active');

    // Change icon from bars to xmark
    const icon = menuToggle.querySelector('i');
    if (isOpen) {
      icon.classList.replace('fa-bars', 'fa-xmark');
      document.body.style.overflow = 'hidden'; // Prevent scroll
    } else {
      icon.classList.replace('fa-xmark', 'fa-bars');
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

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
  startHeroSlider();
  setupMobileMenu();
  initLanguage();
  window.addEventListener('scroll', handleScroll);
});
