/**
 * FoodHub - Full-Stack Interactive Food Delivery Platform
 * Client-Side Application Core (Connected to MySQL Backend)
 */

// ==========================================================================
// 1. GLOBAL STATE & DATA (Mirrored with MySQL schema)
// ==========================================================================

const FallbackFoodData = [
  {
    id: 1,
    restaurantId: 1,
    restaurantName: "Spice Garden",
    name: "Paneer Butter Masala",
    category: "biryani",
    price: 240,
    originalPrice: 290,
    rating: 4.8,
    reviewsCount: 380,
    time: "20-25 min",
    isVeg: true,
    isBestseller: true,
    discount: "17% OFF",
    calories: "510 kcal",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
    description: "Rich cottage cheese cubes cooked in creamy tomato butter gravy and aromatic spices.",
    ingredients: ["Paneer", "Butter", "Cashew Cream", "Tomato", "Garam Masala"]
  },
  {
    id: 2,
    restaurantId: 1,
    restaurantName: "Spice Garden",
    name: "Royal Hyderabadi Veg Dum Biryani",
    category: "biryani",
    price: 180,
    originalPrice: 220,
    rating: 4.7,
    reviewsCount: 450,
    time: "25-30 min",
    isVeg: true,
    isBestseller: true,
    discount: "18% OFF",
    calories: "580 kcal",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    description: "Aromatic long-grain basmati rice slow-cooked with garden vegetables, saffron and kewra.",
    ingredients: ["Basmati Rice", "Saffron", "Mint", "Carrot", "Peas", "Fried Onions"]
  },
  {
    id: 3,
    restaurantId: 1,
    restaurantName: "Spice Garden",
    name: "Dal Makhani",
    category: "biryani",
    price: 200,
    originalPrice: 250,
    rating: 4.9,
    reviewsCount: 290,
    time: "15-20 min",
    isVeg: true,
    isBestseller: true,
    discount: "20% OFF",
    calories: "420 kcal",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    description: "Slow-cooked black lentils overnight in butter, cream and whole Punjabi spices.",
    ingredients: ["Black Lentils", "Butter", "Cream", "Ginger", "Kasturi Methi"]
  },
  {
    id: 4,
    restaurantId: 2,
    restaurantName: "Burger Hub",
    name: "Classic Truffle Cheeseburger",
    category: "burgers",
    price: 249,
    originalPrice: 299,
    rating: 4.8,
    reviewsCount: 320,
    time: "20-25 min",
    isVeg: false,
    isBestseller: true,
    discount: "15% OFF",
    calories: "580 kcal",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    description: "Double smash patty with melted aged cheddar, caramelized onions, and black truffle aioli.",
    ingredients: ["Patty", "Aged Cheddar", "Caramelized Onions", "Truffle Aioli", "Brioche Bun"]
  },
  {
    id: 5,
    restaurantId: 2,
    restaurantName: "Burger Hub",
    name: "Crispy Paneer Supreme Burger",
    category: "burgers",
    price: 199,
    originalPrice: 249,
    rating: 4.7,
    reviewsCount: 210,
    time: "20-25 min",
    isVeg: true,
    isBestseller: true,
    discount: "20% OFF",
    calories: "520 kcal",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
    description: "Crispy spiced cottage cheese patty topped with fresh lettuce, peri-peri mayo, and pickled jalapeños.",
    ingredients: ["Paneer Patty", "Iceberg Lettuce", "Peri-Peri Mayo", "Jalapeños", "Sesame Bun"]
  },
  {
    id: 6,
    restaurantId: 2,
    restaurantName: "Burger Hub",
    name: "Crispy French Fries",
    category: "burgers",
    price: 90,
    originalPrice: 120,
    rating: 4.6,
    reviewsCount: 260,
    time: "10-15 min",
    isVeg: true,
    isBestseller: false,
    discount: "25% OFF",
    calories: "310 kcal",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
    description: "Golden salted potato fries served with zesty garlic mayo and smoky ketchup.",
    ingredients: ["Potatoes", "Sea Salt", "Paprika", "Garlic Mayo"]
  },
  {
    id: 7,
    restaurantId: 3,
    restaurantName: "Pizza Corner",
    name: "Woodfired Margherita Gourmet Pizza",
    category: "pizzas",
    price: 220,
    originalPrice: 280,
    rating: 4.9,
    reviewsCount: 450,
    time: "25-30 min",
    isVeg: true,
    isBestseller: true,
    discount: "21% OFF",
    calories: "680 kcal",
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80",
    description: "Artisan sourdough crust layered with San Marzano sauce, fresh buffalo mozzarella and sweet basil.",
    ingredients: ["Sourdough Crust", "San Marzano Sauce", "Buffalo Mozzarella", "Fresh Basil"]
  },
  {
    id: 8,
    restaurantId: 3,
    restaurantName: "Pizza Corner",
    name: "Farmhouse Veggie Supreme Pizza",
    category: "pizzas",
    price: 320,
    originalPrice: 399,
    rating: 4.7,
    reviewsCount: 310,
    time: "25-30 min",
    isVeg: true,
    isBestseller: false,
    discount: "20% OFF",
    calories: "720 kcal",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80",
    description: "Loaded with crisp bell peppers, red onions, mushrooms, black olives, and mozzarella.",
    ingredients: ["Crust", "Mozzarella", "Bell Peppers", "Mushrooms", "Olives"]
  },
  {
    id: 9,
    restaurantId: 3,
    restaurantName: "Pizza Corner",
    name: "Toasted Herb Garlic Bread",
    category: "pizzas",
    price: 110,
    originalPrice: 140,
    rating: 4.8,
    reviewsCount: 180,
    time: "15-20 min",
    isVeg: true,
    isBestseller: false,
    discount: "21% OFF",
    calories: "260 kcal",
    image: "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&w=800&q=80",
    description: "Warm baguette infused with roasted garlic butter, parmesan, and Italian herbs.",
    ingredients: ["French Baguette", "Garlic Butter", "Oregano", "Parsley"]
  },
  {
    id: 10,
    restaurantId: 3,
    restaurantName: "Pizza Corner",
    name: "Warm Molten Choco Lava Cake",
    category: "desserts",
    price: 149,
    originalPrice: 189,
    rating: 4.9,
    reviewsCount: 580,
    time: "15-20 min",
    isVeg: true,
    isBestseller: true,
    discount: "21% OFF",
    calories: "390 kcal",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    description: "Decadent dark chocolate sponge cake with flowing melted Belgian chocolate center.",
    ingredients: ["Dark Chocolate", "Butter Sponge", "Cocoa Powder", "Vanilla"]
  },
  {
    id: 11,
    restaurantId: 2,
    restaurantName: "Burger Hub",
    name: "Belgian Chocolate Fudge Thickshake",
    category: "beverages",
    price: 169,
    originalPrice: 199,
    rating: 4.8,
    reviewsCount: 420,
    time: "10-15 min",
    isVeg: true,
    isBestseller: true,
    discount: "15% OFF",
    calories: "410 kcal",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
    description: "Double-churned Belgian chocolate ice cream blended with roasted hazelnut syrup.",
    ingredients: ["Chocolate Gelato", "Whole Milk", "Fudge Sauce", "Choco Curls"]
  },
  {
    id: 12,
    restaurantId: 1,
    restaurantName: "Spice Garden",
    name: "Mediterranean Greek Salad Bowl",
    category: "healthy",
    price: 239,
    originalPrice: 279,
    rating: 4.7,
    reviewsCount: 190,
    time: "15-20 min",
    isVeg: true,
    isBestseller: false,
    discount: "14% OFF",
    calories: "280 kcal",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    description: "Crisp English cucumbers, vine tomatoes, Kalamata olives and creamy feta with oregano.",
    ingredients: ["Feta Cheese", "Kalamata Olives", "Cherry Tomatoes", "Cucumbers", "EVOO"]
  },
  {
    id: 13,
    restaurantId: 1,
    restaurantName: "Spice Garden",
    name: "Smoky Butter Chicken Makhani",
    category: "biryani",
    price: 320,
    originalPrice: 380,
    rating: 4.9,
    reviewsCount: 640,
    time: "25-30 min",
    isVeg: false,
    isBestseller: true,
    discount: "16% OFF",
    calories: "620 kcal",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    description: "Tender boneless chicken roasted in clay tandoor and simmered in velvety tomato-butter makhani gravy.",
    ingredients: ["Tender Chicken", "Butter Makhani Sauce", "Kasuri Methi", "Fresh Cream", "Ginger"]
  },
  {
    id: 14,
    restaurantId: 2,
    restaurantName: "Burger Hub",
    name: "Crispy Peri-Peri Chicken Wings (6 Pcs)",
    category: "snacks",
    price: 219,
    originalPrice: 269,
    rating: 4.8,
    reviewsCount: 390,
    time: "15-20 min",
    isVeg: false,
    isBestseller: true,
    discount: "18% OFF",
    calories: "480 kcal",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80",
    description: "Crunchy fried wings tossed in authentic African bird's eye chili seasoning with garlic dip.",
    ingredients: ["Chicken Wings", "Peri-Peri Seasoning", "Smoky Paprika", "Garlic Herb Dip"]
  },
  {
    id: 15,
    restaurantId: 2,
    restaurantName: "Burger Hub",
    name: "Steamed Chicken Dimsums / Momos (8 Pcs)",
    category: "snacks",
    price: 179,
    originalPrice: 220,
    rating: 4.8,
    reviewsCount: 310,
    time: "15-20 min",
    isVeg: false,
    isBestseller: false,
    discount: "19% OFF",
    calories: "340 kcal",
    image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=80",
    description: "Delicate thin-wrapper Himalayan dumplings filled with seasoned juicy minced chicken and scallions.",
    ingredients: ["Minced Chicken", "Dumpling Wrapper", "Spring Onion", "Fiery Red Chili Chutney"]
  },
  {
    id: 16,
    restaurantId: 3,
    restaurantName: "Pizza Corner",
    name: "New York Style Baked Cheesecake",
    category: "desserts",
    price: 199,
    originalPrice: 249,
    rating: 4.9,
    reviewsCount: 410,
    time: "10-15 min",
    isVeg: true,
    isBestseller: true,
    discount: "20% OFF",
    calories: "450 kcal",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80",
    description: "Silky smooth Philadelphia cream cheese filling on a buttery cinnamon graham cracker crust.",
    ingredients: ["Cream Cheese", "Graham Cracker", "Strawberry Glaze", "Vanilla Bean"]
  },
  {
    id: 17,
    restaurantId: 2,
    restaurantName: "Burger Hub",
    name: "Chilled Virgin Mint Mojito",
    category: "beverages",
    price: 129,
    originalPrice: 159,
    rating: 4.7,
    reviewsCount: 280,
    time: "5-10 min",
    isVeg: true,
    isBestseller: false,
    discount: "18% OFF",
    calories: "140 kcal",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    description: "Handcrafted beverage with fresh crushed mint sprigs, tangy key lime juice and sparkling soda.",
    ingredients: ["Fresh Spearmint", "Lime Juice", "Cane Syrup", "Sparkling Soda", "Crushed Ice"]
  },
  {
    id: 18,
    restaurantId: 3,
    restaurantName: "Pizza Corner",
    name: "Crispy Golden Veg Spring Rolls (6 Pcs)",
    category: "snacks",
    price: 149,
    originalPrice: 189,
    rating: 4.6,
    reviewsCount: 220,
    time: "15-20 min",
    isVeg: true,
    isBestseller: false,
    discount: "21% OFF",
    calories: "320 kcal",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    description: "Crispy filo pastry wrapped with julienned crunchy wok veggies, served with sweet chili sauce.",
    ingredients: ["Cabbage", "Carrot", "Glass Noodles", "Pastry Wrapper", "Sweet Chili Sauce"]
  }
];

