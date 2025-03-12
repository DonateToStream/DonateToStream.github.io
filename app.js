// Import necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVx-V7DHGnWxwp5iqwrhPqBLnjf-frnT4",
  authDomain: "sigmasigma-57fca.firebaseapp.com",
  databaseURL: "https://sigmasigma-57fca-default-rtdb.firebaseio.com",
  projectId: "sigmasigma-57fca",
  storageBucket: "sigmasigma-57fca.firebasestorage.app",
  messagingSenderId: "1071388845488",
  appId: "1:1071388845488:web:29b0b30532dd070a03e275",
  measurementId: "G-JZJJ42L6KS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firebase Authentication instance
const auth = getAuth(app);

// Sign-Up function
function signUp() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Successfully signed up
      console.log("User signed up:", userCredential.user);
      // Show the game URL and hide the sign-up form
      document.getElementById('sign-up-form').style.display = "none";
      document.getElementById('game-url').style.display = "block";
    })
    .catch((error) => {
      // Handle errors
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error during sign-up:", errorCode, errorMessage);
      document.getElementById('error-message').innerText = `Error: ${errorMessage}`;
    });
}

// Handle Play Button Click
document.getElementById('play-btn').addEventListener('click', function() {
  // Simulate showing an ad for 3 seconds
  setTimeout(function() {
    // After ad, show the game URL
    document.getElementById('click-to-play').style.display = "none";
    document.getElementById('game-url').style.display = "block";
  }, 3000); // 3 seconds for ad
});
