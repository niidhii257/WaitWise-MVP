/**
 * WaitWise MVP - Application Logic
 * Handles real-time clinic search, screen transitions, dynamic rendering, and queue display.
 */

(function () {
  "use strict";

  // Application State
  const state = {
    currentScreen: "screen-home",
    previousScreen: "screen-home",
    selectedClinicId: "malviya-apex",
    clinics: window.sampleClinics || [],
    currentQuery: ""
  };

  // DOM Elements
  const elements = {
    // Brand Header
    brandLogo: document.getElementById("brand-logo"),

    // Screen containers
    screenHome: document.getElementById("screen-home"),
    screenResults: document.getElementById("screen-results"),
    screenDetails: document.getElementById("screen-details"),
    screenQueue: document.getElementById("screen-queue"),

    // Screen 1: Home
    searchForm: document.getElementById("search-form"),
    searchInput: document.getElementById("search-input"),
    btnInputClear: document.getElementById("btn-input-clear"),
    btnSearch: document.getElementById("btn-search"),
    homeClinicsHeading: document.getElementById("home-clinics-heading"),
    homeClinicsCount: document.getElementById("home-clinics-count"),
    nearbyClinicsList: document.getElementById("nearby-clinics-list"),
    localityChips: document.querySelectorAll(".locality-chip"),

    // Screen 2: Results
    resultsTitle: document.getElementById("results-title"),
    resultsCount: document.getElementById("results-count"),
    searchResultsList: document.getElementById("search-results-list"),
    btnResultsBack: document.getElementById("btn-results-back"),

    // Screen 3: Details
    detailsClinicName: document.getElementById("details-clinic-name"),
    detailsClinicAddress: document.getElementById("details-clinic-address"),
    detailsTimings: document.getElementById("details-timings"),
    detailsDoctors: document.getElementById("details-doctors"),
    detailsWaitTime: document.getElementById("details-wait-time"),
    detailsPatientsCount: document.getElementById("details-patients-count"),
    detailsLastUpdated: document.getElementById("details-last-updated"),
    btnRefreshDetails: document.getElementById("btn-refresh-details"),
    detailsArrivalInstructions: document.getElementById("details-arrival-instructions"),
    btnCheckQueue: document.getElementById("btn-check-queue"),
    btnDetailsBack: document.getElementById("btn-details-back"),

    // Screen 4: Queue
    queueClinicName: document.getElementById("queue-clinic-name"),
    queueClinicAddress: document.getElementById("queue-clinic-address"),
    queueWaitTime: document.getElementById("queue-wait-time"),
    queuePatientsCount: document.getElementById("queue-patients-count"),
    queueLastUpdated: document.getElementById("queue-last-updated"),
    btnRefreshQueue: document.getElementById("btn-refresh-queue"),
    queueCheckInInstructions: document.getElementById("queue-check-in-instructions"),
    btnQueueHome: document.getElementById("btn-queue-home")
  };

  /**
   * Normalize search text:
   * - Converts to lowercase
   * - Replaces punctuation (hyphens, dots, commas, slashes) with spaces
   * - Collapses multiple spaces into a single space
   * - Trims leading and trailing whitespace
   */
  function normalizeText(text) {
    if (!text) return "";
    return text
      .toLowerCase()
      .replace(/[-_.,/]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  /**
   * Robust multi-term partial matching:
   * Checks if query matches clinic name, locality, address, or doctor availability.
   * Handles partial names ("malv", "nagar", "mansar", "vaishali", "cscheme").
   */
  function filterClinics(query) {
    const cleanQuery = normalizeText(query);
    if (!cleanQuery) {
      return state.clinics;
    }

    const queryNoSpaces = cleanQuery.replace(/\s+/g, "");
    const terms = cleanQuery.split(" ").filter(Boolean);

    return state.clinics.filter((clinic) => {
      const nameNorm = normalizeText(clinic.name);
      const localityNorm = normalizeText(clinic.locality || "");
      const addressNorm = normalizeText(clinic.address);
      const combined = `${nameNorm} ${localityNorm} ${addressNorm}`;
      const combinedNoSpaces = combined.replace(/\s+/g, "");

      // Match concatenated words without spaces (e.g. "cscheme" matches "c scheme")
      if (combinedNoSpaces.includes(queryNoSpaces)) {
        return true;
      }

      // Check if every search term appears somewhere in the clinic's info
      return terms.every((term) => combined.includes(term));
    });
  }

  /**
   * Helper to format current time for simulated refresh (e.g. 10:32 AM)
   */
  function getCurrentTimeString() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
  }

  /**
   * Screen Navigation Router
   */
  function navigateTo(screenId) {
    if (state.currentScreen !== screenId) {
      state.previousScreen = state.currentScreen;
      state.currentScreen = screenId;
    }

    const allScreens = [
      elements.screenHome,
      elements.screenResults,
      elements.screenDetails,
      elements.screenQueue
    ];

    allScreens.forEach((screen) => {
      if (screen.id === screenId) {
        screen.classList.add("active");
      } else {
        screen.classList.remove("active");
      }
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /**
   * Find a clinic by ID from sample dataset
   */
  function getClinicById(id) {
    return state.clinics.find((clinic) => clinic.id === id) || state.clinics[0];
  }

  /**
   * Create an Empty State element when no clinics match
   */
  function createEmptyStateHtml(query) {
    const safeQuery = escapeHtml(query);
    return `
      <div class="empty-state">
        <p class="empty-state-title">No clinics found matching "${safeQuery}"</p>
        <p class="empty-state-hint">
          Check spelling or try popular Jaipur localities:
        </p>
        <div class="empty-chips-row">
          <button type="button" class="locality-chip chip-suggestion" data-locality="Malviya Nagar">Malviya Nagar</button>
          <button type="button" class="locality-chip chip-suggestion" data-locality="Mansarovar">Mansarovar</button>
          <button type="button" class="locality-chip chip-suggestion" data-locality="Vaishali Nagar">Vaishali Nagar</button>
          <button type="button" class="locality-chip chip-suggestion" data-locality="Jagatpura">Jagatpura</button>
          <button type="button" class="locality-chip chip-suggestion" data-locality="C-Scheme">C-Scheme</button>
        </div>
        <button type="button" class="btn btn-primary btn-clear-search-action">
          Clear Search
        </button>
      </div>
    `;
  }

  /**
   * Render Home Screen Clinic List
   * - Shows default "Nearby Clinics" when input is empty
   * - Live-updates to show matching clinics when user types
   */
  function renderHomeClinics() {
    const query = elements.searchInput.value.trim();
    const hasQuery = query.length > 0;

    // Show/hide clear input button
    elements.btnInputClear.style.display = hasQuery ? "block" : "none";

    let clinicsToRender = [];

    if (!hasQuery) {
      elements.homeClinicsHeading.textContent = "Nearby Clinics";
      elements.homeClinicsCount.style.display = "none";
      // Show default top 4 popular Jaipur clinics on Home
      clinicsToRender = state.clinics.slice(0, 4);
    } else {
      clinicsToRender = filterClinics(query);
      elements.homeClinicsHeading.textContent = "Matching Clinics";
      elements.homeClinicsCount.textContent = `${clinicsToRender.length} found`;
      elements.homeClinicsCount.style.display = "inline";
    }

    elements.nearbyClinicsList.innerHTML = "";

    if (clinicsToRender.length === 0) {
      elements.nearbyClinicsList.innerHTML = createEmptyStateHtml(query);
      attachEmptyStateEvents(elements.nearbyClinicsList);
      return;
    }

    clinicsToRender.forEach((clinic) => {
      const card = document.createElement("div");
      card.className = "clinic-card clickable";
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", `Select ${clinic.name}`);

      card.innerHTML = `
        <div class="card-top-meta">
          <span class="locality-badge">${escapeHtml(clinic.locality || "Jaipur")}</span>
          <span class="demo-tag-subtle">Sample Data</span>
        </div>
        <div class="clinic-card-header">
          <h3 class="clinic-card-title">${escapeHtml(clinic.name)}</h3>
          <p class="clinic-card-address">${escapeHtml(clinic.address)}</p>
        </div>
        <div class="clinic-card-wait-section">
          <p class="wait-label">Estimated waiting time</p>
          <p class="wait-time-value">${escapeHtml(clinic.estimatedWaitTime)}</p>
        </div>
      `;

      card.addEventListener("click", () => {
        openClinicDetails(clinic.id, "screen-home");
      });

      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openClinicDetails(clinic.id, "screen-home");
        }
      });

      elements.nearbyClinicsList.appendChild(card);
    });
  }

  /**
   * Render Search Results on Screen 2 (Matches Figma Screenshot 1)
   */
  function renderSearchResultsScreen(results, query) {
    const count = results.length;
    elements.resultsCount.textContent = `${count} clinic${count === 1 ? "" : "s"} found`;
    elements.searchResultsList.innerHTML = "";

    if (count === 0) {
      elements.searchResultsList.innerHTML = createEmptyStateHtml(query);
      attachEmptyStateEvents(elements.searchResultsList);
      return;
    }

    results.forEach((clinic) => {
      const card = document.createElement("div");
      card.className = "clinic-card";

      card.innerHTML = `
        <div class="card-top-meta">
          <span class="locality-badge">${escapeHtml(clinic.locality || "Jaipur")}</span>
          <span class="demo-tag-subtle">Sample Data</span>
        </div>
        <div class="clinic-card-header">
          <h3 class="clinic-card-title">${escapeHtml(clinic.name)}</h3>
          <p class="clinic-card-address">${escapeHtml(clinic.address)}</p>
        </div>
        <div class="clinic-card-wait-section">
          <p class="wait-label">Estimated waiting time</p>
          <p class="wait-time-value">${escapeHtml(clinic.estimatedWaitTime)}</p>
        </div>
        <button type="button" class="btn btn-primary btn-view-details" data-id="${clinic.id}">
          View Details
        </button>
      `;

      const viewDetailsBtn = card.querySelector(".btn-view-details");
      viewDetailsBtn.addEventListener("click", () => {
        openClinicDetails(clinic.id, "screen-results");
      });

      elements.searchResultsList.appendChild(card);
    });
  }

  /**
   * Attach click events to empty-state clear buttons and chips
   */
  function attachEmptyStateEvents(container) {
    const clearBtn = container.querySelector(".btn-clear-search-action");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        clearSearch();
      });
    }

    const suggestionChips = container.querySelectorAll(".chip-suggestion");
    suggestionChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const locality = chip.getAttribute("data-locality");
        applyLocalityFilter(locality);
      });
    });
  }

  /**
   * Handle Search Button Submission
   * Navigates to Screen 2 (Search Results)
   */
  function executeSearch() {
    const query = elements.searchInput.value.trim();
    const results = filterClinics(query);
    renderSearchResultsScreen(results, query);
    navigateTo("screen-results");
  }

  /**
   * Reset Search and Navigate to Home Screen
   * @param {boolean} shouldFocusSearch - Whether to focus the search box (useful when clearing search)
   */
  function navigateToHome(shouldFocusSearch = false) {
    elements.searchInput.value = "";
    elements.btnInputClear.style.display = "none";
    renderHomeClinics();
    navigateTo("screen-home");
    if (shouldFocusSearch && elements.searchInput) {
      elements.searchInput.focus();
    }
  }

  /**
   * Clear Search query, restore Home clinic directory, and focus search box
   */
  function clearSearch() {
    navigateToHome(true);
  }

  /**
   * Apply locality chip filter
   */
  function applyLocalityFilter(locality) {
    elements.searchInput.value = locality;
    elements.btnInputClear.style.display = "block";
    renderHomeClinics();
    executeSearch();
  }

  /**
   * Populate and Open Clinic Details Screen (Matches Figma Screenshot 2)
   */
  function openClinicDetails(clinicId, originScreen = "screen-results") {
    const clinic = getClinicById(clinicId);
    if (!clinic) return;

    state.selectedClinicId = clinicId;
    state.previousScreen = originScreen;

    elements.detailsClinicName.textContent = clinic.name;
    elements.detailsClinicAddress.textContent = clinic.address;
    elements.detailsTimings.textContent = clinic.timings;
    elements.detailsDoctors.textContent = clinic.doctorAvailability;
    elements.detailsWaitTime.textContent = clinic.estimatedWaitTime;
    elements.detailsPatientsCount.textContent = clinic.patientsAhead;
    elements.detailsLastUpdated.textContent = `Last updated: ${clinic.lastUpdated}`;
    elements.detailsArrivalInstructions.textContent = clinic.arrivalInstructions;

    navigateTo("screen-details");
  }

  /**
   * Populate and Open Queue Status Screen (Matches Figma Screenshot 3)
   */
  function openQueueStatus() {
    if (!state.selectedClinicId) return;
    const clinic = getClinicById(state.selectedClinicId);
    if (!clinic) return;

    elements.queueClinicName.textContent = clinic.name;
    elements.queueClinicAddress.textContent = clinic.address;
    elements.queueWaitTime.textContent = clinic.estimatedWaitTime;
    elements.queuePatientsCount.textContent = clinic.patientsAhead;
    elements.queueLastUpdated.textContent = `Last updated: ${clinic.lastUpdated}`;
    elements.queueCheckInInstructions.textContent = clinic.checkInInstructions;

    navigateTo("screen-queue");
  }

  /**
   * Simulate Estimate Refresh
   */
  function refreshEstimate(type) {
    const currentTime = getCurrentTimeString();
    if (type === "details") {
      elements.detailsLastUpdated.textContent = `Last updated: ${currentTime} (Simulated)`;
      elements.btnRefreshDetails.textContent = "✓ Updated";
      setTimeout(() => {
        elements.btnRefreshDetails.textContent = "Refresh";
      }, 1800);
    } else if (type === "queue") {
      elements.queueLastUpdated.textContent = `Last updated: ${currentTime} (Simulated)`;
      elements.btnRefreshQueue.textContent = "✓ Updated";
      setTimeout(() => {
        elements.btnRefreshQueue.textContent = "Refresh";
      }, 1800);
    }
  }

  /**
   * Escape HTML to prevent injection in text displays
   */
  function escapeHtml(text) {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };
    return String(text).replace(/[&<>"']/g, (m) => map[m]);
  }

  /**
   * Handle URL Parameters (Direct testing and deep linking)
   */
  function handleUrlParams() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const screen = urlParams.get("screen");
      const clinicId = urlParams.get("id") || "malviya-apex";
      const query = urlParams.get("q");

      if (query) {
        elements.searchInput.value = query;
      }

      if (screen === "results") {
        executeSearch();
      } else if (screen === "details") {
        openClinicDetails(clinicId, "screen-home");
      } else if (screen === "queue") {
        state.selectedClinicId = clinicId;
        openQueueStatus();
      } else {
        renderHomeClinics();
        navigateTo("screen-home");
      }
    } catch (e) {
      renderHomeClinics();
      navigateTo("screen-home");
    }
  }

  /**
   * Event Listeners Setup
   */
  function initEventListeners() {
    // Brand header logo -> click resets and returns to home
    elements.brandLogo.addEventListener("click", (e) => {
      e.preventDefault();
      navigateToHome(false);
    });

    // Real-time live search as the user types
    elements.searchInput.addEventListener("input", () => {
      renderHomeClinics();
    });

    // Clear input '✕' button
    elements.btnInputClear.addEventListener("click", () => {
      clearSearch();
    });

    // Search form submission (Enter key or Search button)
    elements.searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      executeSearch();
    });

    elements.btnSearch.addEventListener("click", (e) => {
      e.preventDefault();
      executeSearch();
    });

    // Locality quick filter chips on Home screen
    elements.localityChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const locality = chip.getAttribute("data-locality");
        applyLocalityFilter(locality);
      });
    });

    // Screen 2: Back button
    elements.btnResultsBack.addEventListener("click", () => {
      navigateTo("screen-home");
    });

    // Screen 3: Details buttons
    elements.btnCheckQueue.addEventListener("click", () => {
      openQueueStatus();
    });

    elements.btnDetailsBack.addEventListener("click", () => {
      navigateTo(state.previousScreen || "screen-results");
    });

    elements.btnRefreshDetails.addEventListener("click", () => {
      refreshEstimate("details");
    });

    // Screen 4: Queue buttons - Return to Home screen
    elements.btnQueueHome.addEventListener("click", () => {
      navigateToHome(false);
    });

    elements.btnRefreshQueue.addEventListener("click", () => {
      refreshEstimate("queue");
    });
  }

  /**
   * App Initialization
   */
  function init() {
    renderHomeClinics();
    initEventListeners();
    handleUrlParams();
  }

  // Run on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
