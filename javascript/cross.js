//for cross close button
document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById("loginPopup");
    const closeIcon = document.getElementById("closeIcon");

    closeIcon.addEventListener("click", function() {
        popup.style.display = "none";
    });
});
