// Firebase Config (Replace with your details)
const firebaseConfig = {
  apiKey: "AIzaSyBxm9scK9bWxue782r8w2xNR_thS1y9-q4",
  authDomain: "dhjrjtdzjg.firebaseapp.com",
  databaseURL: "https://dhjrjtdzjg-default-rtdb.firebaseio.com",
  projectId: "dhjrjtdzjg",
  storageBucket: "dhjrjtdzjg.firebasestorage.app",
  messagingSenderId: "548960975194",
  appId: "1:548960975194:web:fc9596a8cae353883d9b63",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Function to add test links (only runs once)
async function addTestLinks() {
    const gamesRef = db.collection("games").doc("example-game");
    const proxysRef = db.collection("proxys").doc("example-proxy");

    if (!(await gamesRef.get()).exists) {
        await gamesRef.set({
            url: "https://examplegame.com",
            upvotes: 0,
            downvotes: 0
        });
    }

    if (!(await proxysRef.get()).exists) {
        await proxysRef.set({
            url: "https://exampleproxy.com",
            upvotes: 0,
            downvotes: 0
        });
    }
}

// Load links from Firebase
async function loadLinks(category, elementId) {
    const listDiv = document.getElementById(elementId);
    const querySnapshot = await db.collection(category).get();

    listDiv.innerHTML = ""; // Clear previous content
    querySnapshot.forEach(doc => {
        const data = doc.data();
        const linkName = doc.id; // Using document ID as name

        const div = document.createElement("div");
        div.innerHTML = `
            <p>${linkName}</p>
            <button onclick="openLink('${category}', '${linkName}', '${data.url}')">Open in New Tab</button>
            <button onclick="vote('${category}', '${linkName}', 'up')">👍 ${data.upvotes}</button>
            <button onclick="vote('${category}', '${linkName}', 'down')">👎 ${data.downvotes}</button>
        `;
        listDiv.appendChild(div);
    });
}

// Handle opening links with a prompt
function openLink(category, id, url) {
    alert("Before you go, open the site in a new tab and come back to vote if it's up or blocked.");
    window.open(url, "_blank");
}

// Handle voting
async function vote(category, id, type) {
    const docRef = db.collection(category).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) return;
    let data = doc.data();

    if (type === "up") {
        data.upvotes = (data.upvotes || 0) + 1;
    } else {
        data.downvotes = (data.downvotes || 0) + 1;
    }

    // If downvotes reach 10, delete the link
    if (data.downvotes >= 10) {
        await docRef.delete();
        alert("This link has been removed due to too many downvotes.");
    } else {
        await docRef.update({
            upvotes: data.upvotes,
            downvotes: data.downvotes
        });
    }

    loadLinks("games", "games-list");
    loadLinks("proxys", "proxys-list");
}

// Load links when the page loads
window.onload = async () => {
    await addTestLinks(); // Create test links if they don't exist
    loadLinks("games", "games-list");
    loadLinks("proxys", "proxys-list");
};