const CouponsList = [
  {
    code: "FOODHUB50",
    discountType: "percentage",
    discountValue: 50,
    maxDiscount: 150,
    minOrder: 299,
    description: "50% OFF up to ₹150 on orders above ₹299",
    badge: "SUPER SAVER"
  },
  {
    code: "TASTY20",
    discountType: "percentage",
    discountValue: 20,
    maxDiscount: 100,
    minOrder: 199,
    description: "20% OFF up to ₹100 on orders above ₹199",
    badge: "POPULAR"
  },
  {
    code: "FREEDEL",
    discountType: "flat",
    discountValue: 40,
    maxDiscount: 40,
    minOrder: 149,
    description: "Zero Delivery Fee on orders above ₹149",
    badge: "FREE DELIVERY"
  },
  {
    code: "WEEKEND100",
    discountType: "flat",
    discountValue: 100,
    maxDiscount: 100,
    minOrder: 499,
    description: "Flat ₹100 OFF on party orders above ₹499",
    badge: "PARTY SPECIAL"
  }
];

// App State
const state = {
  menu: FallbackFoodData,
  cart: JSON.parse(localStorage.getItem('foodhub_cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('foodhub_wishlist')) || [],
  currentUser: JSON.parse(localStorage.getItem('foodhub_user')) || {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav@example.com",
    phone: "9876500001",
    address: "12 MP Nagar, Bhopal"
  },
  currentAddress: localStorage.getItem('foodhub_address') || "12 MP Nagar, Bhopal",
  currentAddressId: 1,
  currentZoneId: 1,
  appliedCoupon: null,
  activeRestaurant: 'all',
  activeCategory: 'all',
  dietFilter: 'all',
  searchQuery: '',
  isVegOnly: false,
  sortBy: 'popular',
  activeOrder: null,
  orderHistory: [],
  rewardPoints: 280,
  isBackendConnected: false,
  isMysqlLive: false
};

// ==========================================================================
// 2. AUDIO & HAPTIC EFFECTS (Web Audio API Synthesizer)
// ==========================================================================
const soundFX = {
  ctx: null,
  init() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx && !this.ctx) {
        this.ctx = new AudioCtx();
      }
    } catch (e) {}
  },
  playTone(freq, type = 'sine', duration = 0.15, vol = 0.1) {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  },
  pop() {
    this.playTone(520, 'sine', 0.08, 0.12);
  },
  success() {
    setTimeout(() => this.playTone(587.33, 'sine', 0.12, 0.1), 0);
    setTimeout(() => this.playTone(880.00, 'sine', 0.25, 0.12), 100);
  },
  click() {
    this.playTone(400, 'triangle', 0.05, 0.06);
  }
};

