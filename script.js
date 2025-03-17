import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getDatabase, ref, set, get, child, update } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBwi9qr6AB7gva6RKCRHkuMlIG7fK_skgw",
  authDomain: "page-f987b.firebaseapp.com",
  databaseURL: "https://page-f987b-default-rtdb.firebaseio.com",
  projectId: "page-f987b",
  storageBucket: "page-f987b.firebasestorage.app",
  messagingSenderId: "35855630111",
  appId: "1:35855630111:web:baef629e6febeaf314fa2a",
  measurementId: "G-JFHTRJ749R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Add functions for data manipulation as needed


// Reference to the buttons in Realtime Database
const buttonsRef = ref(db, "presetButtons");

// Function to load buttons from Firebase
function loadPresetButtons() {
  onValue(buttonsRef, (snapshot) => {
    const buttonsContainer = document.getElementById("buttonsContainer");
    buttonsContainer.innerHTML = ""; // Clear previous buttons

    if (snapshot.exists()) {
      const buttons = snapshot.val();
      Object.keys(buttons).forEach((key) => {
        const buttonData = buttons[key];
        const button = document.createElement("button");
        button.textContent = buttonData.label;
        button.onclick = () => alert(`Button clicked: ${buttonData.action}`);
        buttonsContainer.appendChild(button);
      });
    } else {
      buttonsContainer.innerHTML = "<p>No preset buttons found.</p>";
    }
  });
}

// Function to add a new preset button
function addPresetButton(label, action) {
  const newButtonRef = push(buttonsRef);
  set(newButtonRef, {
    label: label,
    action: action
  }).then(() => console.log("Button added successfully!"));
}

// Load buttons on page load
window.onload = () => {
  loadPresetButtons();
};

// Example: Add test preset buttons (only needed for first-time setup)
function addTestButtons() {
  addPresetButton("Google", "https://google.com");
  addPresetButton("YouTube", "https://youtube.com");
  addPresetButton("GitHub", "https://github.com");
}

// Uncomment below to run once and populate test buttons
// addTestButtons();
