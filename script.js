// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBwi9qr6AB7gva6RKCRHkuMlIG7fK_skgw",
    authDomain: "page-f987b.firebaseapp.com",
    projectId: "page-f987b",
    storageBucket: "page-f987b.firebasestorage.app",
    messagingSenderId: "35855630111",
    appId: "1:35855630111:web:baef629e6febeaf314fa2a"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to fetch and display links from Firestore
function addTestLinks() {
    const linksContainer = document.getElementById("linksContainer");
    
    db.collection("links").get()
        .then((querySnapshot) => {
            linksContainer.innerHTML = ""; // Clear container
            querySnapshot.forEach((doc) => {
                const linkData = doc.data();
                const linkElement = document.createElement("div");
                linkElement.classList.add("link-item");

                linkElement.innerHTML = `
                    <p>${linkData.name}</p>
                    <button onclick="openLink('${linkData.url}')">Open in new tab</button>
                    <button onclick="downvoteLink('${doc.id}')">Downvote</button>
                    <span id="votes-${doc.id}">Votes: ${linkData.votes || 0}</span>
                `;
                linksContainer.appendChild(linkElement);
            });
        })
        .catch((error) => {
            console.error("Error fetching links:", error);
        });
}

// Open link with confirmation
function openLink(url) {
    const confirmRedirect = confirm("Is this link working? Click OK to proceed.");
    if (confirmRedirect) {
        window.open(url, "_blank");
    }
}

// Handle downvotes
function downvoteLink(docId) {
    const docRef = db.collection("links").doc(docId);
    
    docRef.get().then((doc) => {
        if (doc.exists) {
            const currentVotes = doc.data().votes || 0;
            const newVotes = currentVotes - 1;

            docRef.update({ votes: newVotes }).then(() => {
                document.getElementById(`votes-${docId}`).textContent = `Votes: ${newVotes}`;
                
                // Auto-delete if downvotes reach -10
                if (newVotes <= -10) {
                    docRef.delete().then(() => {
                        console.log("Link deleted due to excessive downvotes.");
                        addTestLinks(); // Refresh list
                    });
                }
            });
        }
    }).catch((error) => {
        console.error("Error downvoting link:", error);
    });
}

// Load links when the page is ready
window.onload = () => {
    addTestLinks();
};
