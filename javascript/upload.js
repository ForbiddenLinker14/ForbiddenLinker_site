document.addEventListener("DOMContentLoaded", function () {
  const uploadSection = document.getElementById("uploadSection");
  const fileInput = document.getElementById("fileInput");
  const uploadButton = document.getElementById("uploadButton");

  uploadButton.addEventListener("click", () => {
    console.log("Upload button clicked");
    fileInput.click(); // Trigger the file input click event
  });

  fileInput.addEventListener("change", async (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles.length > 0) {
      await uploadFiles(selectedFiles);
    }
  });

  async function uploadFiles(files) {
    const formData = new FormData();
    for (const file of files) {
      formData.append("files", file);
    }

    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Files uploaded successfully!");
      } else {
        console.error("Files upload failed.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
});
