// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getDatabase, ref, get } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';

// Your Firebase configuration (Replace with your actual config)
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

// Initialize Realtime Database
const db = getDatabase(app);

// Reference to the 'links' data in Firebase
const linksRef = ref(db, 'links');

// Fetch links from Firebase Realtime Database
get(linksRef).then((snapshot) => {
    if (snapshot.exists()) {
        const links = snapshot.val();
        const container = document.getElementById("linksContainer");

        // Loop through each link and display it
        for (const [key, link] of Object.entries(links)) {
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.textContent = link.name;
            linkElement.target = "_blank";
            container.appendChild(linkElement);
            container.appendChild(document.createElement('br')); // Add a line break
        }
    } else {
        console.log("No links found in the database.");
    }
}).catch((error) => {
    console.error("Error fetching data from Firebase:", error);
});

// This function is used to add test preset links to Firebase
function addTestLinks() {
  const links = [
    { name: 'Google', url: 'https://www.google.com' },
    { name: 'Facebook', url: 'https://www.facebook.com' },
    { name: 'Twitter', url: 'https://www.twitter.com' }
  ];

  const linksRef = firebase.database().ref('links');

  // Add links to Firebase (only once for testing)
  links.forEach(link => {
    const newLinkRef = linksRef.push();
    newLinkRef.set(link);
  });
}

// Uncomment the following line to add test links only once (for testing purposes)
// addTestLinks()
// Uncomment below to run once and populate test buttons
// addTestButtons();
