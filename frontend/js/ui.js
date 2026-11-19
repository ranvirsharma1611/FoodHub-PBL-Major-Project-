const UI = {
  initPortalLayout(portalType = 'user', activePage = 'dashboard') {
    this.renderSidebar(portalType, activePage);
    this.renderTopbar(portalType);
    this.initSidebarToggle();
  },

  renderSidebar(portalType, activePage) {
    const container = document.getElementById('app-sidebar-container');
    if (!container) return;

    const isUser = portalType === 'user';
    const relativePrefix = isUser ? '../' : '../';

    const userLinks = [
      { id: 'dashboard', label: 'Dashboard', icon: 'fa-house', href: 'dashboard.html' },
      { id: 'orders', label: 'My Past Orders', icon: 'fa-receipt', href: 'orders.html' },
      { id: 'track', label: 'Live Order Tracker', icon: 'fa-location-crosshairs', href: 'track.html' },
      { id: 'reports', label: 'Order Analytics', icon: 'fa-chart-pie', href: 'reports.html' },
      { id: 'payments', label: 'FoodHub Wallet', icon: 'fa-wallet', href: 'payments.html' },
      { id: 'profile', label: 'Saved Addresses', icon: 'fa-location-dot', href: 'profile.html' },
      { id: 'support', label: 'Customer Care 24/7', icon: 'fa-headset', href: 'support.html' }
    ];

    const adminLinks = [
      { id: 'dashboard', label: 'Admin Command', icon: 'fa-gauge-high', href: 'dashboard.html' },
      { id: 'orders', label: 'Dispatch & Orders', icon: 'fa-bell-concierge', href: 'orders.html' },
      { id: 'menu', label: 'Dishes & Menus', icon: 'fa-utensils', href: 'menu.html' },
      { id: 'restaurants', label: 'Restaurants', icon: 'fa-store', href: 'restaurants.html' },
      { id: 'drivers', label: 'Delivery Fleet', icon: 'fa-motorcycle', href: 'drivers.html' },
      { id: 'customers', label: 'Customers & Reviews', icon: 'fa-users', href: 'customers.html' }
    ];

    const links = isUser ? userLinks : adminLinks;
    const user = JSON.parse(localStorage.getItem('foodhub_user')) || { name: isUser ? 'Aarav Sharma' : 'Admin Operator', email: 'user@foodhub.com' };

    container.innerHTML = `
      <aside class="app-sidebar" id="app-sidebar">
        <div class="sidebar-brand">
          <a href="${relativePrefix}index.html" class="brand-logo">
            Food<span>Hub</span>
          </a>
        </div>

        <nav class="sidebar-nav">
          <div class="sidebar-heading">${isUser ? 'Customer Portal' : 'Store Management'}</div>
          ${links.map(l => `
            <a href="${l.href}" class="nav-link ${l.id === activePage ? 'active' : ''}">
              <i class="fa-solid ${l.icon}"></i>
              <span>${l.label}</span>
            </a>
          `).join('')}

          <div class="sidebar-heading">Shortcuts</div>
          <a href="${relativePrefix}index.html" class="nav-link">
            <i class="fa-solid fa-arrow-left"></i>
            <span>Return to Store</span>
          </a>
        </nav>

        <div class="sidebar-footer">
          <div class="user-mini-card">
            <div class="user-mini-avatar">
              <i class="fa-solid ${isUser ? 'fa-user' : 'fa-user-shield'}"></i>
            </div>
            <div style="flex: 1; min-width: 0;">
              <strong style="display: block; font-size: 0.8125rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${user.name}</strong>
              <small style="font-size: 0.75rem; color: var(--color-text-muted);">${isUser ? 'Loyalty Gold' : 'Store Admin'}</small>
            </div>
            <button onclick="UI.logout('${relativePrefix}')" title="Logout" style="color: var(--color-text-muted); font-size: 1rem;">
              <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </div>
        </div>
      </aside>
    `;
  },

  renderTopbar(portalType) {
    const container = document.getElementById('app-topbar-container');
    if (!container) return;

    container.innerHTML = `
      <header class="app-topbar">
        <div class="topbar-left">
          <button class="sidebar-toggle-btn" id="sidebar-toggle-btn" aria-label="Toggle Sidebar">
            <i class="fa-solid fa-bars"></i>
          </button>
          <span class="badge ${portalType === 'admin' ? 'badge-primary' : 'badge-success'}">
            <i class="fa-solid fa-bolt"></i> ${portalType === 'admin' ? 'Admin Portal Active' : 'Live Order Desk'}
          </span>
        </div>
        <div class="topbar-right">
          <a href="../index.html#menu-section" class="btn btn-primary btn-sm">
            <i class="fa-solid fa-bag-shopping"></i>
            <span>Order Food</span>
          </a>
        </div>
      </header>
    `;
  },

  initSidebarToggle() {
    const toggleBtn = document.getElementById('sidebar-toggle-btn');
    const sidebar = document.getElementById('app-sidebar');
    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
      });
    }
  },

  showToast(message, type = 'info', icon = 'fa-info-circle') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-item`;
    toast.innerHTML = `
      <i class="fa-solid ${icon} text-primary"></i>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  },

  logout(relativePrefix = '../') {
    localStorage.removeItem('foodhub_token');
    window.location.href = `${relativePrefix}login.html`;
  }
};

if (typeof window !== 'undefined') {
  window.UI = UI;
}
