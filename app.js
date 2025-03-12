// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBVx-V7DHGnWxwp5iqwrhPqBLnjf-frnT4",
    authDomain: "sigmasigma-57fca.firebaseapp.com",
    projectId: "sigmasigma-57fca",
    storageBucket: "sigmasigma-57fca.firebasestorage.app",
    messagingSenderId: "1071388845488",
    appId: "1:1071388845488:web:bc50d819aeb446ef03e275"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Authentication functions
function signUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            window.location.reload(); // Reload to show the game section
        })
        .catch((error) => {
            document.getElementById('error-message').innerText = error.message;
        });
}

function logIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.reload(); // Reload to show the game section
        })
        .catch((error) => {
            document.getElementById('error-message').innerText = error.message;
        });
}

// Show the game after ad
function showAd() {
    // Show an ad (Google AdSense or custom ad logic)
    (adsbygoogle = window.adsbygoogle || []).push({});
    
    // After ad is displayed, show the game
    setTimeout(() => {
        document.getElementById('game-section').style.display = 'none';
        document.getElementById('game-container').style.display = 'block';
    }, 3000); // Adjust delay if necessary
}

// Handle user authentication state
auth.onAuthStateChanged((user) => {
    if (user) {
        document.getElementById('auth-form').style.display = 'none';
        document.getElementById('game-section').style.display = 'block';
    } else {
        document.getElementById('auth-form').style.display = 'block';
        document.getElementById('game-section').style.display = 'none';
    }
});
