// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBVx-V7DHGnWxwp5iqwrhPqBLnjf-frnT4",
    authDomain: "sigmasigma-57fca.firebaseapp.com",
    projectId: "sigmasigma-57fca",
    storageBucket: "sigmasigma-57fca.firebasestorage.app",
    messagingSenderId: "1071388845488",
    appId: "1:1071388845488:web:29b0b30532dd070a03e275",
    measurementId: "G-JZJJ42L6KS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM Elements
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signupBtn = document.getElementById("signup-btn");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const authContainer = document.getElementById("auth-container");
const gameContainer = document.getElementById("game-container");
const playBtn = document.getElementById("play-btn");
const adContainer = document.getElementById("ad-container");
const gameContent = document.getElementById("game-content");

// Signup function
signupBtn.addEventListener("click", () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    createUserWithEmailAndPassword(auth, email, password)
        .then(() => alert("Signup successful!"))
        .catch(error => alert(error.message));
});

// Login function
loginBtn.addEventListener("click", () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    signInWithEmailAndPassword(auth, email, password)
        .then(() => alert("Login successful!"))
        .catch(error => alert(error.message));
});

// Logout function
logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => location.reload());
});

// Check auth state
onAuthStateChanged(auth, (user) => {
    if (user) {
        authContainer.style.display = "none";
        gameContainer.style.display = "block";
        logoutBtn.style.display = "block";
    } else {
        authContainer.style.display = "block";
        gameContainer.style.display = "none";
        logoutBtn.style.display = "none";
    }
});

// Show ad before playing
playBtn.addEventListener("click", () => {
    adContainer.style.display = "block";
    setTimeout(() => {
        adContainer.style.display = "none";
        gameContent.style.display = "block";
    }, 5000);
});
