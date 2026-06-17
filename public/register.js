document
  .getElementById("registrationForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // This prevents the form from submitting and refreshing the page

    // Capture form data and add new user
    /* const newUsers = {
      firstname: document.getElementById("firstName").value,
      lastname: document.getElementById("lastName").value,
      username: document.getElementById("userName").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      dob: document.getElementById("dob").value,
      gender: document.getElementById("gender").value,
      createdAt: new Date().toISOString(),
    };

    // Save new user to local storage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(newUsers);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful!");
    window.location.href = "index.html"; // Redirect to index.html after successful registration
  });*/

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const dob = document.getElementById("dob").value;
    const gender = document.getElementById("gender").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Validate the rules

    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !phone ||
      !dob ||
      !gender ||
      !password ||
      !confirmPassword
    ) {
      alert("All fields are required!");
      return;
    }

    // Email format check
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailFormat) {
      alert("Please enter a valid email!");
      return;
    }

    //Kenya phone number check
    const phoneFormat = /^(?:\+254|0)?7\d{8}$/;
    if (!phoneFormat) {
      alert(
        "Please enter a valid phone number (e.g., 0712345678 or +254712345678).",
      );
      return;
    }

    // DOB check(Must not be in the future)
    const dobDate = new Date(dob);
    if (dobDate > new Date()) {
      alert("Date of birth can not be in the future!");
      return;
    }

    // Password match
    if (password !== confirmPassword) {
      alert("Password do not match!");
      return;
    }

    // User Object

    const newUser = {
      firstName,
      lastName,
      username,
      email,
      phone,
      dob,
      gender,
      password,
      confirmPassword,
    };

    // Send to backEnd

    try {
      const feedback = await fetch(
        "https://charity-minds-backend.onrender.com/api/v1/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        },
      );

      if (feedback.ok) {
        alert("Registration successful!");
        window.location.href = "index.html";
      } else {
        const errorData = await feedback.json();
        alert("Error: " + errorData.message);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Something went wrong. Please try again.");
    }
  });