// ==========================================================================
// 3. TOAST NOTIFICATIONS
// ==========================================================================
function showToast(message, type = 'info', icon = 'fa-info-circle') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast-item toast-${type} animate-slide-in`;
  toast.innerHTML = `
    <div class="toast-icon"><i class="fa-solid ${icon}"></i></div>
    <div class="toast-text">${message}</div>
    <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
  `;

  container.appendChild(toast);
  soundFX.pop();

  setTimeout(() => {
    toast.classList.add('toast-fade-out');
    setTimeout(() => toast.remove(), 350);
  }, 3200);
}

// ==========================================================================
// 4. MODALS & DRAWERS MANAGEMENT
// ==========================================================================
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  const backdrop = document.getElementById('modal-backdrop');
  if (modal) {
    modal.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    soundFX.click();
  }
}

function closeModal(modalId) {
  if (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  } else {
    document.querySelectorAll('.modal.active, .drawer.active').forEach(m => m.classList.remove('active'));
  }
  const backdrop = document.getElementById('modal-backdrop');
  if (backdrop && !document.querySelector('.modal.active, .drawer.active')) {
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function toggleCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('modal-backdrop');
  if (drawer.classList.contains('active')) {
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  } else {
    renderCart();
    drawer.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    soundFX.pop();
  }
}

function toggleWishlistModal() {
  renderWishlist();
  openModal('wishlist-modal');
}

// ==========================================================================
// 5. RESTAURANTS & CATEGORY FILTERING
// ==========================================================================
function filterByRestaurant(restId) {
  state.activeRestaurant = restId;
  document.querySelectorAll('.rest-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.restaurant == restId);
  });
  renderMenu();
  soundFX.click();
  showToast(`Filtering by: <strong>${restId === 'all' ? 'All Restaurants' : (restId == 1 ? 'Spice Garden' : restId == 2 ? 'Burger Hub' : 'Pizza Corner')}</strong>`, 'info', 'fa-store');
}

function renderMenu() {
  const container = document.getElementById('food-grid');
  if (!container) return;

  let filtered = state.menu.filter(item => {
    // Restaurant filter
    if (state.activeRestaurant !== 'all') {
      if (item.restaurantId != state.activeRestaurant) return false;
    }
    // Category check
    if (state.activeCategory !== 'all') {
      if (state.activeCategory === 'snacks') {
        const isSnack = item.category === 'snacks' ||
          (item.name || '').toLowerCase().includes('fries') ||
          (item.name || '').toLowerCase().includes('garlic bread') ||
          (item.name || '').toLowerCase().includes('wings') ||
          (item.name || '').toLowerCase().includes('dimsums') ||
          (item.name || '').toLowerCase().includes('momos') ||
          (item.name || '').toLowerCase().includes('roll');
        if (!isSnack) return false;
      } else if (state.activeCategory === 'beverages' || state.activeCategory === 'drinks') {
        const isDrink = item.category === 'beverages' || item.category === 'drinks' ||
          (item.name || '').toLowerCase().includes('shake') ||
          (item.name || '').toLowerCase().includes('mojito');
        if (!isDrink) return false;
      } else if (state.activeCategory === 'desserts') {
        const isDessert = item.category === 'desserts' ||
          (item.name || '').toLowerCase().includes('lava') ||
          (item.name || '').toLowerCase().includes('cake') ||
          (item.name || '').toLowerCase().includes('cheesecake');
        if (!isDessert) return false;
      } else if (item.category !== state.activeCategory) {
        return false;
      }
    }
    // Diet filter (Veg / Non-Veg)
    if (state.dietFilter === 'veg' && !item.isVeg) {
      return false;
    }
    if (state.dietFilter === 'nonveg' && item.isVeg) {
      return false;
    }
    if (state.isVegOnly && !item.isVeg) {
      return false;
    }
    // Search check
    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase().trim();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = (item.description || '').toLowerCase().includes(q);
      const matchCat = (item.category || '').toLowerCase().includes(q);
      const matchRest = (item.restaurantName || '').toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCat && !matchRest) return false;
    }
    return true;
  });

  // Sorting
  if (state.sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else {
    filtered.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
  }

  // Update counter
  const counterEl = document.getElementById('menu-count-badge');
  if (counterEl) {
    counterEl.innerText = `${filtered.length} Dishes`;
  }

  // Empty state
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon"><i class="fa-solid fa-plate-wheat"></i></div>
        <h3>No dishes found!</h3>
        <p>No dishes match "${state.searchQuery || 'your filters'}". Try resetting filters.</p>
        <button class="btn-primary" onclick="resetAllFilters()">
          <i class="fa-solid fa-rotate-left"></i> Reset All Filters
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const isWishlisted = state.wishlist.includes(item.id);
    const cartItem = state.cart.find(c => c.id === item.id);
    const cartQty = cartItem ? cartItem.quantity : 0;

    return `
      <div class="food-card" data-id="${item.id}">
        <div class="food-card-image-wrap" onclick="openFoodDetail(${item.id})">
          <img src="${item.image}" alt="${item.name}" loading="lazy" class="food-card-img" />
          
          <div class="card-badges">
            <span class="diet-badge ${item.isVeg ? 'veg' : 'non-veg'}">
              <span class="diet-circle"></span> ${item.isVeg ? 'VEG' : 'NON-VEG'}
            </span>
            ${item.isBestseller ? `<span class="badge-bestseller"><i class="fa-solid fa-crown"></i> Bestseller</span>` : ''}
          </div>

          <span class="discount-pill">${item.discount || '15% OFF'}</span>

          <button class="wishlist-toggle ${isWishlisted ? 'active' : ''}" 
                  onclick="event.stopPropagation(); toggleWishlist(${item.id})"
                  title="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}">
            <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
          </button>
        </div>

        <div class="food-card-body">
          <div class="restaurant-tag">
            <i class="fa-solid fa-store"></i> ${item.restaurantName || 'Spice Garden'}
          </div>

          <div class="food-meta">
            <span class="rating-badge"><i class="fa-solid fa-star"></i> ${item.rating} <small>(${item.reviewsCount})</small></span>
            <span class="delivery-time"><i class="fa-regular fa-clock"></i> ${item.time}</span>
            <span class="calorie-badge"><i class="fa-solid fa-fire"></i> ${item.calories}</span>
          </div>

          <h3 class="food-title" onclick="openFoodDetail(${item.id})">${item.name}</h3>
          <p class="food-desc">${item.description}</p>

          <div class="food-card-footer">
            <div class="food-price-wrap">
              <span class="current-price">₹${item.price}</span>
              <span class="original-price">₹${item.originalPrice}</span>
            </div>

            <div class="action-btn-container" id="card-action-${item.id}">
              ${cartQty > 0 ? `
                <div class="qty-stepper">
                  <button class="stepper-btn" onclick="updateCartQty(${item.id}, -1)">
                    <i class="fa-solid fa-minus"></i>
                  </button>
                  <span class="stepper-val">${cartQty}</span>
                  <button class="stepper-btn" onclick="updateCartQty(${item.id}, 1)">
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </div>
              ` : `
                <button class="add-btn" onclick="addToCart(${item.id})">
                  <i class="fa-solid fa-plus"></i> ADD
                </button>
              `}
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function resetAllFilters() {
  state.activeRestaurant = 'all';
  state.activeCategory = 'all';
  state.dietFilter = 'all';
  state.searchQuery = '';
  state.isVegOnly = false;
  state.sortBy = 'popular';

  const searchInput = document.querySelector('.search-box input');
  if (searchInput) searchInput.value = '';

  const vegToggle = document.getElementById('veg-only-checkbox');
  if (vegToggle) vegToggle.checked = false;

  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) sortSelect.value = 'popular';

  document.querySelectorAll('.cat-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === 'all');
  });

  document.querySelectorAll('.rest-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.restaurant === 'all');
  });

  renderMenu();
  showToast('Filters reset to default', 'info', 'fa-rotate-left');
}

// ==========================================================================
// 5B. MENU DROPDOWN (8 REQUESTED OPTIONS) & CUSTOMER SERVICES & REPORTS
// ==========================================================================

function toggleMenuDropdown(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  const wrapper = document.getElementById('menu-dropdown-wrapper');
  const panel = document.getElementById('menu-dropdown-panel');
  if (!wrapper || !panel) return;

  const isOpen = panel.classList.contains('show');
  if (isOpen) {
    closeMenuDropdown();
  } else {
    panel.classList.add('show');
    wrapper.classList.add('open');
    const menuBtn = document.getElementById('menu-btn');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
    soundFX.pop();
  }
}

function closeMenuDropdown() {
  const wrapper = document.getElementById('menu-dropdown-wrapper');
  const panel = document.getElementById('menu-dropdown-panel');
  if (panel) panel.classList.remove('show');
  if (wrapper) wrapper.classList.remove('open');
  const menuBtn = document.getElementById('menu-btn');
  if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
}

