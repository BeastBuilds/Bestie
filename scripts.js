// Ensure DOM is fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function() {

    // First page balloon animation logic
    const startButton = document.getElementById("startButton");
    const balloonImage = document.getElementById("balloonImage");

    if (startButton) {
        startButton.addEventListener("click", function() {
            // Show the balloon image and trigger the animation
            balloonImage.style.display = "block";

            // Redirect to another page after the balloon animation ends
            balloonImage.addEventListener('animationend', function() {
                window.location.href = "page2.html";
            });
        });
    }

    // Second page question and button logic
    const yesButton = document.getElementById("yesButton");
    const noButton = document.getElementById("noButton");
    const noMessage = document.getElementById("noMessage");

    if (yesButton && noButton) {
        // Add event listener for the "Yes" button
        yesButton.addEventListener("click", function() {
            // Redirect to the next page
            window.location.href = "page3.html";  // Make sure to create page3.html
        });

        // Add event listener for the "No" button
        noButton.addEventListener("click", function() {
            // Show the message
            noMessage.style.display = "block";
        });
    }
});
