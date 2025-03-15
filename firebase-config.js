// Load Firebase Configuration in "compat" mode
const firebaseConfig = {
    apiKey: "AIzaSyBxm9scK9bWxue782r8w2xNR_thS1y9-q4",
    authDomain: "dhjrjtdzjg.firebaseapp.com",
    databaseURL: "https://dhjrjtdzjg-default-rtdb.firebaseio.com",
    projectId: "dhjrjtdzjg",
    storageBucket: "dhjrjtdzjg.appspot.com",
    messagingSenderId: "548960975194",
    appId: "1:548960975194:web:fc9596a8cae353883d9b63",
    measurementId: "G-BPJJSQV4Z6"
};

// Initialize Firebase (using compat mode)
firebase.initializeApp(firebaseConfig);

// Reference to database
const db = firebase.database();

// Ensure at least one link exists in Firebase
function createDefaultLink() {
    db.ref("links").once("value").then(snapshot => {
        if (!snapshot.exists()) {
            db.ref("links/link1").set({
                url: "https://example.com", // Change this to a real site
                votes: { yes: 0, no: 0 }
            });
        }
    });
}

// Call this function when the page loads
createDefaultLink();
