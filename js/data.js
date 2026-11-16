/**
 * WaitWise MVP - Sample Clinic Directory
 * 
 * IMPORTANT DEMONSTRATION NOTICE:
 * All clinic entries, addresses, doctor availability, queue positions, and waiting times 
 * in this file are SAMPLE DEMONSTRATION DATA created solely for testing and evaluating 
 * the WaitWise MVP interface. They DO NOT represent real healthcare facilities, 
 * live clinic operations, or real-time patient queues.
 */

const sampleClinics = [
  {
    id: "malviya-apex",
    name: "Apex Family Health Clinic",
    locality: "Malviya Nagar",
    address: "Plot 14, Calgiri Marg, Near Apex Circle, Malviya Nagar, Jaipur",
    timings: "Mon–Sat, 8:30 AM–1:30 PM, 5:00 PM–8:30 PM",
    doctorAvailability: "2 general physicians available today",
    estimatedWaitTime: "20 min",
    patientsAhead: 5,
    lastUpdated: "10:30 AM",
    arrivalInstructions: "Enter via main Calgiri Marg gate. Collect a paper token at reception counter 1 and present government photo ID.",
    checkInInstructions: "Show your token at reception counter 1. Take a seat in the ground-floor waiting area until your token number is displayed.",
    isDemo: true
  },
  {
    id: "mansarovar-care",
    name: "Mansarovar Community Medical Centre",
    locality: "Mansarovar",
    address: "82/15, Madhyam Marg, Near Swarn Path, Mansarovar, Jaipur",
    timings: "Mon–Sun, 8:00 AM–2:00 PM, 4:30 PM–9:00 PM",
    doctorAvailability: "3 general practitioners on duty",
    estimatedWaitTime: "35 min",
    patientsAhead: 8,
    lastUpdated: "10:25 AM",
    arrivalInstructions: "Reception is on the ground floor. Check in with the duty staff and mention your consultation type.",
    checkInInstructions: "Check in at desk A with your photo ID. Staff will call your name when the consultation room is ready.",
    isDemo: true
  },
  {
    id: "vaishali-medicare",
    name: "Vaishali Medicare & Primary Clinic",
    locality: "Vaishali Nagar",
    address: "B-19, Amrapali Marg, Near Nursery Circle, Vaishali Nagar, Jaipur",
    timings: "Mon–Sat, 9:00 AM–1:30 PM, 5:30 PM–8:30 PM",
    doctorAvailability: "2 family physicians available today",
    estimatedWaitTime: "15 min",
    patientsAhead: 3,
    lastUpdated: "10:35 AM",
    arrivalInstructions: "Walk through the primary care entrance. Confirm your arrival at desk 2. Face masks are recommended.",
    checkInInstructions: "Register at desk 2. You will be directed to waiting lounge B on the left.",
    isDemo: true
  },
  {
    id: "jagatpura-health",
    name: "Jagatpura Primary Health Care",
    locality: "Jagatpura",
    address: "Plot 45, Mahal Road, Opposite Akshay Patra, Jagatpura, Jaipur",
    timings: "Mon–Sat, 8:00 AM–1:00 PM, 4:00 PM–8:00 PM",
    doctorAvailability: "1 physician and 1 duty pediatrician",
    estimatedWaitTime: "25 min",
    patientsAhead: 6,
    lastUpdated: "10:20 AM",
    arrivalInstructions: "Report to the front admission desk on the ground floor. Bring past prescription records if available.",
    checkInInstructions: "Hand your ID to the front receptionist. Seating is available in the central air-conditioned waiting hall.",
    isDemo: true
  },
  {
    id: "cscheme-central",
    name: "C-Scheme Central Care Clinic",
    locality: "C-Scheme",
    address: "12 Subhash Marg, Near Statue Circle, C-Scheme, Jaipur",
    timings: "Mon–Sat, 9:00 AM–7:00 PM",
    doctorAvailability: "2 senior consultants available today",
    estimatedWaitTime: "30 min",
    patientsAhead: 7,
    lastUpdated: "10:15 AM",
    arrivalInstructions: "Check in at reception counter A inside the main foyer. Valet and street parking are accessible from Subhash Marg.",
    checkInInstructions: "Provide your name and contact phone number at counter A. The front desk will notify you via the lounge display.",
    isDemo: true
  },
  {
    id: "raja-park-family",
    name: "Raja Park Neighbourhood Clinic",
    locality: "Raja Park",
    address: "Street 4, Near LBS College, Raja Park, Jaipur",
    timings: "Mon–Sat, 8:30 AM–12:30 PM, 5:00 PM–8:30 PM",
    doctorAvailability: "1 general physician on morning duty",
    estimatedWaitTime: "10 min",
    patientsAhead: 2,
    lastUpdated: "10:40 AM",
    arrivalInstructions: "Entry is from Street 4. Check in at the single-window reception desk near the pharmacy counter.",
    checkInInstructions: "Give your name at the single-window desk. You can wait in the front courtyard seating area.",
    isDemo: true
  },
  {
    id: "bani-park-wellness",
    name: "Bani Park Wellness & Family Practice",
    locality: "Bani Park",
    address: "D-38, Madho Singh Road, Near Collectorate Circle, Bani Park, Jaipur",
    timings: "Mon–Sat, 9:00 AM–2:00 PM, 5:00 PM–8:00 PM",
    doctorAvailability: "2 general practitioners on duty",
    estimatedWaitTime: "40 min",
    patientsAhead: 9,
    lastUpdated: "10:10 AM",
    arrivalInstructions: "Please sanitize hands at the entrance and report to the triage nurse at reception.",
    checkInInstructions: "Register with the triage nurse. Take a physical queue card and proceed to room 3 corridor.",
    isDemo: true
  },
  {
    id: "tonk-road-city",
    name: "Tonk Road City Clinic",
    locality: "Tonk Road",
    address: "Near Gopalpura Flyover, Tonk Road, Jaipur",
    timings: "Mon–Sun, 8:00 AM–8:00 PM",
    doctorAvailability: "3 family practitioners available",
    estimatedWaitTime: "20 min",
    patientsAhead: 4,
    lastUpdated: "10:32 AM",
    arrivalInstructions: "Enter through the pedestrian ramp. Register at counter 1 with a valid identification document.",
    checkInInstructions: "Sign in at counter 1. You will be assigned a token. Seating is on the first floor lobby.",
    isDemo: true
  },
  {
    id: "gopalpura-care",
    name: "Gopalpura Care & Diagnostic Clinic",
    locality: "Gopalpura",
    address: "Plot 22, Gopalpura Bypass Road, Near Triveni Nagar, Jaipur",
    timings: "Mon–Sat, 8:30 AM–1:00 PM, 5:00 PM–8:30 PM",
    doctorAvailability: "2 general practitioners available",
    estimatedWaitTime: "15 min",
    patientsAhead: 3,
    lastUpdated: "10:28 AM",
    arrivalInstructions: "Walk through the main foyer. Present your phone number at the digital reception kiosk.",
    checkInInstructions: "Collect your digital receipt from the kiosk and take a seat in section A.",
    isDemo: true
  },
  {
    id: "riverside",
    name: "Riverside Clinic",
    locality: "Central",
    address: "24 River Road, Central, Jaipur",
    timings: "Mon–Sat, 8:00 AM–6:00 PM",
    doctorAvailability: "2 general practitioners available today",
    estimatedWaitTime: "25 min",
    patientsAhead: 6,
    lastUpdated: "10:30 AM",
    arrivalInstructions: "Enter through the main entrance and check in at reception. Bring your ID and any relevant medical documents.",
    checkInInstructions: "Go to reception when you arrive. Give your name and show your ID to join the queue, then wait in the seating area until you are called.",
    isDemo: true
  },
  {
    id: "oak-street",
    name: "Oak Street Medical",
    locality: "Westside",
    address: "8 Oak Street, Westside, Jaipur",
    timings: "Mon–Fri, 8:30 AM–5:30 PM; Sat, 9:00 AM–1:00 PM",
    doctorAvailability: "1 general practitioner available today",
    estimatedWaitTime: "40 min",
    patientsAhead: 9,
    lastUpdated: "10:25 AM",
    arrivalInstructions: "Check in at the reception desk on the ground floor. Have your health insurance or ID card ready.",
    checkInInstructions: "Present your ID at the front counter. You will receive a queue token number. Please take a seat in the waiting lounge.",
    isDemo: true
  }
];

// Export for module or browser window usage
if (typeof window !== "undefined") {
  window.sampleClinics = sampleClinics;
}
