 // Function to get URL parameters
 function getQueryParams() {
    const params = {};
    window.location.search.substring(1).split("&").forEach(param => {
        const [key, value] = param.split("=");
        params[key] = decodeURIComponent(value.replace(/\+/g, " "));
    });
    return params;
}

// Function to set the doctor's name
function setDoctorName() {
    const params = getQueryParams();
    const doctorName = params.name || "Doctor";
    document.getElementById("doctor-name").textContent = doctorName;
}

setDoctorName();

// Counter variable to track scroll events
let scrollCount = 0;
let decreaseCount = 4;

// Function to move lines
function moveLines() {
    const increment = scrollCount * 15; // Increase the movement based on scrollCount
    document.querySelector('.line').style.bottom = `${65 + increment}%`; // Adjust bottom position of the first line
    document.querySelector('.line.second').style.top = `${65 + increment}%`; // Adjust top position of the second line
}

// Function to reveal hidden content after multiple scroll events
function revealContent() {
    scrollCount++;
    decreaseCount--;
    if (scrollCount === 3) { // Change the number to adjust how many scrolls are needed
        const welcomeSection = document.getElementById('welcome');
        const welcomePosition = welcomeSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 0.5 + window.scrollY; // Adjust as needed

        if (welcomePosition < screenPosition) {
            welcomeSection.classList.add('revealed');
            window.removeEventListener('wheel', revealContent); // Remove the event listener after content is revealed
        }
    }
}

// Function to reverse reveal hidden content after multiple scroll events
function reverseRevealContent() {
    scrollCount--;
    decreaseCount++;
    if (scrollCount < 3) { // Change the number to adjust how many scrolls are needed
        const welcomeSection = document.getElementById('welcome');
        const welcomePosition = welcomeSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.5 + window.scrollY; // Adjust as needed

        if (welcomePosition < screenPosition) {
            welcomeSection.classList.remove('revealed');
            window.removeEventListener('wheel', reverseRevealContent); // Remove the event listener after content is revealed
        }
    }
}

// Function to reverse move lines
function reverseMoveLines() {
    const increment = decreaseCount * 15; // Increase the movement based on scrollCount
    document.querySelector('.line').style.bottom = `${95 - increment}%`; // Adjust bottom position of the first line
    document.querySelector('.line.second').style.top = `${95 - increment}%`; // Adjust top position of the second line
}

// Trigger the functions when the user scrolls the mouse
window.addEventListener('wheel', (event) => {
    if (event.deltaY > 0 && scrollCount < 3) { // Check if scrolling down and scrollCount is less than 3
        moveLines();
        revealContent();
        console.log(scrollCount);
    } else if (event.deltaY < 0 && scrollCount > 0) { // Check if scrolling up
        reverseMoveLines();
        reverseRevealContent();
        console.log(scrollCount);
    }
});