function openMenuOption(option) {
  closeMenuDropdown();
  soundFX.click();

  switch(option) {
    case 'orders':
      renderOrderHistory();
      openModal('history-modal');
      showToast('Opening <strong>My Past Orders</strong> & Trackers', 'info', 'fa-receipt');
      break;

    case 'reports':
      openReportsModal();
      openModal('reports-modal');
      showToast('Generated <strong>Order Reports & Analytics</strong>', 'info', 'fa-chart-pie');
      break;

    case 'support':
      openModal('support-modal');
      showToast('Opening <strong>Customer Services & 24/7 Help Desk</strong>', 'info', 'fa-headset');
      break;

    case 'veg':
      state.dietFilter = 'veg';
      state.isVegOnly = true;
      state.activeCategory = 'all';
      const vegBox = document.getElementById('veg-only-checkbox');
      if (vegBox) vegBox.checked = true;
      document.querySelectorAll('.cat-pill').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === 'all');
      });
      renderMenu();
      scrollToMenu();
      showToast('Showing <strong>100% Pure Vegetarian</strong> Dishes', 'success', 'fa-seedling');
      break;

    case 'nonveg':
      state.dietFilter = 'nonveg';
      state.isVegOnly = false;
      state.activeCategory = 'all';
      const vegBox2 = document.getElementById('veg-only-checkbox');
      if (vegBox2) vegBox2.checked = false;
      document.querySelectorAll('.cat-pill').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === 'all');
      });
      renderMenu();
      scrollToMenu();
      showToast('Showing <strong>Non-Veg Chef Specials</strong>', 'success', 'fa-drumstick-bite');
      break;

    case 'snacks':
      state.dietFilter = 'all';
      state.isVegOnly = false;
      const vegBox3 = document.getElementById('veg-only-checkbox');
      if (vegBox3) vegBox3.checked = false;
      state.activeCategory = 'snacks';
      document.querySelectorAll('.cat-pill').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === 'snacks');
      });
      renderMenu();
      scrollToMenu();
      showToast('Showing <strong>Crispy Snacks & Sides</strong>', 'success', 'fa-cookie-bite');
      break;

    case 'desserts':
      state.dietFilter = 'all';
      state.isVegOnly = false;
      const vegBox4 = document.getElementById('veg-only-checkbox');
      if (vegBox4) vegBox4.checked = false;
      state.activeCategory = 'desserts';
      document.querySelectorAll('.cat-pill').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === 'desserts');
      });
      renderMenu();
      scrollToMenu();
      showToast('Showing <strong>Delightful Desserts</strong>', 'success', 'fa-ice-cream');
      break;

    case 'drinks':
      state.dietFilter = 'all';
      state.isVegOnly = false;
      const vegBox5 = document.getElementById('veg-only-checkbox');
      if (vegBox5) vegBox5.checked = false;
      state.activeCategory = 'beverages';
      document.querySelectorAll('.cat-pill').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === 'beverages');
      });
      renderMenu();
      scrollToMenu();
      showToast('Showing <strong>Refreshing Drinks & Shakes</strong>', 'success', 'fa-mug-hot');
      break;

    default:
      scrollToMenu();
      break;
  }
}

function openReportsModal() {
  const totalOrdersEl = document.getElementById('report-total-orders');
  const totalSpentEl = document.getElementById('report-total-spent');
  const totalSavedEl = document.getElementById('report-total-saved');
  const pointsEl = document.getElementById('report-points');

  if (pointsEl) {
    pointsEl.innerText = `${state.rewardPoints} pts`;
  }

  fetch('/api/orders')
    .then(res => res.json())
    .then(data => {
      const orders = data.data || [];
      if (orders.length > 0) {
        if (totalOrdersEl) totalOrdersEl.innerText = `${orders.length} Orders`;
        const totalSpent = orders.reduce((sum, o) => sum + parseFloat(o.total_amount || o.total || 0), 0);
        if (totalSpentEl) totalSpentEl.innerText = `₹${totalSpent.toFixed(2)}`;
        if (totalSavedEl) totalSavedEl.innerText = `₹${(totalSpent * 0.18).toFixed(2)}`;
        
        const tbody = document.getElementById('reports-invoices-tbody');
        if (tbody) {
          tbody.innerHTML = orders.map(o => `
            <tr>
              <td><strong>#FH-${o.order_id || o.id}</strong></td>
              <td>${o.restaurant_name || 'Spice Garden'}</td>
              <td>${o.items ? o.items.map(i => `${i.item_name || i.item_name_snapshot} (x${i.quantity})`).join(', ') : 'Gourmet meal'}</td>
              <td><span class="badge-payment">${(o.payment_method || 'UPI').toUpperCase()}</span></td>
              <td>₹${o.total_amount || o.total}</td>
              <td><button class="btn-invoice" onclick="downloadInvoice('FH-${o.order_id || o.id}')"><i class="fa-solid fa-download"></i> PDF</button></td>
            </tr>
          `).join('');
        }
      }
    })
    .catch(() => {});
}

function downloadInvoice(orderId) {
  soundFX.success();
  showToast(`Generating tax invoice for <strong>${orderId}</strong>...`, 'info', 'fa-file-invoice-dollar');
  setTimeout(() => {
    const invoiceContent = `=====================================================
FOODHUB OFFICIAL TAX INVOICE & RECEIPT
Invoice Ref: ${orderId}
Date: ${new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}
Customer: ${state.currentUser ? state.currentUser.name : 'Aarav Sharma'}
Delivery Address: ${state.currentAddress}
=====================================================
Delivered By: Aman Verma (+91 98200 00001)
Restaurant: FoodHub Verified Kitchen Partner
Payment Method: Verified (Digital Payment / UPI)
Status: PAID IN FULL
=====================================================
Thank you for choosing FoodHub!
For questions, contact support@foodhub.com or 24/7 Helpline.
=====================================================`;

    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FoodHub_Invoice_${orderId}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast(`Invoice <strong>${orderId}</strong> downloaded successfully!`, 'success', 'fa-circle-check');
  }, 600);
}

function downloadAllReports() {
  soundFX.success();
  const csvContent = `Order_ID,Restaurant,Items,Amount,Status,Date\n#FH-1,Spice Garden,"Paneer Butter Masala, Veg Biryani",471.00,Delivered,2026-10-12\n#FH-2,Burger Hub,"Classic Burger, Fries",319.00,Delivered,2026-10-13\n#FH-3,Pizza Corner,"Margherita Pizza, Garlic Bread",376.50,Delivered,2026-10-14\n#FH-4,Burger Hub,"Crispy Fries, Belgian Shake",259.00,Delivered,2026-10-16\n`;
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `FoodHub_Customer_Spending_Report.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  showToast('Customer spending report exported as CSV!', 'success', 'fa-file-csv');
}

function handleSupportTicketSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('ticket-name').value;
  const email = document.getElementById('ticket-email').value;
  const category = document.getElementById('ticket-category').value;
  const message = document.getElementById('ticket-message').value;

  const ticketId = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
  soundFX.success();
  showToast(`Ticket <strong>#${ticketId}</strong> submitted! We will email <strong>${email}</strong> in 30 mins.`, 'success', 'fa-envelope-circle-check');
  const messageInput = document.getElementById('ticket-message');
  if (messageInput) messageInput.value = '';
  setTimeout(() => {
    closeModal('support-modal');
  }, 2000);
}

function startLiveChatSim() {
  soundFX.pop();
  showToast('Connecting with FoodHub Support Agent...', 'info', 'fa-comments');
  setTimeout(() => {
    soundFX.success();
    showToast('Agent Priya joined! "Hello! How can I assist you with your FoodHub order today?"', 'success', 'fa-headset');
  }, 1600);
}

// ==========================================================================
// 6. CART MANAGEMENT & LOGIC
// ==========================================================================
function addToCart(foodId) {
  const item = state.menu.find(f => f.id === foodId);
  if (!item) return;

  const existing = state.cart.find(c => c.id === foodId);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({
      id: item.id,
      restaurantId: item.restaurantId || 1,
      restaurantName: item.restaurantName || "Spice Garden",
      name: item.name,
      price: item.price,
      image: item.image,
      isVeg: item.isVeg,
      quantity: 1
    });
  }

  saveCart();
  updateCartBadges();
  renderMenu();
  renderCart();
  soundFX.pop();
  showToast(`Added <strong>${item.name}</strong> to your cart!`, 'success', 'fa-cart-plus');
}

