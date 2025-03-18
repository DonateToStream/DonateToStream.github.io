// 🔥 Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyBxm9scK9bWxue782r8w2xNR_thS1y9-q4",
    authDomain: "dhjrjtdzjg.firebaseapp.com",
    databaseURL: "https://dhjrjtdzjg-default-rtdb.firebaseio.com",
    projectId: "dhjrjtdzjg",
    storageBucket: "dhjrjtdzjg.firebasestorage.app",
    messagingSenderId: "548960975194",
    appId: "1:548960975194:web:fc9596a8cae353883d9b63"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

document.addEventListener("DOMContentLoaded", () => {
    initializeDatabase();
    loadLinks();
});

function showPage(page) {
    document.querySelectorAll(".page").forEach(p => p.style.display = "none");
    document.getElementById(page).style.display = "block";
}

// 🚀 Auto-create sample data if Firebase is empty
function initializeDatabase() {
    const sampleData = {
        "proxy-links": {
            "example-proxy-1": {
                "name": "Example Proxy 1",
                "url": "https://example.com",
                "upvotes": 0,
                "downvotes": 0
            },
            "example-proxy-2": {
                "name": "Example Proxy 2",
                "url": "https://proxy.com",
                "upvotes": 0,
                "downvotes": 0
            }
        },
        "game-links": {
            "example-game-1": {
                "name": "Example Game 1",
                "url": "https://game.com",
                "upvotes": 0,
                "downvotes": 0
            },
            "example-game-2": {
                "name": "Example Game 2",
                "url": "https://anothergame.com",
                "upvotes": 0,
                "downvotes": 0
            }
        }
    };

    Object.keys(sampleData).forEach(category => {
        db.ref(category).once("value", snapshot => {
            if (!snapshot.exists()) {
                db.ref(category).set(sampleData[category]);
            }
        });
    });
}

// 🔄 Load links dynamically from Firebase
function loadLinks() {
    ["proxy", "game"].forEach(category => {
        db.ref(category + "-links").on("value", snapshot => {
            const linksDiv = document.getElementById(category + "-links");
            linksDiv.innerHTML = "";
            snapshot.forEach(child => {
                const data = child.val();
                if (data.downvotes >= 10) return;
                const btn = document.createElement("button");
                btn.innerText = data.name;
                btn.onclick = () => showVotePopup(child.key, data.url, category);
                linksDiv.appendChild(btn);
            });
        });
    });
}

// 🗳️ Voting system
function showVotePopup(key, url, category) {
    const popup = document.getElementById("vote-popup");
    popup.style.display = "block";

    document.getElementById("vote-yes").onclick = () => {
        voteLink(key, category, "upvotes");
        popup.style.display = "none";
    };

    document.getElementById("vote-no").onclick = () => {
        voteLink(key, category, "downvotes");
        popup.style.display = "none";
    };

    setTimeout(() => window.open(url, "_blank"), 500);
}

// ✅ Handle upvotes and downvotes
function voteLink(key, category, type) {
    const ref = db.ref(category + "-links/" + key);
    ref.once("value").then(snapshot => {
        let data = snapshot.val();
        data[type] = (data[type] || 0) + 1;
        if (data.downvotes >= 10) {
            ref.remove();
        } else {
            ref.set(data);
        }
        loadLinks();
    });
}
