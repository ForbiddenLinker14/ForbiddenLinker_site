document.addEventListener("DOMContentLoaded", function () {
  const loginLink = document.getElementById("loginLink");
  const loginPopup = document.getElementById("loginPopup");
  const loginForm = document.getElementById("loginForm");

  loginLink.addEventListener("click", () => {
    loginPopup.style.display = "block"; // Show the login popup
  });

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const loginUsername = document.getElementById("loginUsername").value;
    const loginPassword = document.getElementById("loginPassword").value;

    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: loginUsername,
        password: loginPassword,
      }),
    });

    const result = await response.text();
    console.log(result);

    if (result === "Login successful. Upload button is now visible.") {
      loginPopup.style.display = "none"; // Hide the login popup
      uploadSection.style.display = "block"; // Show the upload section
      downloadSection.style.display = "block"; // Show the download section
    }
  });
});