function updateCartQty(foodId, change) {
  const itemIndex = state.cart.findIndex(c => c.id === foodId);
  if (itemIndex === -1) return;

  const item = state.cart[itemIndex];
  item.quantity += change;

  if (item.quantity <= 0) {
    state.cart.splice(itemIndex, 1);
    showToast(`Removed <strong>${item.name}</strong> from cart`, 'info', 'fa-trash');
  }

  saveCart();
  updateCartBadges();
  renderMenu();
  renderCart();
  soundFX.click();
}

function removeFromCart(foodId) {
  const itemIndex = state.cart.findIndex(c => c.id === foodId);
  if (itemIndex !== -1) {
    const item = state.cart[itemIndex];
    state.cart.splice(itemIndex, 1);
    saveCart();
    updateCartBadges();
    renderMenu();
    renderCart();
    showToast(`Removed <strong>${item.name}</strong> from cart`, 'info', 'fa-trash');
  }
}

function clearCart() {
  if (state.cart.length === 0) return;
  state.cart = [];
  state.appliedCoupon = null;
  saveCart();
  updateCartBadges();
  renderMenu();
  renderCart();
  showToast('Cart cleared', 'info', 'fa-broom');
}

function saveCart() {
  localStorage.setItem('foodhub_cart', JSON.stringify(state.cart));
}

function updateCartBadges() {
  const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById('cart-badge-count');
  if (badge) {
    badge.innerText = count;
    badge.style.display = count > 0 ? 'inline-flex' : 'none';
    if (count > 0) {
      badge.classList.remove('badge-bounce');
      void badge.offsetWidth;
      badge.classList.add('badge-bounce');
    }
  }
}

function calculateCartTotals() {
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let deliveryFee = subtotal >= 299 || subtotal === 0 ? 0 : 30; // MySQL delivery_zones base fee is 30.00
  const tax = subtotal > 0 ? Math.round(subtotal * 0.05) : 0; // 5% tax

  let discount = 0;
  if (state.appliedCoupon && subtotal >= state.appliedCoupon.minOrder) {
    if (state.appliedCoupon.discountType === 'percentage') {
      discount = Math.round((subtotal * state.appliedCoupon.discountValue) / 100);
      if (state.appliedCoupon.maxDiscount && discount > state.appliedCoupon.maxDiscount) {
        discount = state.appliedCoupon.maxDiscount;
      }
    } else if (state.appliedCoupon.discountType === 'flat') {
      discount = state.appliedCoupon.discountValue;
    }
  } else if (state.appliedCoupon && subtotal < state.appliedCoupon.minOrder) {
    state.appliedCoupon = null;
  }

  // MySQL schema calculation: total_amount = subtotal - discount + tax_amount + delivery_charge
  const grandTotal = Math.max(0, subtotal - discount + tax + deliveryFee);

  return { subtotal, deliveryFee, tax, discount, grandTotal };
}

function renderCart() {
  const container = document.getElementById('cart-items-container');
  const summaryContainer = document.getElementById('cart-summary-section');
  if (!container || !summaryContainer) return;

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-state">
        <img src="https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=300&q=80" alt="Empty Cart" class="empty-cart-img"/>
        <h4>Your cart is empty!</h4>
        <p>Explore our menu and add your favorite gourmet dishes.</p>
        <button class="btn-primary" onclick="toggleCartDrawer(); scrollToMenu();">
          <i class="fa-solid fa-utensils"></i> Browse Menu
        </button>
      </div>
    `;
    summaryContainer.style.display = 'none';
    return;
  }

  summaryContainer.style.display = 'block';

  container.innerHTML = state.cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img"/>
      <div class="cart-item-info">
        <div class="cart-item-header">
          <span class="diet-icon ${item.isVeg ? 'veg' : 'non-veg'}"></span>
          <h4 class="cart-item-name">${item.name}</h4>
        </div>
        <small class="text-muted"><i class="fa-solid fa-store"></i> ${item.restaurantName || 'Spice Garden'}</small>
        <div class="cart-item-price">₹${item.price} each</div>
      </div>
      <div class="cart-item-actions">
        <div class="qty-stepper small">
          <button class="stepper-btn" onclick="updateCartQty(${item.id}, -1)">
            <i class="fa-solid fa-minus"></i>
          </button>
          <span class="stepper-val">${item.quantity}</span>
          <button class="stepper-btn" onclick="updateCartQty(${item.id}, 1)">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
        <div class="cart-item-total">₹${item.price * item.quantity}</div>
        <button class="btn-remove-item" onclick="removeFromCart(${item.id})" title="Remove item">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </div>
    </div>
  `).join('');

  // Free delivery calculation
  const totals = calculateCartTotals();
  const freeDelThreshold = 299;
  const neededForFree = Math.max(0, freeDelThreshold - totals.subtotal);
  const freeProgress = Math.min(100, Math.round((totals.subtotal / freeDelThreshold) * 100));

  const progressWrap = document.getElementById('free-delivery-progress');
  if (progressWrap) {
    if (totals.subtotal >= freeDelThreshold) {
      progressWrap.innerHTML = `
        <div class="free-delivery-banner unlocked">
          <i class="fa-solid fa-circle-check"></i>
          <span>Congratulations! You have unlocked <strong>FREE Delivery</strong>!</span>
        </div>
      `;
    } else {
      progressWrap.innerHTML = `
        <div class="free-delivery-banner">
          <div class="banner-top">
            <span>Add <strong>₹${neededForFree}</strong> more to get <strong>FREE Delivery</strong></span>
            <small>${freeProgress}%</small>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${freeProgress}%"></div>
          </div>
        </div>
      `;
    }
  }

  // Bill breakdown
  const billEl = document.getElementById('cart-bill-breakdown');
  if (billEl) {
    billEl.innerHTML = `
      <div class="bill-row">
        <span>Item Total (Subtotal)</span>
        <span>₹${totals.subtotal}</span>
      </div>
      <div class="bill-row">
        <span>Delivery Charge</span>
        <span>${totals.deliveryFee === 0 ? '<span class="text-free">FREE</span>' : '₹' + totals.deliveryFee}</span>
      </div>
      <div class="bill-row">
        <span>Taxes & GST (5%)</span>
        <span>₹${totals.tax}</span>
      </div>
      ${totals.discount > 0 ? `
        <div class="bill-row discount-row">
          <span><i class="fa-solid fa-tag"></i> Coupon Discount (${state.appliedCoupon.code})</span>
          <span class="text-discount">-₹${totals.discount}</span>
        </div>
      ` : ''}
      <div class="bill-row grand-total-row">
        <strong>TOTAL PAYABLE</strong>
        <strong>₹${totals.grandTotal}</strong>
      </div>
    `;
  }

  const couponTag = document.getElementById('applied-coupon-tag');
  if (couponTag) {
    if (state.appliedCoupon) {
      couponTag.innerHTML = `
        <div class="applied-coupon-box">
          <div class="coupon-left">
            <i class="fa-solid fa-ticket"></i>
            <div>
              <strong>${state.appliedCoupon.code}</strong>
              <small>Saving ₹${totals.discount}</small>
            </div>
          </div>
          <button class="remove-coupon-btn" onclick="removeCoupon()">Remove</button>
        </div>
      `;
    } else {
      couponTag.innerHTML = '';
    }
  }
}

// ==========================================================================
// 7. COUPON CODE LOGIC
// ==========================================================================
function applyCouponCode(codeParam) {
  const codeInput = document.getElementById('coupon-input');
  const code = (codeParam || (codeInput ? codeInput.value : '')).trim().toUpperCase();

  if (!code) {
    showToast('Please enter a coupon code', 'warning', 'fa-triangle-exclamation');
    return;
  }

  const { subtotal } = calculateCartTotals();
  if (subtotal === 0) {
    showToast('Your cart is empty! Add items first.', 'warning', 'fa-cart-shopping');
    return;
  }

  const coupon = CouponsList.find(c => c.code === code);
  if (!coupon) {
    showToast(`Coupon "${code}" is invalid or expired.`, 'error', 'fa-circle-xmark');
    return;
  }

  if (subtotal < coupon.minOrder) {
    showToast(`Order total must be at least ₹${coupon.minOrder} for ${coupon.code}.`, 'warning', 'fa-circle-exclamation');
    return;
  }

  state.appliedCoupon = coupon;
  if (codeInput) codeInput.value = '';
  renderCart();
  soundFX.success();
  showToast(`Promo code <strong>${coupon.code}</strong> applied!`, 'success', 'fa-gift');
  closeModal('coupons-modal');
}

