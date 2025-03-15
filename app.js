// Firebase Authentication
const auth = firebase.auth();

// Signup Function
function signup() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            userCredential.user.sendEmailVerification();
            alert("Signup successful! Check your email for verification.");
        })
        .catch(error => alert(error.message));
}

// Login Function
function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => window.location.href = "home.html")
        .catch(error => alert(error.message));
}

// Logout Function
function logout() {
    auth.signOut().then(() => window.location.href = "index.html");
}

// Reset Password
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

// Change Password (Requires Reauthentication)
function changePassword() {
    let newPassword = document.getElementById("new-password").value;
    let user = auth.currentUser;

    if (user) {
        user.updatePassword(newPassword)
            .then(() => alert("Password updated successfully!"))
            .catch(error => alert(error.message));
    } else {
        alert("You must be logged in to change your password.");
    }
}
