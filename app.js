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

// Change Email Function
function changeEmail() {
    let newEmail = document.getElementById("new-email").value;
    let user = firebase.auth().currentUser;

    if (user) {
        user.verifyBeforeUpdateEmail(newEmail)
            .then(() => alert("Email change request sent! Verify the new email to confirm."))
            .catch(error => alert(error.message));
    } else {
        alert("You must be logged in to change your email.");
    }
}

// Firebase Recaptcha
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

// Send OTP
function sendOTP() {
    let phoneNumber = document.getElementById("phone-number").value;
    firebase.auth().signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            alert("OTP Sent! Check your phone.");
        }).catch(error => alert(error.message));
}

// Verify OTP
function verifyOTP() {
    let code = document.getElementById("otp-code").value;
    window.confirmationResult.confirm(code)
        .then(() => alert("Phone Number Verified!"))
        .catch(error => alert(error.message));
}

// Login with Email Link
function sendLoginLink() {
    let email = document.getElementById("email").value;
    let actionCodeSettings = {
        url: window.location.href, // Redirect back to the site
        handleCodeInApp: true
    };

    firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
        .then(() => {
            alert("Check your email for a login link.");
            localStorage.setItem("emailForSignIn", email); // Store for later
        })
        .catch(error => alert(error.message));
}

// Completing the Login
window.onload = function () {
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
        let email = localStorage.getItem("emailForSignIn");
        if (!email) email = prompt("Please enter your email:");

        firebase.auth().signInWithEmailLink(email, window.location.href)
            .then(() => {
                alert("Login successful!");
                localStorage.removeItem("emailForSignIn");
                window.location.href = "home.html";
            })
            .catch(error => alert(error.message));
    }
};

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
