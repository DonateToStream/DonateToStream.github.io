// Import Firebase auth module
const auth = firebase.auth();
const message = document.getElementById("message");

// Sign Up
function signup() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
        message.textContent = "Signup successful! Redirecting...";
        setTimeout(() => window.location.href = "home.html", 1000);
    })
    .catch(error => message.textContent = error.message);
}

// Login
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    auth.signInWithEmailAndPassword(email, password)
    .then(() => {
        window.location.href = "home.html";
    })
    .catch(error => message.textContent = error.message);
}

// Logout
function logout() {
    auth.signOut().then(() => window.location.href = "index.html");
}

// Reset Password
function resetPassword() {
    const email = document.getElementById("email").value;
    auth.sendPasswordResetEmail(email)
    .then(() => message.textContent = "Password reset email sent!")
    .catch(error => message.textContent = error.message);
}

// Change Email
function changeEmail() {
    const user = auth.currentUser;
    const newEmail = document.getElementById("newEmail").value;
    
    user.updateEmail(newEmail)
    .then(() => alert("Email updated!"))
    .catch(error => alert(error.message));
}

// Change Password
function changePassword() {
    const user = auth.currentUser;
    const newPassword = document.getElementById("newPassword").value;
    
    user.updatePassword(newPassword)
    .then(() => alert("Password updated!"))
    .catch(error => alert(error.message));
}
