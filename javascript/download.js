document.addEventListener("DOMContentLoaded", function () {
  const downloadButton = document.getElementById("downloadButton");

  downloadButton.addEventListener("click", () => {
    window.location.href = "/download/latest"; // Trigger file download
  });
});
