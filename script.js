// Firebase Config (Replace with your details)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Load links from Firebase
async function loadLinks(category, elementId) {
    const listDiv = document.getElementById(elementId);
    const querySnapshot = await db.collection(category).get();

    listDiv.innerHTML = ""; // Clear previous content
    querySnapshot.forEach(doc => {
        const data = doc.data();
        const linkId = doc.id;

        const div = document.createElement("div");
        div.innerHTML = `
            <p>${data.name}</p>
            <button onclick="openLink('${category}', '${linkId}', '${data.url}')">Open in New Tab</button>
            <button onclick="vote('${category}', '${linkId}', 'up')">👍 ${data.upvotes}</button>
            <button onclick="vote('${category}', '${linkId}', 'down')">👎 ${data.downvotes}</button>
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
window.onload = () => {
    loadLinks("games", "games-list");
    loadLinks("proxys", "proxys-list");
};
