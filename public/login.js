document
  .getElementById("loginForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("errorMessage");

    try {
      const feedback = await fetch(
        "https://charity-minds-backend.onrender.com/api/v1/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await feedback.json();

      console.log(data);

      if (feedback.ok) {
        // Save token for authenticated users
        localStorage.setItem("token", data.token);

        // Redirecting
        window.location.href = "./index.html";
      } else {
        errorMessage.textContent = data.message || "Invalid credentials!";
        errorMessage.classList.remove("hidden");
        console.log("Login failed!:", data);
      }
    } catch (error) {
      errorMessage.textContent = "Server error! Please try again later.";
      errorMessage.classList.remove("hidden");
    }
  });