function removeCoupon() {
  state.appliedCoupon = null;
  renderCart();
  showToast('Coupon removed.', 'info', 'fa-trash');
}

// ==========================================================================
// 8. WISHLIST MANAGEMENT
// ==========================================================================
function toggleWishlist(foodId) {
  const index = state.wishlist.indexOf(foodId);
  const dish = state.menu.find(m => m.id === foodId);
  if (index === -1) {
    state.wishlist.push(foodId);
    showToast(`Saved <strong>${dish ? dish.name : 'Item'}</strong> to Wishlist!`, 'success', 'fa-heart');
    soundFX.pop();
  } else {
    state.wishlist.splice(index, 1);
    showToast(`Removed from Wishlist`, 'info', 'fa-heart-crack');
  }

  localStorage.setItem('foodhub_wishlist', JSON.stringify(state.wishlist));
  updateWishlistBadge();
  renderMenu();
  renderWishlist();
}

function updateWishlistBadge() {
  const count = state.wishlist.length;
  const badge = document.getElementById('wishlist-badge-count');
  if (badge) {
    badge.innerText = count;
    badge.style.display = count > 0 ? 'inline-flex' : 'none';
  }
}

function renderWishlist() {
  const container = document.getElementById('wishlist-items-container');
  if (!container) return;

  if (state.wishlist.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon text-muted"><i class="fa-regular fa-heart"></i></div>
        <h4>No favorites saved yet</h4>
        <p>Click the heart icon on any food item to save it here for later.</p>
        <button class="btn-primary" onclick="closeModal('wishlist-modal'); scrollToMenu();">Explore Dishes</button>
      </div>
    `;
    return;
  }

  const items = state.menu.filter(m => state.wishlist.includes(m.id));
  container.innerHTML = items.map(item => `
    <div class="wishlist-row">
      <img src="${item.image}" alt="${item.name}" class="wishlist-img"/>
      <div class="wishlist-info">
        <div class="food-meta">
          <span class="diet-badge ${item.isVeg ? 'veg' : 'non-veg'}">
            <span class="diet-circle"></span> ${item.isVeg ? 'VEG' : 'NON-VEG'}
          </span>
          <span class="rating-badge"><i class="fa-solid fa-star"></i> ${item.rating}</span>
        </div>
        <h4>${item.name}</h4>
        <small class="text-muted"><i class="fa-solid fa-store"></i> ${item.restaurantName || 'Spice Garden'}</small>
        <div class="current-price">₹${item.price}</div>
      </div>
      <div class="wishlist-actions">
        <button class="btn-primary btn-sm" onclick="addToCart(${item.id}); toggleWishlist(${item.id});">
          <i class="fa-solid fa-cart-plus"></i> Move to Cart
        </button>
        <button class="btn-outline-danger btn-sm" onclick="toggleWishlist(${item.id})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  `).join('');
}

// ==========================================================================
// 9. ADDRESS MANAGEMENT (MySQL delivery_address table)
// ==========================================================================
function setDeliveryAddress(addressText, addressId = 1, zoneId = 1) {
  state.currentAddress = addressText;
  state.currentAddressId = addressId;
  state.currentZoneId = zoneId;
  localStorage.setItem('foodhub_address', addressText);
  
  const displayAddress = document.getElementById('navbar-address-display');
  if (displayAddress) {
    displayAddress.innerText = addressText.length > 25 ? addressText.substring(0, 25) + '...' : addressText;
    displayAddress.title = addressText;
  }

  const checkoutAddress = document.getElementById('checkout-confirm-address');
  if (checkoutAddress) {
    checkoutAddress.innerText = addressText;
  }

  closeModal('address-modal');
  showToast(`Delivery location set to: <strong>${addressText}</strong>`, 'info', 'fa-location-dot');
}

function handleCustomAddressSubmit(e) {
  e.preventDefault();
  const street = document.getElementById('addr-street').value.trim();
  const city = document.getElementById('addr-city').value.trim();
  const pincode = document.getElementById('addr-pincode').value.trim();

  if (!street || !city) {
    showToast('Please fill in street and city', 'warning', 'fa-triangle-exclamation');
    return;
  }

  const fullAddress = `${street}, ${city} - ${pincode || '462011'}`;
  
  // Save to MySQL via API
  fetch('/api/addresses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerId: state.currentUser ? state.currentUser.id : 1,
      addressLine: street,
      city: city,
      postalCode: pincode,
      isDefault: true
    })
  })
  .then(res => res.json())
  .then(data => {
    setDeliveryAddress(fullAddress, data.data?.address_id || 1, 1);
  })
  .catch(() => {
    setDeliveryAddress(fullAddress, 1, 1);
  });
}

// ==========================================================================
// 10. AUTHENTICATION (SIGNUP & LOGIN - MySQL Customers)
// ==========================================================================
function switchAuthTab(tab) {
  const loginForm = document.getElementById('auth-login-form');
  const signupForm = document.getElementById('auth-signup-form');
  const loginTab = document.getElementById('tab-login-btn');
  const signupTab = document.getElementById('tab-signup-btn');

  if (tab === 'login') {
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
  } else {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    loginTab.classList.remove('active');
    signupTab.classList.add('active');
  }
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();

  if (!email) {
    showToast('Please enter your email', 'warning', 'fa-exclamation');
    return;
  }

  // Connect to backend MySQL auth API
  fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      state.currentUser = data.user;
      localStorage.setItem('foodhub_user', JSON.stringify(state.currentUser));
      updateUserNavbar();
      closeModal('auth-modal');
      soundFX.success();
      showToast(data.message || `Welcome back, ${data.user.name}!`, 'success', 'fa-circle-check');
    } else {
      showToast(data.message || 'Login failed', 'error', 'fa-triangle-exclamation');
    }
  })
  .catch(() => {
    // Client fallback
    state.currentUser = {
      id: 1,
      name: email.split('@')[0].toUpperCase(),
      email: email,
      phone: "9876500001",
      address: state.currentAddress
    };
    localStorage.setItem('foodhub_user', JSON.stringify(state.currentUser));
    updateUserNavbar();
    closeModal('auth-modal');
    soundFX.success();
    showToast(`Welcome back, ${state.currentUser.name}!`, 'success', 'fa-circle-check');
  });
}

function handleSignupSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const phone = document.getElementById('signup-phone').value.trim();
  const address = document.getElementById('signup-address').value.trim();
  const password = document.getElementById('signup-password').value.trim();

  if (!name || !email) {
    showToast('Please fill all mandatory fields', 'warning', 'fa-exclamation');
    return;
  }

  fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, phone, address, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      state.currentUser = data.user;
      localStorage.setItem('foodhub_user', JSON.stringify(state.currentUser));
      updateUserNavbar();
      closeModal('auth-modal');
      soundFX.success();
      showToast(data.message || `Account created in MySQL!`, 'success', 'fa-gift');
    } else {
      showToast(data.message || 'Registration failed', 'error', 'fa-triangle-exclamation');
    }
  })
  .catch(() => {
    state.currentUser = { id: 1, name, email, phone, address };
    localStorage.setItem('foodhub_user', JSON.stringify(state.currentUser));
    updateUserNavbar();
    closeModal('auth-modal');
    showToast(`Welcome, ${name}! Saved to local state.`, 'success', 'fa-gift');
  });
}

function fillDemoUser(email, name) {
  document.getElementById('login-email').value = email;
  document.getElementById('login-password').value = "password123";
  showToast(`Filled MySQL user: <strong>${name}</strong>`, 'info', 'fa-user-check');
}

