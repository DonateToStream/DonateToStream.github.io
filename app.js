// Google AdSense
const adContainer = document.getElementById('adContainer');
adContainer.innerHTML = '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-7099868100329345" data-ad-slot="YOUR_AD_SLOT_ID"></ins>';
(adsbygoogle = window.adsbygoogle || []).push({});

document.getElementById('showAdButton').addEventListener('click', () => {
    // Show ad and get link after user watches the ad
    adContainer.style.display = 'block';
    
    // Assuming the ad takes 30 seconds to watch
    setTimeout(() => {
        adContainer.style.display = 'none';
        displayLink();
    }, 30000);
});

function displayLink() {
    // Fetch the link from Firebase
    const dbRef = ref(database, 'links/someLinkId');
    get(dbRef).then((snapshot) => {
        if (snapshot.exists()) {
            const link = snapshot.val();
            document.getElementById('linkContainer').innerHTML = `<a href="${link}" target="_blank">Your Link</a>`;
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error("Error getting link:", error);
    });
}
