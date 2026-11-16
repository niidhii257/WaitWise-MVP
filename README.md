# WaitWise MVP - Patient Clinic Waiting-Time Web App

WaitWise is a beginner-level, patient-focused web application designed to help patients find nearby neighborhood clinics in Jaipur, check estimated waiting times, and review clear arrival guidelines before visiting.

---

## 🌟 Implemented Must-Have Features

1. **Clinic Search & Selection (Real-Time)**:
   * Real-time search as you type for clinic names or Jaipur localities (e.g., *"Malviya Nagar"*, *"Mansarovar"*, *"Vaishali Nagar"*, *"Jagatpura"*, *"C-Scheme"*, *"Raja Park"*, *"Tonk Road"*, *"Bani Park"*).
   * Case-insensitive, ignores extra spaces, and supports partial keywords (e.g. typing `"malv"` or `"cscheme"`).
   * One-tap quick locality filter chips for instant filtering.
   * Selecting any clinic opens its complete details and queue information.
2. **Estimated Waiting Time**:
   * Prominently displays the current expected wait time (e.g., `15 min`, `20 min`, `25 min`, `35 min`).
3. **Last-Updated Timestamp**:
   * Transparently displays when the estimate was last updated (e.g., `Last updated: 10:30 AM`), with an interactive simulation refresh button.
4. **Clinic Details & Arrival Instructions**:
   * Complete physical address, operating hours, doctor availability, and clear step-by-step patient arrival and check-in instructions.

> **Demonstration Notice**: All clinic records, doctor availability, and queue numbers are clearly labelled sample demonstration data for MVP evaluation and testing. They do not represent live clinic systems.

---

## 📱 Wireframe Fidelity

The app strictly matches the 4 screens from the Figma prototype wireframes:
* **Screen 1: Find a Clinic (Home)** (`prototype_screenshots/Screenshot 2026-11-16 at 3.19.48 PM.png`)
* **Screen 2: Search Results** (`prototype_screenshots/Screenshot 2026-11-16 at 3.17.35 PM.png`)
* **Screen 3: Clinic Details** (`prototype_screenshots/Screenshot 2026-11-16 at 3.18.28 PM.png`)
* **Screen 4: Queue Status** (`prototype_screenshots/Screenshot 2026-11-16 at 3.19.09 PM.png`)

---

## 🚀 How to Run and Test Locally

### Method 1: Instant Browser Opening (Simplest)
1. In your Mac **Finder**, open the `waitwise_MVP` folder.
2. Double-click the `index.html` file.
3. It opens immediately in Google Chrome, Apple Safari, or Microsoft Edge.

### Method 2: Local Python Server (Recommended)
1. Open your Mac **Terminal**.
2. Navigate to this folder:
   ```bash
   cd /Users/nidhi/Documents/waitwise_MVP
   ```
3. Start a local server:
   ```bash
   python3 -m http.server 8000
   ```
4. Open your browser and go to:
   [http://localhost:8000](http://localhost:8000)

---

## 🧪 Testing the New Search Features

1. **Test Real-Time Live Search (Screen 1)**:
   * Start typing `malv` in the search box. Notice how the clinic list immediately filters to show **Apex Family Health Clinic (Malviya Nagar)** without even clicking Search!
   * Clear the box using the `✕` icon; notice how default nearby clinics return instantly.
2. **Test Locality Quick Chips**:
   * Click on the **Mansarovar** pill under the search bar. It automatically searches and displays **Mansarovar Community Medical Centre** with a 35-minute wait time.
3. **Test Search Results Page (Screen 2)**:
   * Type `Vaishali` and click the **Search** button. You will see the Search Results page displaying "1 clinic found" with its **View Details** button.
4. **Test Partial Matching & Spacing Tolerance**:
   * Try searching `  c-scheme  ` or `cscheme`. Both successfully match **C-Scheme Central Care Clinic**.
5. **Test Friendly Empty State & Clear Search**:
   * Type `xyzhospital` in the search box.
   * You will see a friendly message: *"No clinics found matching 'xyzhospital'"* with suggestions and a **Clear Search** button.
   * Click **Clear Search** to restore all clinics.
6. **Test Clinic Details & Queue Status (Screens 3 & 4)**:
   * Click **View Details** on any clinic. Verify its address, timings, doctor count, and arrival instructions.
   * Click **Check Queue Status** to view the waiting time, patients ahead, and simulated refresh button.

---

## 📁 File Structure

```
waitwise_MVP/
├── index.html                   # HTML structure for the 4 wireframe screens
├── css/
│   └── styles.css               # Clean, modern, responsive CSS matching Figma
├── js/
│   ├── data.js                  # 11 sample clinics across Jaipur localities (demo data)
│   └── app.js                   # Real-time search, navigation router, and UI logic
├── prototype_screenshots/       # Your 4 original wireframe reference images (preserved)
├── waitwise_product_breif.pages # Your original Product Brief (preserved)
└── README.md                    # Project documentation
```
