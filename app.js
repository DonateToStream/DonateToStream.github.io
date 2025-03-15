const auth = firebase.auth();

function signup() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            auth.currentUser.sendEmailVerification();
            alert("Signup successful! Check your email for verification.");
        })
        .catch(error => alert(error.message));
}

function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => window.location.href = "home.html")
        .catch(error => alert(error.message));
}

function logout() {
    auth.signOut().then(() => window.location.href = "index.html");
}

function resetPassword() {
    let email = document.getElementById("email").value;
    auth.sendPasswordResetEmail(email)
        .then(() => alert("Password reset email sent."))
        .catch(error => alert(error.message));
}


function enable2FA() {
    alert("Firebase 2FA (via SMS or app) must be set up in Firebase Console.");
}

function disable2FA() {
    alert("Disabling 2FA needs backend logic with Firebase Admin SDK.");
}

function changePassword() {
    let user = auth.currentUser;
    auth.sendPasswordResetEmail(user.email)
        .then(() => alert("Password reset email sent."))
        .catch(error => alert(error.message));
}