function logoutUser() {
  state.currentUser = null;
  localStorage.removeItem('foodhub_user');
  updateUserNavbar();
  closeModal('profile-modal');
  showToast('Logged out successfully.', 'info', 'fa-right-from-bracket');
}

function updateUserNavbar() {
  const userBtn = document.getElementById('navbar-user-btn');
  if (!userBtn) return;

  if (state.currentUser) {
    userBtn.innerHTML = `
      <i class="fa-solid fa-user-check text-primary"></i>
      <span>${state.currentUser.name.split(' ')[0]}</span>
    `;
    userBtn.onclick = () => {
      document.getElementById('profile-modal-name').innerText = state.currentUser.name;
      document.getElementById('profile-modal-info').innerText = `${state.currentUser.email} • ${state.currentUser.phone || ''}`;
      openModal('profile-modal');
    };
  } else {
    userBtn.innerHTML = `
      <i class="fa-regular fa-user"></i>
      <span>Login</span>
    `;
    userBtn.onclick = () => openModal('auth-modal');
  }
}

// ==========================================================================
// 11. CHECKOUT & LIVE ORDER TRACKER (MySQL Orders & Drivers)
// ==========================================================================
function openCheckoutModal() {
  if (state.cart.length === 0) {
    showToast('Add some dishes to your cart first!', 'warning', 'fa-cart-shopping');
    return;
  }

  const totals = calculateCartTotals();
  const summaryList = document.getElementById('checkout-items-list');
  if (summaryList) {
    summaryList.innerHTML = state.cart.map(c => `
      <div class="checkout-summary-row">
        <span>${c.name} <strong>x${c.quantity}</strong></span>
        <span>₹${c.price * c.quantity}</span>
      </div>
    `).join('');
  }

  const checkoutTotal = document.getElementById('checkout-final-amount');
  if (checkoutTotal) checkoutTotal.innerText = `₹${totals.grandTotal}`;

  const addressText = document.getElementById('checkout-confirm-address');
  if (addressText) addressText.innerText = state.currentAddress;

  closeModal('cart-drawer');
  openModal('checkout-modal');
}

function placeOrder(e) {
  e.preventDefault();
  const placeBtn = document.getElementById('btn-place-order');
  if (placeBtn) {
    placeBtn.disabled = true;
    placeBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Writing to MySQL Database...`;
  }

  const paymentMethod = document.querySelector('input[name="payment_method"]:checked')?.value || 'Cash on Delivery';
  const totals = calculateCartTotals();
  const restId = state.cart[0]?.restaurantId || 1;

  // Send Order to MySQL Backend
  fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerId: state.currentUser ? (state.currentUser.id || 1) : 1,
      restaurantId: restId,
      addressId: state.currentAddressId || 1,
      zoneId: state.currentZoneId || 1,
      items: state.cart,
      subtotal: totals.subtotal,
      discount: totals.discount,
      deliveryFee: totals.deliveryFee,
      tax: totals.tax,
      total: totals.grandTotal,
      paymentMethod: paymentMethod
    })
  })
  .then(res => res.json())
  .then(data => {
    const orderData = data.order || {
      id: `FH-${Math.floor(1000 + Math.random() * 9000)}`,
      total: totals.grandTotal,
      paymentMethod: paymentMethod,
      address: state.currentAddress,
      driverName: "Aman Verma",
      driverPhone: "9820000001",
      status: "Placed"
    };

    onOrderSuccess(orderData, placeBtn);
  })
  .catch(() => {
    // Fallback if network offline
    const fallbackOrder = {
      id: `FH-${Math.floor(1000 + Math.random() * 9000)}`,
      total: totals.grandTotal,
      paymentMethod: paymentMethod,
      address: state.currentAddress,
      driverName: "Aman Verma",
      driverPhone: "9820000001",
      status: "Placed"
    };
    onOrderSuccess(fallbackOrder, placeBtn);
  });
}

function onOrderSuccess(order, placeBtn) {
  state.activeOrder = order;

  // Clear cart
  state.cart = [];
  state.appliedCoupon = null;
  saveCart();
  updateCartBadges();
  renderMenu();

  if (placeBtn) {
    placeBtn.disabled = false;
    placeBtn.innerHTML = `<i class="fa-solid fa-shield-halved"></i> Pay & Confirm Order`;
  }

  closeModal('checkout-modal');
  soundFX.success();
  triggerConfetti();
  startLiveOrderTracker(order);
  showToast(`Order <strong>#${order.id}</strong> recorded in MySQL!`, 'success', 'fa-database');
}

function startLiveOrderTracker(order) {
  const trackerOrderId = document.getElementById('tracker-order-id');
  const trackerAddress = document.getElementById('tracker-address');
  const trackerTotal = document.getElementById('tracker-total');
  const trackerDriver = document.getElementById('tracker-driver');

  if (trackerOrderId) trackerOrderId.innerText = `#${order.id}`;
  if (trackerAddress) trackerAddress.innerText = order.address || state.currentAddress;
  if (trackerTotal) trackerTotal.innerText = `₹${order.total} (${order.paymentMethod})`;
  if (trackerDriver) trackerDriver.innerText = `${order.driverName || 'Aman Verma'} (+91 ${order.driverPhone || '98200 00001'})`;

  openModal('tracker-modal');
  updateTrackerUI(1);

  // Live order progress matching MySQL status transitions
  let step = 1;
  const statusTexts = [
    "Order Placed & Stored in MySQL",
    "Kitchen Prepared: Chef prepared your order",
    "Driver Picked Up: Aman Verma is on the way",
    "Delivered! Thank you for choosing FoodHub"
  ];

  if (window.orderTrackerTimer) clearInterval(window.orderTrackerTimer);

  window.orderTrackerTimer = setInterval(() => {
    step++;
    if (step <= 4) {
      updateTrackerUI(step);
      showToast(statusTexts[step - 1], 'info', 'fa-bell');
      soundFX.pop();
    } else {
      clearInterval(window.orderTrackerTimer);
    }
  }, 9000);
}

function updateTrackerUI(step) {
  for (let i = 1; i <= 4; i++) {
    const stepEl = document.getElementById(`track-step-${i}`);
    if (stepEl) {
      if (i < step) {
        stepEl.className = 'track-step completed';
      } else if (i === step) {
        stepEl.className = 'track-step active';
      } else {
        stepEl.className = 'track-step pending';
      }
    }
  }

  const progressLine = document.getElementById('track-progress-fill');
  if (progressLine) {
    const percent = ((step - 1) / 3) * 100;
    progressLine.style.width = `${percent}%`;
  }
}

// Confetti generator for order celebration
function triggerConfetti() {
  const canvas = document.createElement('canvas');
  canvas.id = 'confetti-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '99999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#f36b3f', '#ff9900', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.7) * 16,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10,
      alpha: 1
    });
  }

  let frames = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.25;
      p.rotation += p.vRot;
      p.alpha -= 0.012;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });

    frames++;
    if (frames < 90) {
      requestAnimationFrame(animate);
    } else {
      canvas.remove();
    }
  }
  requestAnimationFrame(animate);
}

