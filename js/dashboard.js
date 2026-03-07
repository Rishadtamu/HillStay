function formatCurrency(value) {
  if (!Number.isFinite(value)) return "N/A";
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

function formatNumber(value) {
  if (!Number.isFinite(value)) return "0";
  return Number(value).toLocaleString("en-IN");
}

function average(values) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function groupBy(items, keySelector) {
  return items.reduce((acc, item) => {
    const key = keySelector(item);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}

function computeDashboardModel(listings) {
  const priced = listings.filter((item) => Number(item.price) > 0);
  const ratings = listings.map((item) => Number(item.rating) || 0).filter((rating) => rating > 0);
  const totalReviews = listings.reduce((sum, item) => sum + (Number(item.reviews) || 0), 0);

  const kpis = [
    { label: "Total Listings", value: formatNumber(listings.length) },
    { label: "Average Nightly Price", value: formatCurrency(average(priced.map((item) => Number(item.price)))) },
    { label: "Average Rating", value: average(ratings).toFixed(2) },
    { label: "Total Reviews", value: formatNumber(totalReviews) }
  ];

  const categories = groupBy(listings, (item) => item.category || "Uncategorized");
  const priceByCategory = Object.entries(categories).map(([category, rows]) => ({
    name: category,
    value: average(rows.map((row) => Number(row.price) || 0))
  })).sort((a, b) => b.value - a.value);

  const ratingBuckets = [
    { name: "4.5 - 5.0", min: 4.5, max: 5.01 },
    { name: "4.0 - 4.49", min: 4.0, max: 4.5 },
    { name: "3.5 - 3.99", min: 3.5, max: 4.0 },
    { name: "< 3.5", min: 0, max: 3.5 }
  ];

  const ratingMix = ratingBuckets.map((bucket) => ({
    name: bucket.name,
    value: listings.filter((item) => {
      const rating = Number(item.rating) || 0;
      return rating >= bucket.min && rating < bucket.max;
    }).length
  }));

  const locations = groupBy(listings, (item) => item.location || "Unknown");
  const breakdown = Object.entries(locations).map(([location, rows]) => ({
    location,
    listings: rows.length,
    avgPrice: average(rows.map((row) => Number(row.price) || 0)),
    avgRating: average(rows.map((row) => Number(row.rating) || 0)),
    totalReviews: rows.reduce((sum, row) => sum + (Number(row.reviews) || 0), 0),
    permitRequired: rows.filter((row) => row.permit === 1 || row.permit === true).length
  })).sort((a, b) => b.listings - a.listings);

  return { kpis, priceByCategory, ratingMix, breakdown };
}

function renderKpis(kpis) {
  const grid = document.getElementById("kpi-grid");
  grid.innerHTML = kpis.map((kpi) => `
    <article class="dashboard-kpi-card">
      <p>${kpi.label}</p>
      <h3>${kpi.value}</h3>
    </article>
  `).join("");
}

function renderHorizontalBars(targetId, rows, formatter) {
  const target = document.getElementById(targetId);
  const maxValue = Math.max(...rows.map((row) => row.value), 1);

  target.innerHTML = rows.map((row) => {
    const width = Math.max(6, (row.value / maxValue) * 100);
    return `
      <div class="dashboard-bar-row">
        <div class="dashboard-bar-label">${row.name}</div>
        <div class="dashboard-bar-track">
          <div class="dashboard-bar-fill" style="width:${width}%"></div>
        </div>
        <div class="dashboard-bar-value">${formatter(row.value)}</div>
      </div>
    `;
  }).join("");
}

function renderBreakdown(rows) {
  const body = document.getElementById("dashboard-breakdown-body");

  if (!rows.length) {
    body.innerHTML = `<tr><td colspan="6" class="dashboard-empty-cell">No data found.</td></tr>`;
    return;
  }

  body.innerHTML = rows.map((row) => `
    <tr>
      <td>${row.location}</td>
      <td>${formatNumber(row.listings)}</td>
      <td>${formatCurrency(row.avgPrice)}</td>
      <td>${row.avgRating.toFixed(2)}</td>
      <td>${formatNumber(row.totalReviews)}</td>
      <td>${formatNumber(row.permitRequired)}</td>
    </tr>
  `).join("");
}

function setStatus(message, isError = false) {
  const node = document.getElementById("dashboard-status");
  node.textContent = message;
  node.classList.toggle("is-error", isError);
}

async function loadDashboardData() {
  setStatus("Loading data from /api/listings...");

  try {
    const response = await fetch("/api/listings");
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const listings = await response.json();
    const model = computeDashboardModel(Array.isArray(listings) ? listings : []);

    renderKpis(model.kpis);
    renderHorizontalBars("price-trend-chart", model.priceByCategory, (value) => formatCurrency(value));
    renderHorizontalBars("rating-trend-chart", model.ratingMix, (value) => `${formatNumber(value)} listings`);
    renderBreakdown(model.breakdown);
    setStatus(`Loaded ${formatNumber(listings.length)} listings. Last refreshed at ${new Date().toLocaleTimeString()}.`);
  } catch (error) {
    setStatus(`Unable to load dashboard data: ${error.message}`, true);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (typeof updateAuthUI === "function") {
    updateAuthUI();
  }
  if (typeof setupMobileMenu === "function") {
    setupMobileMenu();
  }

  const refreshBtn = document.getElementById("dashboard-refresh-btn");
  refreshBtn?.addEventListener("click", loadDashboardData);

  loadDashboardData();
});
