document
  .getElementById("registrationForm")
  .addEventListener("submit", (event) => {
    event.preventDefault(); // This prevents the form from submitting and refreshing the page

    // Capture form data and add new user
    const newUsers = {
      firstname: document.getElementById("firstName").value,
      lastname: document.getElementById("lastName").value,
      username: document.getElementById("userName").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phoneNumber").value,
      dob: document.getElementById("dateOfBirth").value,
      gender: document.getElementById("gender").value,
      createdAt: new Date().toISOString(),
    };

    // Save new user to local storage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(newUsers);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful!");
    window.location.href = "index.html"; // Redirect to index.html after successful registration
  });