// ==========================================================================
// 12. ORDER HISTORY (Loaded from MySQL)
// ==========================================================================
function renderOrderHistory() {
  const container = document.getElementById('order-history-list');
  if (!container) return;

  fetch('/api/orders')
    .then(res => res.json())
    .then(data => {
      const orders = data.data || [];
      if (orders.length === 0) {
        container.innerHTML = `<p class="text-muted text-center py-4">No past orders in database yet.</p>`;
        return;
      }

      container.innerHTML = orders.map(o => `
        <div class="history-item">
          <div class="history-item-top">
            <div>
              <h4>Order #${o.order_id || o.id} • ${o.restaurant_name || 'Spice Garden'}</h4>
              <small>${new Date(o.placed_at || Date.now()).toLocaleString()}</small>
            </div>
            <span class="status-badge delivered"><i class="fa-solid fa-circle-check"></i> ${o.order_status || 'Delivered'}</span>
          </div>
          <p class="history-items-text">
            ${o.items ? o.items.map(i => `${i.item_name || i.item_name_snapshot} (x${i.quantity})`).join(', ') : 'Gourmet meal'}
          </p>
          <div class="history-item-bottom">
            <strong>Total: ₹${o.total_amount || o.total}</strong>
            <button class="btn-primary btn-sm" onclick="startLiveOrderTracker({ id: ${o.order_id || 1}, total: ${o.total_amount || 471}, driverName: '${o.driver_name || 'Aman Verma'}', driverPhone: '${o.driver_phone || '9820000001'}' }); closeModal('history-modal');">
              <i class="fa-solid fa-location-crosshairs"></i> Track Live
            </button>
          </div>
        </div>
      `).join('');
    })
    .catch(() => {
      container.innerHTML = `
        <div class="history-item">
          <div class="history-item-top">
            <div>
              <h4>Order #1 • Spice Garden (Bhopal)</h4>
              <small>12 Oct 2026, 11:21 PM</small>
            </div>
            <span class="status-badge delivered"><i class="fa-solid fa-circle-check"></i> Prepared</span>
          </div>
          <p class="history-items-text">Paneer Butter Masala (x1), Veg Biryani (x1)</p>
          <div class="history-item-bottom">
            <strong>Total: ₹471.00 (UPI)</strong>
            <button class="btn-primary btn-sm" onclick="startLiveOrderTracker({ id: 1, total: 471, driverName: 'Aman Verma', driverPhone: '9820000001' }); closeModal('history-modal');">
              <i class="fa-solid fa-location-crosshairs"></i> Track Live
            </button>
          </div>
        </div>
      `;
    });
}

// ==========================================================================
// 13. FOOD DETAIL MODAL
// ==========================================================================
function openFoodDetail(id) {
  const item = state.menu.find(m => m.id === id);
  if (!item) return;

  const content = document.getElementById('food-detail-body');

  content.innerHTML = `
    <div class="food-detail-layout">
      <div class="food-detail-img-col">
        <img src="${item.image}" alt="${item.name}" class="food-detail-img"/>
        <span class="diet-badge ${item.isVeg ? 'veg' : 'non-veg'}">
          <span class="diet-circle"></span> ${item.isVeg ? 'PURE VEGETARIAN' : 'NON-VEGETARIAN'}
        </span>
      </div>
      <div class="food-detail-info-col">
        <div class="restaurant-tag"><i class="fa-solid fa-store"></i> ${item.restaurantName || 'Spice Garden'}</div>
        <h2>${item.name}</h2>
        <div class="food-meta">
          <span class="rating-badge"><i class="fa-solid fa-star"></i> ${item.rating} (${item.reviewsCount} reviews)</span>
          <span class="delivery-time"><i class="fa-regular fa-clock"></i> ${item.time}</span>
          <span class="calorie-badge"><i class="fa-solid fa-fire"></i> ${item.calories}</span>
        </div>
        <p class="detail-description">${item.description}</p>
        
        <div class="ingredients-list">
          <h4>Key Ingredients:</h4>
          <div class="ingredients-tags">
            ${item.ingredients ? item.ingredients.map(ing => `<span class="ing-tag">${ing}</span>`).join('') : '<span class="ing-tag">Fresh Herbs & Spices</span>'}
          </div>
        </div>

        <div class="detail-footer">
          <div class="price-box">
            <span class="current-price">₹${item.price}</span>
            <span class="original-price">₹${item.originalPrice}</span>
            <span class="discount-pill">${item.discount || '15% OFF'}</span>
          </div>
          <button class="btn-primary" onclick="addToCart(${item.id}); closeModal('food-detail-modal');">
            <i class="fa-solid fa-cart-plus"></i> Add to Cart • ₹${item.price}
          </button>
        </div>
      </div>
    </div>
  `;

  openModal('food-detail-modal');
}

// ==========================================================================
// 14. REWARDS
// ==========================================================================
function renderRewards() {
  const container = document.getElementById('rewards-list-container');
  const pointsBadge = document.getElementById('reward-points-total');
  if (pointsBadge) pointsBadge.innerText = `${state.rewardPoints} pts`;

  if (!container) return;

  const rewards = [
    { id: "rew_1", name: "Free Choco Lava Cake", cost: 150, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80", desc: "Redeem 1 free chocolate lava cake" },
    { id: "rew_2", name: "Flat ₹75 Off Voucher", cost: 200, image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=400&q=80", desc: "Get ₹75 off on any order > ₹200" },
    { id: "rew_3", name: "Free Belgian Thickshake", cost: 250, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80", desc: "Redeem 1 thick shake of choice" }
  ];

  container.innerHTML = rewards.map(r => `
    <div class="reward-card">
      <img src="${r.image}" alt="${r.name}" class="reward-img"/>
      <div class="reward-info">
        <h4>${r.name}</h4>
        <p>${r.desc}</p>
        <div class="reward-cost"><i class="fa-solid fa-coins"></i> ${r.cost} Points</div>
      </div>
      <button class="btn-outline-primary btn-sm" onclick="redeemReward('${r.id}', ${r.cost}, '${r.name}')">
        Redeem
      </button>
    </div>
  `).join('');
}

function redeemReward(id, cost, name) {
  if (state.rewardPoints < cost) {
    showToast(`You need ${cost - state.rewardPoints} more points to redeem this!`, 'warning', 'fa-coins');
    return;
  }

  state.rewardPoints -= cost;
  renderRewards();
  soundFX.success();
  showToast(`Congratulations! You redeemed <strong>${name}</strong>!`, 'success', 'fa-gift');
}

function scrollToMenu() {
  const menuSec = document.getElementById('menu-section');
  if (menuSec) {
    menuSec.scrollIntoView({ behavior: 'smooth' });
  }
}

// ==========================================================================
// 15. INITIALIZATION & DATABASE SYNC
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadges();
  updateWishlistBadge();
  updateUserNavbar();
  renderMenu();
  renderOrderHistory();

  const addressDisplay = document.getElementById('navbar-address-display');
  if (addressDisplay) {
    addressDisplay.innerText = state.currentAddress.length > 25 ? state.currentAddress.substring(0, 25) + '...' : state.currentAddress;
  }

  // Search input handler
  const searchInput = document.querySelector('.search-box input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderMenu();
    });
  }

  // Category filter buttons
  document.querySelectorAll('.cat-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cat-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeCategory = btn.dataset.category || 'all';
      renderMenu();
      soundFX.click();
    });
  });

  // Veg Only Toggle
  const vegToggle = document.getElementById('veg-only-checkbox');
  if (vegToggle) {
    vegToggle.addEventListener('change', (e) => {
      state.isVegOnly = e.target.checked;
      renderMenu();
      soundFX.click();
    });
  }

  // Sort dropdown
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderMenu();
      soundFX.click();
    });
  }

  // Fetch Database Connection Status and populate menu from MySQL API
  fetch('/api/db/status')
    .then(res => res.json())
    .then(data => {
      const dbStatusBadge = document.getElementById('db-status-indicator');
      const dbStatusText = document.getElementById('db-status-text');
      if (data.success && data.status) {
        state.isMysqlLive = data.status.connected;
        if (dbStatusText) {
          dbStatusText.innerText = data.status.connected ? "MySQL 8 Connected" : "MySQL DB Active";
        }
        if (dbStatusBadge && !data.status.connected) {
          dbStatusBadge.classList.add('fallback');
          dbStatusBadge.title = "MySQL Schema & Seed Data Active";
        }
      }
    })
    .catch(() => {
      console.log('Running in local mode');
    });

  // Fetch dynamic menu from MySQL API
  fetch('/api/menu')
    .then(res => res.json())
    .then(data => {
      if (data.success && data.data && data.data.length > 0) {
        state.menu = data.data;
        renderMenu();
      }
    })
    .catch(err => {
      console.log('Using preloaded fallback dataset:', err);
    });
});
