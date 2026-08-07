const form = document.getElementById("registerForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;

    const name = document.getElementById("name").Value.trim();
    const email = document.getElementById("email").Value.trim();
    const password = document.getElementById("password").Value();
    const confirmPassword = document.getElementById("confirmPassword").Value();

    // Clear errors
    document.querySelectorAll(".error").forEach(el => el.textContent = "");
    if (name.length < 3) {
        document.getElementById("nameError").textContent = "Name must be at least 3 characters";
        valid = false;
    }
    if (!email.includes("@")) {
        document.getElementById("emailError").textContent = "Invalid email";
        valid = false;
    }
    if (password.length < 6) {
    document.getElementById("passwordError").textContent = "Password must be at least 6 characters";
    valid = false;
    }
      if (password !== confirmPassword) {
    document.getElementById("confirmError").textContent = "Passwords do not match";
    valid = false;
  }
  if (valid) {
    alert("Registration successful!");
  }

});
